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
    console.log("ResumenPago props:", { carrito, esPedidoFoto, totalPedidoFoto, resumenDatos });
    if (!resumenDatos && (!carrito || carrito.length === 0) && totalPedidoFoto === 0) {
        return <div className="p-4 text-red-500">No se encontraron datos de pago.</div>;
    }

    const baseAmount = Number(totalPedidoFoto) || 0;    

    const subtotal = resumenDatos?.subtotalProductos || (esPedidoFoto ? totalPedidoFoto / 1.15 : carrito?.subtotalGeneral || 0);
    const iva = resumenDatos?.ivaProductos || (esPedidoFoto ? totalPedidoFoto - subtotal : carrito?.ivaGeneral || 0);
    const totalBase = resumenDatos?.totalPagar || (esPedidoFoto ? totalPedidoFoto : carrito?.totalGeneral || 0);

    const costoEnvio = tipoEntrega === "domicilio" ? 3.50 : 0;
    const esDomicilio = tipoEntrega === "domicilio";
    const totalFinal = (Number(totalBase) || 0) + costoEnvio;

    if (isNaN(subtotal) || isNaN(totalFinal)) {
        return <p>Cargando resumen...</p>;
    }

    if (totalFinal <= 0 && !esPedidoFoto) {
        return <div className="p-4 text-red-500">Error: No se pudo obtener el total.</div>;
    }


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