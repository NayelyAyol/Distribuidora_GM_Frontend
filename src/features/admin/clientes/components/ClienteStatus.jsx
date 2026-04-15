import { useState } from "react"

export default function ClienteStatus({ estado }) {

    const [active, setActive] = useState(estado)

    return (
        <button
            onClick={() => setActive(!active)}
            className={`
                px-3 py-1 rounded-full text-xs font-semibold transition
                ${active 
                    ? "bg-emerald-100 text-emerald-700" 
                    : "bg-gray-200 text-gray-600"
                }
            `}
        >
            {active ? "Activo" : "Inactivo"}
        </button>
    )
}