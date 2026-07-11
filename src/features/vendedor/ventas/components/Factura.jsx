import ProductoItemFactura from "./ProductoItemFactura"
import { Button } from "@/components/ui/button"
import { buttonPrimaryClass, buttonOutlineClass } from "@/utils/styles"
import { useNavigate } from "react-router-dom"
import useVentaStore from "../../ventas/context/useVentaStore"
import { toast } from "react-toastify"
import { confirmarTransferenciaVenta } from "../../ventas/services/ventaService";
import { calcularFactura } from "@/utils/calcularFactura"

export default function FacturaPanel({
    factura = [],
    modo = "VENTA_DIRECTA", 
    eliminarProducto,
    limpiarFactura,
    cambiarCantidad,
    pedidoSeleccionado,
    limpiarPedido,
    esEditable
}) {

    const ventaId = useVentaStore(state => state.ventaId);
    const esSoloLectura = modo === "CARRITO"
    const navigate = useNavigate()
    const metodoPago = useVentaStore(state => state.metodoPago ?? null);
    const datosFacturacion = useVentaStore(state => state.datosFacturacion ?? {});

    const { subtotal, iva, envio: costoEnvio, total } = calcularFactura(
        factura,
        pedidoSeleccionado?.tipoEntrega,
        pedidoSeleccionado?.resumenPago?.costoEnvio ?? null
    )

    const productosSinStock = factura.some(
        p => p.cantidad > p.stock
    )

    const puedeIrConfirmacion =
        pedidoSeleccionado &&
        metodoPago &&
        datosFacturacion?.nombreCompleto &&
        datosFacturacion?.correo;

    const pedidoConDatosCompletos =
        pedidoSeleccionado?.tipoPedido === "CARRITO" &&
        metodoPago &&
        datosFacturacion?.nombreCompleto;

    const esVentaDirecta = !pedidoSeleccionado;

    const transferenciaConfirmada = useVentaStore(state => state.transferenciaConfirmada);
    const setTransferenciaConfirmada = useVentaStore(state => state.setTransferenciaConfirmada);

    const handleCobrar = () => {
        // 1. Definimos qué hace que un pedido pueda saltarse el CobroPage
        const esCarritoValido = pedidoSeleccionado?.tipoPedido === "CARRITO" && pedidoSeleccionado?.cliente?.email;
        const esFotoListaValida = pedidoSeleccionado?.tipoPedido === "FOTO_LISTA" && pedidoSeleccionado?.datosAdicionales;

        // 2. Evaluamos
        const puedeSaltarCobro = esCarritoValido || esFotoListaValida;

        // 3. Ejecución del flujo
        if (esVentaDirecta) {
            navigate("/dashboard/ventas/cobro");
        } else if (puedeSaltarCobro) {
            // Si tiene todos sus datos, directo a confirmar
            navigate("/dashboard/ventas/cobro/confirmacion-venta");
        } else {
            // Si no cumple los requisitos, lo enviamos a completar datos
            toast.info("Por favor, completa los datos del pedido antes de continuar.");
            navigate("/dashboard/ventas/cobro");
        }
    }

    const handleEliminar = (id) => {
        if (eliminarProducto) eliminarProducto(id);
    };

    return (
        <div className="bg-white/60 backdrop-blur-xl rounded-2xl border border-white/20 p-6 shadow-lg flex flex-col">

            <h2 className="text-lg font-bold text-emerald-900 mb-3 text-center">
                Factura
            </h2>

            <div className="flex-1 space-y-3 overflow-auto max-h-[400px]">

                {factura.length === 0 ? (
                    <p className="text-gray-500">
                        No hay productos agregados
                    </p>
                ) : (
                    factura.map(p => (
                        <ProductoItemFactura
                            key={p.id || p._id}
                            producto={p}
                            onDelete={esSoloLectura ? undefined : eliminarProducto}
                            onCantidadChange={esSoloLectura ? undefined : cambiarCantidad}
                            esEditable={esEditable}
                        />
                    ))
                )}

            </div>

            <div className="border-t border-b py-4">

                <p className="font-medium mb-2">
                    Tipo de entrega
                </p>

                <span
                    className="
                        inline-flex
                        px-3
                        py-1
                        rounded-full
                        text-sm
                        bg-emerald-100
                        text-emerald-700
                        font-medium
                    "
                >
                    {pedidoSeleccionado
                        ? pedidoSeleccionado.tipoEntrega
                        : "RETIRO_LOCAL"}
                </span>

            </div>

            <div className="pt-4 mt-4 space-y-3">

                <h3 className="text-lg font-semibold text-emerald-900">
                    Subtotal: ${subtotal.toFixed(2)}
                </h3>
                <h3 className="text-lg font-semibold text-emerald-900">
                    IVA (15%): ${iva.toFixed(2)}
                </h3>
                {costoEnvio > 0 && (
                    <h3 className="text-lg font-semibold text-emerald-900">
                        Envío: ${costoEnvio.toFixed(2)}
                    </h3>
                )}
                <h3 className="text-lg font-semibold text-emerald-900">
                    Total: ${total.toFixed(2)}
                </h3>

                {
                    productosSinStock && (
                        <div
                            className="
                                bg-red-50
                                border
                                border-red-200
                                rounded-xl
                                p-3
                                text-red-700
                                text-sm
                            "
                        >
                            Existen productos con stock insuficiente.
                        </div>
                    )
                }

{esEditable && (
    <>
        <Button 
            onClick={() => { limpiarFactura(); limpiarPedido(); setTransferenciaConfirmada(false); }} 
            className={`${buttonOutlineClass} py-5`}
        >
            Limpiar
        </Button>

        {/* Sin pedido seleccionado → venta directa, mostrar Cobrar siempre */}
        {!pedidoSeleccionado && modo !== "ARMADO_FOTO" && (
            <Button 
                disabled={factura.length === 0 || productosSinStock} 
                onClick={handleCobrar} 
                className={buttonPrimaryClass}
            >
                Cobrar
            </Button>
        )}

        {/* Con pedido seleccionado → ocultar Cobrar, mostrar Confirmar Transferencia si aplica */}
        {pedidoSeleccionado && metodoPago === "TRANSFERENCIA" && !transferenciaConfirmada && (
            <Button
                disabled={factura.length === 0}
                onClick={async () => {
                    try {
                        await confirmarTransferenciaVenta(ventaId);
                        toast.success("Transferencia confirmada con éxito");
                        setTransferenciaConfirmada(true);
                    } catch (error) {
                        toast.error(error.message || "Error al confirmar transferencia");
                    }
                }}
                className="bg-emerald-600 hover:bg-emerald-700 text-white w-full py-3 rounded-xl font-medium"
            >
                Confirmar transferencia
            </Button>
        )}
    </>
)}
            </div>

        </div>
    )
}