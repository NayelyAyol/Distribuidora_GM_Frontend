export default function RecomendacionCard({ item }) {
    return (
        <div className="p-4 sm:p-5 rounded-2xl border border-gray-100 shadow-sm bg-white hover:shadow-md transition">

            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1">

                <h3 className="font-semibold text-gray-800 break-words min-w-0">
                    {item.asunto}
                </h3>

                <span className="text-xs text-gray-400 shrink-0 sm:ml-2">
                    {item.createdAt
                        ? new Date(item.createdAt).toLocaleDateString()
                        : ""}
                </span>

            </div>

            <p className="mt-2 text-gray-600 text-sm sm:text-base [overflow-wrap:anywhere]">
                {item.mensaje}
            </p>

            <div className="border-t mt-4 pt-3">
                <p className="text-sm text-gray-500 mb-1">
                    Respuesta del administrador:
                </p>

                {item.respuestaAdmin ? (
                    <p className="text-emerald-700 font-medium text-sm [overflow-wrap:anywhere]">
                        {item.respuestaAdmin}
                    </p>
                ) : (
                    <p className="text-gray-400 italic text-sm">
                        Aún sin respuesta
                    </p>
                )}
            </div>

            <div className="mt-4 flex justify-end">
                <span
                    className={`text-xs px-2 py-1 rounded-full ${
                        item.estado === "FINALIZADA"
                            ? "bg-emerald-100 text-emerald-900"
                            : "bg-blue-100 text-blue-700"
                    }`}
                >
                    {item.estado === "FINALIZADA" ? "Atendida" : "Pendiente"}
                </span>
            </div>

        </div>
    )
}