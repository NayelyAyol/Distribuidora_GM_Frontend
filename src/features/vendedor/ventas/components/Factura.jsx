import ProductoItemFactura from "./ProductoItemFactura"
import { Button } from "@/components/ui/button"
import { buttonPrimaryClass, buttonOutlineClass } from "@/utils/styles"
import { useNavigate } from "react-router-dom"
import useVentaStore from "../../ventas/context/useVentaStore"

export default function FacturaPanel({
    factura,
    eliminarProducto,
    limpiarFactura,
    cambiarCantidad,
    pedidoSeleccionado,
    limpiarPedido
}) {
    const navigate = useNavigate()
    const metodoPago = useVentaStore(state => state.metodoPago ?? null);
    const datosFacturacion = useVentaStore(state => state.datosFacturacion ?? {});

    console.log("Estado de la factura para calcular:", factura);
    const subtotal = factura.reduce((acc, p) => {
        const precio = Number(p.precioUnitario ?? p.precio ?? 0);
        const cantidad = Number(p.cantidad || 0);
        return acc + (precio * cantidad);
    }, 0);

    const iva = subtotal * 0.15
    const esDomicilio =
        pedidoSeleccionado?.tipoEntrega === "ENVIO_DOMICILIO"

    const costoEnvio = esDomicilio
        ? Number(pedidoSeleccionado?.resumenPago?.costoEnvio || 0)
        : 0

    const total = subtotal + iva + costoEnvio

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


    const handleCobrar = () => {
        const esPedidoCarritoCompleto = 
            pedidoSeleccionado?.tipoPedido === "CARRITO" && 
            pedidoSeleccionado?.cliente?.email; 

        if (esVentaDirecta) {
            navigate("/dashboard/ventas/cobro"); 
        } 
        else if (esPedidoCarritoCompleto) {
            navigate("/dashboard/ventas/cobro/confirmacion-venta");
        }
        else if (puedeIrConfirmacion) {
            navigate("/dashboard/ventas/cobro/confirmacion-venta");
        } else {
            navigate("/dashboard/ventas/cobro");
        }
    }

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
                            onDelete={eliminarProducto}
                            onCantidadChange={cambiarCantidad}
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
                    IVA: ${iva.toFixed(2)}
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


                <Button
                    onClick={() => {
                        limpiarFactura()
                        limpiarPedido()
                    }}
                    className={`${buttonOutlineClass} py-5`}
                >
                    Limpiar
                </Button>

                <Button
                    disabled={
                        factura.length === 0 ||
                        productosSinStock
                    }
                    onClick={handleCobrar}
                    className={buttonPrimaryClass}
                >
                    Cobrar
                </Button>
            </div>

        </div>
    )
}