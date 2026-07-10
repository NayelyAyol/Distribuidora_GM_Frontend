import { FiAlertCircle, FiMessageSquare } from "react-icons/fi"

export default function FeedbackCard({ item, onOpen }) {
    return (
        <div className="p-4 sm:p-5 rounded-2xl border border-gray-100 shadow-sm bg-emerald-700/5 hover:shadow-md transition">

            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-3">

                <div className="flex flex-wrap items-center gap-2 min-w-0">
                    <span
                        className={`inline-flex shrink-0 items-center gap-1 text-xs px-2 py-1 rounded-full font-medium ${
                            item.tipo === "QUEJA"
                                ? "bg-red-100 text-red-700"
                                : "bg-blue-100 text-blue-700"
                        }`}
                    >
                        {item.tipo === "QUEJA"
                            ? <FiAlertCircle className="text-[11px]" />
                            : <FiMessageSquare className="text-[11px]" />
                        }
                        {item.tipo === "QUEJA" ? "Queja" : "Sugerencia"}
                    </span>

                    <h3 className="font-semibold text-gray-800 break-words min-w-0">
                        {item.asunto}
                    </h3>
                </div>

                <p className="text-[11px] text-gray-400 shrink-0 sm:ml-2">
                    {item.createdAt
                        ? new Date(item.createdAt).toLocaleDateString("es-EC", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric"
                        })
                        : ""}
                </p>

            </div>

            <p className="text-gray-800 text-sm sm:text-base break-words">
                {item.mensaje}
            </p>

            {item.respuestaAdmin && (
                <p className="text-sm text-emerald-700 mt-2 break-words">
                    Administrador: {item.respuestaAdmin}
                </p>
            )}

            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mt-4 text-sm text-gray-500">

                <span className="break-all text-xs sm:text-sm">
                    {item.usuario?.email || item.rolUsuario}
                </span>

                <div className="flex items-center gap-3 flex-wrap">
                    <span
                        className={`text-xs px-2 py-1 rounded-full shrink-0 ${
                            item.estado === "FINALIZADA"
                                ? "bg-emerald-100 text-emerald-900"
                                : "bg-amber-100 text-amber-700"
                        }`}
                    >
                        {item.estado === "FINALIZADA" ? "Finalizada" : "Pendiente"}
                    </span>

                    {item.estado === "PENDIENTE" && (
                        <button
                            onClick={onOpen}
                            className="border-2 border-emerald-900 text-emerald-900 bg-transparent rounded-full font-bold hover:bg-emerald-900 hover:text-white transition-all text-xs px-3 py-0.5 shrink-0"
                        >
                            Responder
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}