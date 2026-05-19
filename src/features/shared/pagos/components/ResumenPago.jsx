export default function ResumenPago({
    carrito
}) {

    const subtotal = carrito.reduce(
        (acc, p) => acc + p.precio * p.cantidad,
        0
    )

    const iva = subtotal * 0.15

    const total = subtotal + iva

    return (

        <div className="
            bg-white
            rounded-2xl
            shadow-sm
            p-6
            flex flex-col gap-4
            h-fit
        ">

            <h2 className="text-xl font-bold">
                Resumen
            </h2>

            <div className="flex justify-between">
                <span>Subtotal</span>

                <span>
                    ${subtotal.toFixed(2)}
                </span>
            </div>

            <div className="flex justify-between">
                <span>IVA</span>

                <span>
                    ${iva.toFixed(2)}
                </span>
            </div>

            <div className="
                flex justify-between
                text-lg
                font-bold
                text-emerald-700
            ">
                <span>Total</span>

                <span>
                    ${total.toFixed(2)}
                </span>
            </div>

        </div>
    )
}