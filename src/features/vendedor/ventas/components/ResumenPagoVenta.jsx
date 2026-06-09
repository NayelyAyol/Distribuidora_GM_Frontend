import { calcularFactura } from "@/utils/calcularFactura"

export default function ResumenPagoVenta({
    factura,
    tipoEntrega
}) {

    const {
        subtotal,
        iva,
        envio,
        total
    } = calcularFactura(factura, tipoEntrega)

    return (
        <div className="bg-white/70 backdrop-blur-xl rounded-2xl border p-6 flex flex-col gap-3">

            <h2 className="text-lg font-bold text-gray-800">
                Resumen de venta
            </h2>

            <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between text-gray-600">
                <span>IVA (15%)</span>
                <span>${iva.toFixed(2)}</span>
            </div>

            {envio > 0 && (
                <div className="flex justify-between text-gray-600">
                    <span>Envío</span>
                    <span>${envio.toFixed(2)}</span>
                </div>
            )}

            <div className="border-t pt-3 flex justify-between font-bold text-emerald-700 text-lg">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
            </div>
        </div>
    )
}