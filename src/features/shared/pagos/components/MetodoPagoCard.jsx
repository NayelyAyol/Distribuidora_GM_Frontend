export default function MetodoPagoCard({
    titulo,
    descripcion,
    icono,
    seleccionado,
    onClick
}) {

    return (

        <button
            onClick={onClick}
            className={`
                w-full
                border
                rounded-2xl
                p-4
                flex items-center gap-4
                transition
                hover:shadow-md

                ${seleccionado
                    ? "border-emerald-500 bg-emerald-50"
                    : "border-gray-200 bg-white"
                }
            `}
        >

            <div className="
                w-14 h-14
                rounded-xl
                bg-gray-100
                flex items-center justify-center
            ">
                {icono}
            </div>

            <div className="text-left">
                <h3 className="font-semibold text-gray-800">
                    {titulo}
                </h3>

                <p className="text-sm text-gray-500">
                    {descripcion}
                </p>
            </div>

        </button>
    )
}