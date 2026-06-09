import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

import {
    FiArrowLeft,
    FiMapPin
} from "react-icons/fi"

import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import useAuthStore from "@/context/useAuthStore"
import { obtenerDetallesPedido, cambiarEstadoPedido } from "../services/pedidosSeleccionadosService";
import useVentaStore from "../../ventas/context/useVentaStore"

export default function PedidoDetallePage() {

    const {
        setPedidoSeleccionado,
        setFactura,
        resetVentaCompleta
    } = useVentaStore();

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
                console.error("Error al cargar:", error);
            } finally {
                setLoading(false);
            }
        };
        cargarDetalle();
    }, [id]);

    const handleFinalizar = async () => {
        try {
            await cambiarEstadoPedido(id, 'FINALIZADO');
            navigate("dashboard/mis-pedidos");
        } catch (error) {
            console.error("Error al finalizar:", error);
        }
    };


const handleIniciarVenta = () => {
    resetVentaCompleta();
    setPedidoSeleccionado(pedido);

    if (pedido?.tipoPedido === "CARRITO") {
        // AQUÍ ESTÁ LA CLAVE: 
        // Convertimos el array crudo de la API al formato que el componente espera
        const productosNormalizados = pedido.articulos.map(item => ({
            id: item.producto || item._id,
            nombre: item.nombreProducto || "Sin nombre",
            precio: item.precioUnitario || 0,
            stock: item.stock ?? 999, // Si no viene stock, el componente usará 999
            cantidad: item.cantidad || 1
        }));
        
        setFactura(productosNormalizados);
    }

    navigate("/dashboard/ventas");
};

    if (loading) return <div>Cargando...</div>;

    const esVendedor = user?.rol?.toUpperCase() === "VENDEDOR";
    const esPedidoEnProceso = pedido?.estado === "EN_PROCESO";

    const esPedidoLista = pedido?.tipoPedido === "FOTO_LISTA";
    const esPedidoCarrito = pedido?.tipoPedido === "CARRITO";

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
                esPedidoCarrito && (

                    <Card className="
                        p-6
                        rounded-3xl
                        border border-white/20
                        shadow-sm
                        bg-white/60
                        backdrop-blur-xl
                    ">

                        <div className="mb-5">

                            <h2 className="
                                text-lg
                                font-semibold
                                text-gray-800
                            ">
                                Productos solicitados
                            </h2>

                            <p className="text-sm text-gray-500">
                                Productos agregados al carrito
                            </p>

                        </div>

                        <div className="space-y-4">

                            {
                                pedido?.articulos?.map((producto) => (

                                    <div
                                        key={producto._id || producto.id}
                                        className="
                                            flex items-center
                                            justify-between
                                            border border-gray-100
                                            rounded-2xl
                                            p-4
                                            bg-white
                                        "
                                    >
                                        <div>

                                            <p className="
                                                font-medium
                                                text-gray-800
                                            ">
                                                {producto.nombreProducto}
                                            </p>

                                            <p className="
                                                text-sm
                                                text-gray-500
                                            ">
                                                Cantidad: {producto.cantidad}
                                            </p>

                                        </div>

                                        <div className="
                                            font-semibold
                                            text-emerald-700
                                        ">
                                            $
                                            {
                                                (
                                                    producto.precioUnitario *
                                                    producto.cantidad
                                                ).toFixed(2)
                                            }
                                        </div>

                                    </div>

                                ))
                            }

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
                                <span>IVA</span>
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
                        {pedido.observaciones || "No hay observaciones adicionales"}
                    </p>

                </div>

            </Card>

            {
                !esCliente && (

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
                                className="bg-emerald-600 hover:bg-emerald-700"
                            >
                                Iniciar venta
                            </Button>

                            {esVendedor && esPedidoEnProceso && (
                                <div className="flex justify-end">
                                    <Button
                                        onClick={handleFinalizar}
                                        className="bg-emerald-600 hover:bg-emerald-700"
                                    >
                                        Finalizar pedido
                                    </Button>
                                </div>
                            )}
                        </div>
                    </Card>
                )
            }
        </div>
    )
}