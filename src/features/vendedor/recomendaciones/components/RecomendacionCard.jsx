export default function RecomendacionCard({ item }) {

    return (
        <div className="p-5 rounded-2xl border border-gray-100 shadow-sm bg-white hover:shadow-md transition">

            <div className="flex justify-between items-start">

                <div className="flex-1">

                    <h3 className="font-semibold text-gray-800">
                        {item.asunto}
                    </h3>

                    <p className="mt-2 text-gray-600">
                        {item.mensaje}
                    </p>

                </div>

                <span className="text-xs text-gray-400">
                    {item.createdAt
                        ? new Date(item.createdAt).toLocaleDateString()
                        : ""}
                </span>

            </div>

            <div className="border-t mt-4 pt-3">

                <p className="text-sm text-gray-500 mb-1">
                    Respuesta del administrador:
                </p>

                {item.respuestaAdmin ? (
                    <p className="text-emerald-700 font-medium">
                        {item.respuestaAdmin}
                    </p>
                ) : (
                    <p className="text-gray-400 italic">
                        Aún sin respuesta
                    </p>
                )}

            </div>

            <div className="mt-4 flex justify-end">

                <span
                    className={`text-xs px-2 py-1 rounded-full ${item.estado === "FINALIZADA"
                            ? "bg-emerald-100 text-emerald-900"
                            : "bg-blue-100 text-blue-700"
                        }`}
                >
                    {item.estado === "FINALIZADA"
                        ? "Finalizada"
                        : "Pendiente"}
                </span>

            </div>

        </div>
    )
}