export default function RecomendacionCard({ item }) {

    return (
        <div className="p-5 rounded-2xl border border-gray-100 shadow-sm bg-white hover:shadow-md transition">

            <p className="text-gray-800 text-base font-medium">
                {item.text}
            </p>

            <div className="border-t mt-4 pt-3">

                <p className="text-sm text-gray-500 mb-1">
                    Respuesta del administrador:
                </p>

                {item.respuesta ? (
                    <p className="text-emerald-700 font-medium">
                        {item.respuesta}
                    </p>
                ) : (
                    <p className="text-gray-400 italic">
                        Aún sin respuesta
                    </p>
                )}

            </div>

            <div className="mt-4 flex justify-end">

                <span className={`text-xs px-2 py-1 rounded-full ${
                    item.respuesta
                        ? "bg-emerald-100 text-emerald-900"
                        : "bg-blue-100 text-blue-700"
                }`}>
                    {item.respuesta ? "Finalizada" : "Pendiente"}
                </span>

            </div>

        </div>
    )
}