import { FiCheckCircle } from "react-icons/fi"

export default function PagoExitoso() {

    return (

        <div className="
            bg-emerald-50
            border border-emerald-200
            rounded-2xl
            p-6
            flex flex-col items-center gap-3
        ">

            <FiCheckCircle
                size={50}
                className="text-emerald-600"
            />

            <h2 className="text-2xl font-bold text-emerald-700">
                Pago realizado
            </h2>

            <p className="text-gray-600 text-center">
                Tu pedido fue registrado correctamente.
            </p>

        </div>
    )
}