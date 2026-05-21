import ProductoItemFactura from "./ProductoItemFactura"
import { Button } from "@/components/ui/button"
import { buttonPrimaryClass, buttonOutlineClass } from "@/utils/styles"
import { useNavigate } from "react-router-dom"

export default function FacturaPanel({
    factura,
    eliminarProducto,
    limpiarFactura,
    cambiarCantidad
}) {
    const navigate = useNavigate()

    

    const subtotal = factura.reduce(
        (acc, p) => acc + p.precio * p.cantidad,
        0
    )

    const iva = subtotal * 0.15


    const total = subtotal + iva

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
                            key={p.id}
                            producto={p}
                            onDelete={eliminarProducto}
                            onCantidadChange={cambiarCantidad}
                        />
                    ))
                )}

            </div>

            <div className="border-t pt-4 mt-4 space-y-3">

                <h3 className="text-lg font-semibold text-emerald-900">
                    Subtotal: ${subtotal.toFixed(2)}
                </h3>
                <h3 className="text-lg font-semibold text-emerald-900">
                    IVA: ${iva.toFixed(2)}
                </h3>
                <h3 className="text-lg font-semibold text-emerald-900">
                    Total: ${total.toFixed(2)}
                </h3>

                <Button
                    onClick={limpiarFactura}
                    className={`${buttonOutlineClass} py-5`}
                >
                    Limpiar
                </Button>

                <Button
                    onClick={() =>
                        navigate("/dashboard/ventas/cobro")
                    }
                    className={buttonPrimaryClass}
                >
                    Cobrar
                </Button>
            </div>

        </div>
    )
}