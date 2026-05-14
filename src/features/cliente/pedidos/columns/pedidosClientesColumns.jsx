import { createColumnHelper } from "@tanstack/react-table"
import StatusBadge from "@/features/shared/components/StatusBadge"
import { FiEye } from "react-icons/fi"

const columnHelper = createColumnHelper()

export const pedidosClienteColumns = (onRevisar) => [

    columnHelper.accessor("fecha", {
        header: "Fecha"
    }),

    columnHelper.accessor("total", {
        header: "Total",
        cell: ({ row }) => `$${row.original.total}`
    }),

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
        header: "Acción",
        cell: ({ row }) => {

            const pedido = row.original

            return (
                <button
                    onClick={() => onRevisar(pedido)}
                    className="
                        px-3 py-1.5 rounded-lg
                        bg-emerald-100
                        hover:bg-emerald-200
                        text-emerald-700
                        text-sm
                        flex items-center gap-2
                        mx-auto
                        transition
                    "
                >
                    <FiEye />
                    Ver
                </button>
            )
        }
    })
]