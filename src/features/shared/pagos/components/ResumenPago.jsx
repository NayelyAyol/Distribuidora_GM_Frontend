export default function ResumenPago({
    carrito,
    esPedidoFoto,
    totalPedidoFoto,
    tipoEntrega
}) {

    if (!carrito && !esPedidoFoto) {
        return <p>Cargando resumen...</p>;
    }

    const costoEnvio =
    tipoEntrega === "domicilio"
        ? 3.50
        : 0;

    const esDomicilio =
        tipoEntrega === "domicilio";

    const subtotal = esPedidoFoto
        ? totalPedidoFoto / 1.15
        : carrito?.subtotalGeneral || 0;

    const iva = esPedidoFoto
        ? totalPedidoFoto - subtotal
        : carrito?.ivaGeneral || 0;

    const totalBase = esPedidoFoto
        ? totalPedidoFoto
        : carrito?.totalGeneral || 0;

    const totalFinal = esDomicilio
        ? totalBase + costoEnvio
        : totalBase;

    return (
        <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col gap-4">

            <h2 className="text-xl font-bold">
                Resumen
            </h2>

            <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between">
                <span>IVA (15%)</span>
                <span>${iva.toFixed(2)}</span>
            </div>

            {esDomicilio && (
                <div className="flex justify-between text-gray-600">
                    <span>Comisión de envío</span>
                    <span>
                        ${costoEnvio.toFixed(2)}
                    </span>
                </div>
            )}

            <div className="flex justify-between text-lg font-bold text-emerald-700 border-t pt-3">
                <span>Total</span>
                <span>${totalFinal.toFixed(2)}</span>
            </div>

        </div>
    );
}