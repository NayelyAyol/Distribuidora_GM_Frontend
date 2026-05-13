import StatusBadge from "@/features/shared/components/StatusBadge"
import { createColumnHelper } from "@tanstack/react-table"
import { FiMessageCircle, FiTrash2 } from "react-icons/fi"

const columnHelper = createColumnHelper()

export const recomendacionColumns = (onResponder, onDelete, onToggleEstado) => [

    columnHelper.accessor("descripcion", {
        header: "Descripción"
    }),

    columnHelper.accessor("vendedor", {
        header: "Vendedor"
    }),

    columnHelper.accessor("fecha", {
        header: "Fecha"
    }),

    columnHelper.accessor("estado", {
        header: "Estado",
        cell: ({ row }) => {

            const rec = row.original

            return (
                <StatusBadge
                    estado={rec.estado}
                    onToggle={(estado) => onToggleEstado(rec, estado)}
                    labelActivo="Finalizada"
                    labelInactivo="Pendiente"
                />
            )
        }
    }),

    columnHelper.display({
        id: "acciones",
        header: "Acciones",
        cell: ({ row }) => {

            const rec = row.original

            return (
                <div className="flex justify-center gap-3">

                    <button
                        onClick={() => onResponder(rec)}
                        className="text-emerald-700 hover:text-emerald-900"
                    >
                        <FiMessageCircle />
                    </button>

                    <button
                        onClick={() => onDelete(rec)}
                        className="text-red-600 hover:text-red-800"
                    >
                        <FiTrash2 />
                    </button>

                </div>
            )
        }
    })
]