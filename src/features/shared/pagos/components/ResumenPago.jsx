export default function ResumenPago({
    productos = [],
    esPedidoFoto = false,
    totalPedidoFoto = 0
}) {

    let subtotal = 0
    let iva = 0
    let total = 0

    if (esPedidoFoto) {

        total = totalPedidoFoto
        subtotal = total / 1.15
        iva = total - subtotal

    } else {

        subtotal = productos.reduce(
            (acc, p) => acc + p.precio * p.cantidad,
            0
        )

        iva = subtotal * 0.15
        total = subtotal + iva

    }

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

                <span>
                    Subtotal
                </span>

                <span>
                    ${subtotal.toFixed(2)}
                </span>

            </div>

            <div className="flex justify-between">

                <span>
                    IVA
                </span>

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

                <span>
                    Total
                </span>

                <span>
                    ${total.toFixed(2)}
                </span>

            </div>

        </div>
    )
}