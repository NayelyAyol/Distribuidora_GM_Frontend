import { buttonOutlineClass } from "@/utils/styles"
import { FiAlertCircle, FiMessageSquare } from "react-icons/fi"

export default function FeedbackCard({ item, onOpen }) {
    return (
        <div className="p-5 rounded-2xl border border-gray-100 shadow-sm bg-emerald-700/5 hover:shadow-md transition">
            <div className="flex justify-between items-start mb-2">

                <div className="flex items-center gap-2">
                    <span
                        className={`inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full font-medium ${
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

                    <h3 className="font-semibold text-gray-800">
                        {item.asunto}
                    </h3>
                </div>

                <p className="text-[11px] text-gray-400 shrink-0 ml-2">
                    {item.createdAt
                        ? new Date(item.createdAt).toLocaleDateString("es-EC", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric"
                        })
                        : ""}
                </p>

            </div>

            <p className="text-gray-800 text-base">
                {item.mensaje}
            </p>

            {item.respuestaAdmin && (
                <p className="text-sm text-emerald-700 mt-2">
                    Administrador: {item.respuestaAdmin}
                </p>
            )}

            <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
                <span>{item.usuario?.email || item.rolUsuario}</span>

                <div className="flex items-center gap-3">
                    <span
                        className={`text-xs px-2 py-1 rounded-full ${
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
                            className={`${buttonOutlineClass} text-[11px] px-2`}
                        >
                            Responder
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}