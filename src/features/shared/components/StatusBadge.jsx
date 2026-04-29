export default function StatusBadge({
    estado,
    onToggle,
    labelActivo = "Activo",
    labelInactivo = "Inactivo"
}) {
    return (
        <button
            onClick={() => onToggle(!estado)}
            className={`
                px-3 py-1 rounded-full text-xs font-semibold transition
                ${estado
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-gray-200 text-gray-600"
                }
            `}
        >
            {estado ? labelActivo : labelInactivo}
        </button>
    )
}