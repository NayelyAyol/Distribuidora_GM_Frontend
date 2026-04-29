import { buttonOutlineClass } from "@/utils/styles"


export default function FeedbackCard({ item, onOpen }) {

    return (
        <div className="p-5 rounded-2xl border border-gray-100 shadow-sm bg-emerald-700/5 hover:shadow-md transition">

            <p className="text-gray-800 text-base">
                {item.text}
            </p>

            {item.respuesta && (
                <p className="text-sm text-emerald-700 mt-2">
                    Administrador: {item.respuesta}
                </p>
            )}

            <div className="flex justify-between items-center mt-4 text-sm text-gray-500">

                <span>{item.user}</span>

                <div className="flex items-center gap-3">

                    <span className={`text-xs px-2 py-1 rounded-full ${item.estado === "Respondido"
                            ? "bg-emerald-100 text-emerald-900"
                            : "bg-blue-100 text-blue-700"
                        }`}>
                        {item.estado}
                    </span>

                    {item.estado === "Pendiente" && (
                        <button
                            onClick={onOpen}
                            className={`${buttonOutlineClass} text-[11px] px-2 `}
                        >
                            Responder
                        </button>
                    )}

                </div>

            </div>

        </div>
    )
}