export default function ResumenPago({
    carrito,
    esPedidoFoto,
    totalPedidoFoto = 0,
    resumenDatos,
    tipoEntrega
}) {

    if (!carrito && !esPedidoFoto) {
        return <p>Cargando resumen...</p>;
    }

    const esDomicilio =
        tipoEntrega === "domicilio" ||
        tipoEntrega === "ENVIO_DOMICILIO";

    // ✅ Si viene resumenDatos del backend, úsalo directamente sin recalcular nada
    if (resumenDatos) {
        const subtotal = resumenDatos.subtotalProductos || 0;
        const iva = resumenDatos.ivaProductos || 0;
        const costoEnvio = resumenDatos.costoEnvio ?? (esDomicilio ? 3.50 : 0);
        const total = resumenDatos.totalPagar || 0;

        return (
            <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col gap-4">
                <h2 className="text-xl font-bold">Resumen</h2>
                <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                    <span>IVA (15%)</span>
                    <span>${iva.toFixed(2)}</span>
                </div>
                {costoEnvio > 0 && (
                    <div className="flex justify-between text-gray-600">
                        <span>Comisión de envío</span>
                        <span>${costoEnvio.toFixed(2)}</span>
                    </div>
                )}
                <div className="flex justify-between text-lg font-bold text-emerald-700 border-t pt-3">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                </div>
            </div>
        );
    }

    // ✅ Fallback solo para flujo de carrito sin resumenDatos
    if (!carrito || carrito.length === 0) {
        return <div className="p-4 text-red-500">No se encontraron datos de pago.</div>;
    }

    const subtotal = carrito?.subtotalGeneral || 0;
    const iva = carrito?.ivaGeneral || 0;
    const costoEnvio = esDomicilio ? 3.50 : 0;
    const totalFinal = (carrito?.totalGeneral || 0) + costoEnvio;

    if (totalFinal <= 0) {
        return <div className="p-4 text-red-500">Error: No se pudo obtener el total.</div>;
    }

    return (
        <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col gap-4">
            <h2 className="text-xl font-bold">Resumen</h2>
            <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
                <span>IVA (15%)</span>
                <span>${iva.toFixed(2)}</span>
            </div>
            {costoEnvio > 0 && (
                <div className="flex justify-between text-gray-600">
                    <span>Comisión de envío</span>
                    <span>${costoEnvio.toFixed(2)}</span>
                </div>
            )}
            <div className="flex justify-between text-lg font-bold text-emerald-700 border-t pt-3">
                <span>Total</span>
                <span>${totalFinal.toFixed(2)}</span>
            </div>
        </div>
    );
}