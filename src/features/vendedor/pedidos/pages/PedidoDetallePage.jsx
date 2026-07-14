import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

import {
    FiArrowLeft,
    FiMapPin
} from "react-icons/fi"

import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import useAuthStore from "@/context/useAuthStore"
import { obtenerDetallesPedido } from "../services/pedidosSeleccionadosService";
import useVentaStore from "../../ventas/context/useVentaStore"
import { ventaDesdePedido } from "../../ventas/services/ventaService";
import { toast } from "react-toastify";
import { armarPedidoFoto } from "@/features/cliente/pedidos/services/pedidoService";
import IngresoProducto from "../../ventas/components/IngresoProducto";
import FacturaPanel from "../../ventas/components/Factura";
import  socket  from "@/utils/socket";

const DRAFT_KEY_PREFIX = "cotizacion_draft_";

const obtenerBorrador = (pedidoId) => {
    try {
        const raw = localStorage.getItem(`${DRAFT_KEY_PREFIX}${pedidoId}`);
        return raw ? JSON.parse(raw) : null;
    } catch (error) {
        console.warn("No se pudo leer el borrador:", error);
        return null;
    }
};

const guardarBorrador = (pedidoId, articulos) => {
    try {
        localStorage.setItem(`${DRAFT_KEY_PREFIX}${pedidoId}`, JSON.stringify(articulos));
    } catch (error) {
        console.warn("No se pudo guardar el borrador:", error);
    }
};

const borrarBorrador = (pedidoId) => {
    try {
        localStorage.removeItem(`${DRAFT_KEY_PREFIX}${pedidoId}`);
    } catch (error) {
        console.warn("No se pudo borrar el borrador:", error);
    }
};


export default function PedidoDetallePage() {

    const { setPedidoSeleccionado, setFactura, setMetodoPago, setDatosFacturacion, resetVentaCompleta, limpiarVenta, setVentaId } = useVentaStore();

    const [articulosSeleccionados, setArticulosSeleccionados] = useState([]);
    const navigate = useNavigate()
    const { id } = useParams()
    const user = useAuthStore((state) => state.user)

    const esCliente =
        user?.rol?.toUpperCase() === "CLIENTE"

    const [pedido, setPedido] = useState(null)
    const [loading, setLoading] = useState(true)

    const subtotal =
        pedido?.resumenPago?.subtotalProductos || 0;

    const iva =
        pedido?.resumenPago?.ivaProductos || 0;

    const envio =
        pedido?.resumenPago?.costoEnvio || 0;

    const total =
        pedido?.resumenPago?.totalPagar || 0;

    useEffect(() => {
        const cargarDetalle = async () => {
            try {
                const data = await obtenerDetallesPedido(id);
                setPedido(data.pedido);
            } catch (error) {
                console.error("Error al cargar el detalle del pedido:", error);
                toast.error("No se pudo cargar el pedido"); 
            } finally {
                setLoading(false);
            }
        };
        cargarDetalle();
    }, [id]);

    useEffect(() => {
        if (!user?.id || !id) return;

        const unirse = () => {
            if (esCliente) {
                socket.emit('cliente:unirse', user.id);
            } else {
                socket.emit('vendedor:unirse', user.id);
            }
        };

        unirse();
        socket.on('connect', unirse); 

        const refrescar = () => {
            obtenerDetallesPedido(id).then(res => setPedido(res.pedido));
        };

        socket.on('pedido:armado', (data) => {
            if (data.id === id) {
                toast.info("¡El vendedor ha armado tu pedido, revisa los detalles!");
                refrescar();
            }
        });

        socket.on('pedido:pago-definido', (data) => {
            if (data.id === id) {
                toast.info("El cliente definió el método de pago");
                refrescar();
            }
        });

        socket.on('pedido:actualizado', (data) => {
            if (data.id === id) refrescar();
        });

        socket.on('pedido:cancelado', (data) => {
            if (data.id === id) {
                toast.warning("El pedido fue cancelado");
                refrescar();
            }
        });

        return () => {
            socket.off('connect', unirse);
            socket.off('pedido:armado');
            socket.off('pedido:pago-definido');
            socket.off('pedido:actualizado');
            socket.off('pedido:cancelado');
        };
    }, [id, esCliente, user?.id]);


    useEffect(() => {
        if (pedido?.articulos && articulosSeleccionados.length === 0) {
            const borrador = obtenerBorrador(id);

            if (borrador && borrador.length > 0) {
                // El vendedor dejó una cotización a medias, la recuperamos
                setArticulosSeleccionados(borrador);
                return;
            }

            const articulosParaEdicion = pedido.articulos.map(item => ({
                id: item.producto,
                nombre: item.nombreProducto,
                cantidad: item.cantidad,
                precio: item.precioUnitario,
                tieneIva: item.porcentajeIva === 0.15,
                precioMayorista: item.precioMayorista ?? 0,              
                cantidadMinimaMayorista: item.cantidadMinimaMayorista ?? 0, 
                imagen: item.imagen ?? null,
                stock: item.stock ?? 0  
            }));
            setArticulosSeleccionados(articulosParaEdicion);
        }
    }, [pedido]);

    useEffect(() => {
        if (!id || !pedido) return;

        if (pedido.metodoPago !== null) {
            borrarBorrador(id);
            return;
        }

        if (articulosSeleccionados.length > 0) {
            guardarBorrador(id, articulosSeleccionados);
        } else {
            borrarBorrador(id);
        }
    }, [articulosSeleccionados, id, pedido?.metodoPago]);

    const handleIniciarVenta = async () => {
        if (!pedido) return;

        try {
            setLoading(true);
            const data = await ventaDesdePedido(id, { observaciones: pedido.observaciones });
            setVentaId(data.venta.id);
            limpiarVenta();
            const esPagoTarjeta = data.venta.metodoPago === 'TARJETA';
            const urlPago = data.venta.stripe?.urlPago;

            setPedidoSeleccionado(pedido);

            setFactura(
                data.venta.articulos.map(item => ({
                    id: item.producto?._id || item.producto || item.id,
                    nombre: item.nombreProducto,
                    precioUnitario: item.precioUnitario,
                    cantidad: item.cantidad,
                    imagen: item.imagen ?? null,
                    stock: item.stockDisponible ?? 0,
                    tieneIva: item.porcentajeIva === 0.15 || item.tieneIva === true,
                    precioMayorista: item.precioMayorista ?? 0,               
                    cantidadMinimaMayorista: item.cantidadMinimaMayorista ?? 0 
                }))
            );

            setMetodoPago(pedido.metodoPago);

            setDatosFacturacion({
                nombreCompleto:
                    pedido.datosFacturacion?.nombreCompleto ||
                    `${pedido.cliente?.nombre || ""} ${pedido.cliente?.apellido || ""}`,

                correo:
                    pedido.datosFacturacion?.correo ||
                    pedido.cliente?.email ||
                    "",

                telefono:
                    pedido.datosFacturacion?.telefono ||
                    pedido.cliente?.telefono ||
                    "",

                identificacion:
                    pedido.datosFacturacion?.identificacion || ""
            });
            setTimeout(() => {
                navigate("/dashboard/ventas");
            }, 100);

        } catch (error) {
            toast.error(error.message || "Ocurrió un error inesperado al iniciar la venta");
        } finally {
            setLoading(false);
        }
    };

    const handleArmarPedido = async () => {
        if (articulosSeleccionados.length === 0) {
            toast.warning("Debes agregar al menos un producto a la lista");
            return;
        }

        const articulosFormateados = articulosSeleccionados.map(item => ({
            producto: item.id,
            cantidad: item.cantidad
        }));

        try {
            setLoading(true);
            await armarPedidoFoto(id, articulosFormateados);
            toast.success("Pedido armado y cotizado con éxito");
            borrarBorrador(id);
            const data = await obtenerDetallesPedido(id);
            setPedido(data.pedido);
        } catch (error) {
            toast.error(error.message || "Error al armar el pedido");
        } finally {
            setLoading(false);
        }
    };

    const agregarAlArray = (producto) => {
        setArticulosSeleccionados((prev) => {
            const existe = prev.find((item) => item.id === producto.id);
            if (existe) {
                return prev.map((item) =>
                    item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
                );
            }
            return [...prev, { ...producto, cantidad: 1 }];
        });
    };

    const quitarDelArray = (id) => {
        setArticulosSeleccionados((prev) => prev.filter((item) => item.id !== id));
    };

    const actualizarCantidad = (id, nuevaCantidad) => {
        setArticulosSeleccionados((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, cantidad: nuevaCantidad } : item
            )
        );
    };

    const handleIrAPago = () => {
        if (!pedido) return;

        navigate("/dashboard/mis-pedidos/pago", {
            state: {
                checkout: {
                    pedido: pedido,                              // objeto pedido completo
                    tipoEntrega: pedido.tipoEntrega || (pedido.direccionEntrega ? "domicilio" : "local"),
                    carrito: pedido.articulos,
                    datosFacturacion: pedido.datosFacturacion,
                    resumenPago: pedido.resumenPago,
                    esPedidoFoto: pedido.tipoPedido === "FOTO_LISTA",
                    metodoPago: pedido.metodoPago               
                }
            }
        });
    };


    const getBotonConfig = () => {
        if (!pedido) return null

        if (pedido?.metodoPago === 'TARJETA') {
            return { text: "Cerrar Pedido", action: handleIniciarVenta }
        }

        if (pedido?.metodoPago === 'EFECTIVO' || pedido?.metodoPago === 'TRANSFERENCIA') {
            return { text: "Iniciar Venta", action: handleIniciarVenta }
        }

        return null
    }

    const botonConfig = getBotonConfig();

    if (loading) return <div>Cargando...</div>;

    const esPedidoLista = pedido?.tipoPedido === "FOTO_LISTA";
    const esPedidoCarrito = pedido?.tipoPedido === "CARRITO";


    const limpiarFacturaArmado = () => {
        setArticulosSeleccionados([]);
        borrarBorrador(id);
    };
    const limpiarPedidoArmado = () => { };

    return (

        <div className="p-6 space-y-6">

            <p className="text-gray-500">
                Este módulo te permite visualizar el detalle
                del pedido realizado
            </p>

            <div className="
                flex flex-col gap-4
                md:flex-row
                md:items-center
                md:justify-between
            ">

                <div>

                    <h1 className="
                        text-2xl
                        font-bold
                        text-gray-800
                    ">
                        Pedido - {pedido?.nombrePedido || pedido?._id}
                    </h1>

                    <p className="text-gray-500">
                        Información detallada del pedido
                    </p>

                </div>

                <Button
                    onClick={() => navigate(-1)}
                    className="
                        bg-gray-200
                        text-gray-700
                        hover:bg-emerald-100
                    "
                >

                    <FiArrowLeft />

                    Volver

                </Button>

            </div>

            <Card className="
                p-6
                rounded-3xl
                border border-white/20
                shadow-sm
                bg-white/60
                backdrop-blur-xl
            ">

                <div className="
                    grid md:grid-cols-2
                    xl:grid-cols-4
                    gap-6
                ">

                    <div>

                        <p className="
                            text-sm
                            text-gray-500
                        ">
                            Cliente
                        </p>

                        <p className="font-medium">
                            {pedido?.datosFacturacion?.nombreCompleto || "Sin nombre"}
                        </p>

                    </div>

                    <div>

                        <p className="
                            text-sm
                            text-gray-500
                        ">
                            Fecha
                        </p>

                        <p className="font-medium">
                            {pedido?.createdAt
                                ? new Date(pedido.createdAt).toLocaleDateString("es-ES", {
                                    day: "2-digit",
                                    month: "2-digit",
                                    year: "numeric"
                                })
                                : "Sin fecha"}
                        </p>

                    </div>

                    <div>

                        <p className="
                            text-sm
                            text-gray-500
                        ">
                            Estado
                        </p>

                        <p className="font-medium text-emerald-700">
                            {pedido?.estado || "Sin estado"}
                        </p>

                    </div>

                    <div>

                        <p className="
                                text-sm
                                text-gray-500
                            ">
                            Teléfono
                        </p>

                        <p className="font-medium text-gray-800">
                            {pedido?.datosFacturacion?.telefono || "Sin teléfono"}
                        </p>

                    </div>

                </div>

            </Card>

            {pedido?.direccionEntrega && (
                <Card
                    className="
            p-5
            rounded-3xl
            border border-white/20
            shadow-sm
            bg-white/60
            backdrop-blur-xl
        "
                >
                    <div className="flex items-start gap-4">

                        <div
                            className="
                    w-12 h-12
                    rounded-2xl
                    bg-emerald-100
                    flex items-center
                    justify-center
                    shrink-0
                "
                        >
                            <FiMapPin className="text-emerald-700 text-xl" />
                        </div>

                        <div className="flex-1">

                            <p className="text-sm text-gray-500">
                                Dirección de entrega: <span className="font-semibold text-gray-800">{pedido.direccionEntrega.direccion}</span>
                            </p>

                            {pedido.direccionEntrega.referencia && (
                                <p className="text-sm text-gray-500 mt-1">
                                    Referencia: <span className="font-semibold text-gray-800">{pedido.direccionEntrega.referencia}</span>
                                </p>
                            )}

                        </div>

                    </div>
                </Card>
            )}

            {
                esPedidoLista && (

                    <Card className="
                        p-6
                        rounded-3xl
                        border border-white/20
                        shadow-sm
                        bg-white/60
                        backdrop-blur-xl
                        space-y-6
                    ">

                        <div>

                            <h2 className="
                                text-lg
                                font-semibold
                                text-gray-800
                            ">
                                Lista enviada por el cliente
                            </h2>

                            <p className="text-sm text-gray-500">
                                Fotografía subida para preparar el pedido
                            </p>

                        </div>

                        <div className="
                            rounded-3xl
                            overflow-hidden
                            border border-gray-200
                            bg-gray-50
                        ">

                            <img
                                src={pedido?.listaCliente?.url || "/public/notFound/notFound.webp"}
                                alt="Lista de útiles"
                                className="
                                    w-full
                                    max-h-[650px]
                                    object-contain
                                "
                            />

                        </div>

                    </Card>

                )
            }

            {
                (esPedidoCarrito || (esPedidoLista && pedido?.articulos?.length > 0)) && (

                    <Card className="p-6 rounded-3xl border border-white/20 shadow-sm bg-white/60 backdrop-blur-xl">
                        <div className="mb-5">
                            <h2 className="text-lg font-semibold text-gray-800">
                                Productos cotizados por el vendedor
                            </h2>
                            <p className="text-sm text-gray-500">
                                Detalle de los productos agregados a tu lista
                            </p>
                        </div>

                        <div className="space-y-4">
                            {pedido?.articulos?.map((producto) => (
                                <div key={producto._id || producto.id} className="flex items-center justify-between border border-gray-100 rounded-2xl p-4 bg-white">
                                    <div>
                                        <p className="font-medium text-gray-800">{producto.nombreProducto}</p>
                                        <p className="text-sm text-gray-500">Cantidad: {producto.cantidad}</p>
                                    </div>
                                    <div className="font-semibold text-emerald-700">
                                        ${(producto.precioUnitario * producto.cantidad).toFixed(2)}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="
                            mt-6
                            ml-auto
                            w-full
                            max-w-sm
                            border-t
                            border-gray-200
                            pt-4
                            space-y-2
                        ">

                            <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span>${subtotal.toFixed(2)}</span>
                            </div>

                            <div className="flex justify-between">
                                <span>IVA (15%)</span>
                                <span>${iva.toFixed(2)}</span>
                            </div>

                            {envio > 0 && (
                                <div className="flex justify-between">
                                    <span>Envío</span>
                                    <span>${envio.toFixed(2)}</span>
                                </div>
                            )}

                            <div className="
                                flex justify-between
                                font-bold
                                text-lg
                                text-emerald-700
                                border-t
                                pt-2
                            ">
                                <span>Total</span>
                                <span>${total.toFixed(2)}</span>
                            </div>

                        </div>

                    </Card>

                )
            }

            <Card className="
                p-6
                rounded-3xl
                border border-white/20
                shadow-sm
                bg-white/60
                backdrop-blur-xl
            ">

                <div>

                    <h2 className="
                        text-lg
                        font-semibold
                        text-gray-800
                        mb-2
                    ">
                        Observaciones
                    </h2>

                    <p className="text-gray-600 leading-relaxed">
                        {pedido?.observaciones || "No hay observaciones adicionales"}
                    </p>

                </div>

            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {esPedidoLista && pedido?.metodoPago === null && (
                    <>
                        {!esCliente && (
                            <div className="space-y-6">
                                <IngresoProducto onAdd={agregarAlArray} />
                            </div>
                        )}
                        {!esCliente && (
                            <FacturaPanel
                                factura={articulosSeleccionados}
                                modo="ARMADO_FOTO"
                                esEditable={!esCliente && (pedido?.estado === 'EN_PROCESO' || pedido?.estado === 'COTIZADO')}
                                eliminarProducto={quitarDelArray}
                                cambiarCantidad={actualizarCantidad}
                                limpiarFactura={limpiarFacturaArmado}
                                limpiarPedido={limpiarPedidoArmado}
                                pedidoSeleccionado={pedido}
                            />
                        )}
                    </>
                )}
            </div>

            {/*{
                !esCliente && esPedidoCarrito && (

                    <Card className="
                        p-6
                        rounded-3xl
                        border border-white/20
                        shadow-sm
                        bg-white/60
                        backdrop-blur-xl
                    ">

                        <div className="
                            flex flex-wrap gap-4
                            justify-end
                        ">

                            <Button
                                onClick={handleIniciarVenta}
                                disabled={loading}
                                className="bg-emerald-600 hover:bg-emerald-700"
                            >
                                Iniciar venta
                            </Button>
                        </div>
                    </Card>
                )
            }*/}

            {/* Ajuste en tu lógica de botones */}
            {!esCliente && pedido?.tipoPedido === "FOTO_LISTA" && pedido?.estado === 'EN_PROCESO' && pedido?.metodoPago === null && (
                <Card className="p-6 rounded-3xl border border-white/20 shadow-sm bg-white/60 backdrop-blur-xl">
                    <div className="flex flex-wrap gap-4 justify-end">
                        <Button
                            onClick={handleArmarPedido}
                            disabled={loading}
                            className="bg-emerald-800 hover:bg-emerald-900 text-white"
                        >
                            {/* Si ya tiene artículos, es una actualización, si no, es la primera vez */}
                            {pedido?.articulos?.length > 0 ? "Actualizar Cotización" : "Armar Pedido"}
                        </Button>
                    </div>
                </Card>
            )}

            {esCliente &&
                pedido?.tipoPedido === 'FOTO_LISTA' &&
                pedido?.metodoPago === null &&
                pedido?.estado === "EN_PROCESO" &&
                pedido?.articulos?.length > 0 &&
                pedido?.resumenPago?.totalPagar > 0 && (
                <Card className="p-6 rounded-3xl border border-white/20 shadow-sm bg-white/60 backdrop-blur-xl mt-4">
                    <div className="flex flex-wrap gap-4 justify-between items-center">
                        <p className="text-amber-600 font-medium">
                            Por favor, selecciona un método de pago para continuar.
                        </p>
                        <Button
                            onClick={handleIrAPago}
                            disabled={loading}
                            className="bg-emerald-800 hover:bg-emerald-900 text-white"
                        >
                            Continuar a pago
                        </Button>
                    </div>
                </Card>
            )}

            {!esCliente && botonConfig && pedido.metodoPago !== null && (
                <Card className="p-6 rounded-3xl border border-white/20 shadow-sm bg-white/60 backdrop-blur-xl mt-4">
                    <div className="flex flex-wrap gap-4 justify-end">
                        <Button
                            onClick={botonConfig.action}
                            disabled={loading}
                            className="bg-emerald-800 hover:bg-emerald-900 text-white"
                        >
                            {botonConfig.text}
                        </Button>
                    </div>
                </Card>
            )}
        </div>
    )
}