import {
    FiCreditCard,
    FiDollarSign,
} from "react-icons/fi"

import MetodoPagoCard from "./MetodoPagoCard"

export default function MetodoPagoSelector({
    metodoSeleccionado,
    setMetodoSeleccionado
}) {

    return (

        <div className="flex flex-col gap-4">

            <MetodoPagoCard
                titulo="Tarjeta"
                descripcion="Crédito o débito"
                seleccionado={metodoSeleccionado === "tarjeta"}
                onClick={() => setMetodoSeleccionado("tarjeta")}
                icono={
                    <FiCreditCard
                        size={24}
                        className="text-emerald-700"
                    />
                }
            />

            <MetodoPagoCard
                titulo="Transferencia"
                descripcion="Banco Pichincha o Produbanco"
                seleccionado={metodoSeleccionado === "transferencia"}
                onClick={() => setMetodoSeleccionado("transferencia")}
                icono={
                    <FiDollarSign
                        size={24}
                        className="text-blue-700"
                    />
                }
            />

        </div>
    )
}