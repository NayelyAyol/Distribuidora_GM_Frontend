// columns/pedidosSeleccionadosColumns.js
import { createColumnHelper } from "@tanstack/react-table"
import StatusBadge from "@/features/shared/components/StatusBadge"
import { FiEye, FiMessageCircle } from "react-icons/fi"

const columnHelper = createColumnHelper()

export const pedidosSeleccionadosColumns = (onRevisar, onChat) => [
    columnHelper.accessor("cliente", { header: "Cliente" }),
    columnHelper.accessor("cedula", { header: "Cédula" }),
    columnHelper.accessor("fecha", { header: "Fecha" }),
    columnHelper.accessor("estado", {
        header: "Estado",
        cell: ({ row }) => {
            const pedido = row.original
            return (
                <StatusBadge
                    estado={pedido.estado === "FINALIZADO"}
                    labelActivo="Finalizado"
                    labelInactivo="Pendiente"
                />
            )
        }
    }),
    columnHelper.display({
        id: "acciones",
        header: "Acciones",
        cell: ({ row }) => {
            const pedido = row.original
            return (
                <div className="flex items-center justify-center gap-2">
                    <button
                        onClick={() => onRevisar(pedido)}
                        className="px-3 py-1.5 rounded-lg bg-emerald-100 hover:bg-emerald-200 text-emerald-700 text-sm flex items-center gap-2 transition"
                    >
                        <FiEye />
                        Revisar
                    </button>
                    
                    <button
                        onClick={() => onChat(pedido)}
                        className="text-emerald-700 hover:text-emerald-900"
                    >
                        <FiMessageCircle />
                    </button>
                </div>
            )
        }
    })
]