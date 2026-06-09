import {
    FiCreditCard,
    FiDollarSign,
} from "react-icons/fi"
import { MdPayments } from "react-icons/md";

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
                seleccionado={metodoSeleccionado === "TARJETA"}
                onClick={() => setMetodoSeleccionado("TARJETA")}
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
                seleccionado={metodoSeleccionado === "TRANSFERENCIA"}
                onClick={() => setMetodoSeleccionado("TRANSFERENCIA")}
                icono={
                    <FiDollarSign
                        size={24}
                        className="text-blue-700"
                    />
                }
            />

            <MetodoPagoCard
                titulo="Efectivo"
                descripcion="Paga al retirar tu pedido o al recibirlo en tu domicilio"
                seleccionado={metodoSeleccionado === "EFECTIVO"}
                onClick={() => setMetodoSeleccionado("EFECTIVO")}
                icono={
                    <MdPayments
                        size={24}
                        className="text-green-700"
                    />
                }
            />

        </div>
    )
}