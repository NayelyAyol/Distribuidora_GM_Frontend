import { useState } from "react"
import { toast } from "react-toastify"
import { FiEye, FiTrash2 } from "react-icons/fi"

import RecomendacionTable from "../components/RecomendacionTable"
import NotificationPage from "./NotificationPage"
import { createColumnHelper } from "@tanstack/react-table"

const columnHelper = createColumnHelper()

export default function RecomendacionesPage() {

    const [tab, setTab] = useState("vendedor")

    const recomendacionesVendedor = [
        {
            id: 1,
            descripcion: "Ofrecer combo promocional",
            vendedor: "Carlos Ruiz",
            fecha: "2025-04-28",
            estado: false
        }
    ]

    const extraColumns = [
        columnHelper.display({
            id: "acciones",
            header: "Acción",
            cell: ({ row }) => {
                const rec = row.original

                return (
                    <div className="flex justify-center gap-3">
                        <button
                            onClick={() => toast.info(`Ver ${rec.id}`)}
                            className="text-emerald-700 hover:text-emerald-900"
                        >
                            <FiEye />
                        </button>

                        <button
                            onClick={() => toast.warn(`Eliminar ${rec.id}`)}
                            className="text-red-600 hover:text-red-800"
                        >
                            <FiTrash2 />
                        </button>
                    </div>
                )
            }
        })
    ]

    return (
        <div className="p-6 space-y-6">

            <div>
                <p className="text-gray-500">
                    Este módulo te permite gestionar las recomendaciones del sistema y vendedores
                </p>
            </div>

            <div className="bg-white/60 backdrop-blur-xl rounded-2xl border border-white/20 overflow-hidden">

                <div className="flex border-b bg-white">
                    <button
                        onClick={() => setTab("vendedor")}
                        className={`px-6 py-3 text-sm font-medium ${
                            tab === "vendedor"
                                ? "bg-emerald-100 text-emerald-800"
                                : "text-gray-600 hover:bg-gray-100"
                        }`}
                    >
                        Recomendaciones del vendedor
                    </button>

                    <button
                        onClick={() => setTab("ia")}
                        className={`px-6 py-3 text-sm font-medium ${
                            tab === "ia"
                                ? "bg-emerald-100 text-emerald-800"
                                : "text-gray-600 hover:bg-gray-100"
                        }`}
                    >
                        Recomendaciones inteligentes
                    </button>
                </div>

                <div className="p-6">

                    {tab === "vendedor" ? (
                        <RecomendacionTable
                            data={recomendacionesVendedor}
                            extraColumns={extraColumns}
                            onToggleEstado={async (rec, estado) => {
                                toast.success(
                                    `Recomendación ${estado ? "atendida" : "no atendida"}`
                                )
                            }}
                        />
                    ) : (
                        <NotificationPage />
                    )}

                </div>

            </div>

        </div>
    )
}