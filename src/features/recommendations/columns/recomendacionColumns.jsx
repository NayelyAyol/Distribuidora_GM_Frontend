import StatusBadge from "@/features/shared/components/StatusBadge"
import { createColumnHelper } from "@tanstack/react-table"
import { FiMessageCircle } from "react-icons/fi"

const columnHelper = createColumnHelper()

export const recomendacionColumns = (onResponder) => [

    columnHelper.accessor("asunto", {
        header: "Asunto"
    }),


    columnHelper.accessor(row => row.vendedor?.email, {
        id: "vendedor",
        header: "Vendedor"
    }),

    columnHelper.accessor("createdAt", {
        header: "Fecha",
        cell: ({ getValue }) =>
            new Date(getValue()).toLocaleDateString("es-EC")
    }),

    columnHelper.accessor("estado", {
        header: "Estado",
        cell: ({ getValue }) => {
            const estado = getValue()
            return (
                <StatusBadge
                    label={estado === "FINALIZADA" ? "Finalizada" : "Pendiente"}
                    isActivo={estado === "FINALIZADA"}
                />
            )
        }
    }),

    columnHelper.display({
        id: "acciones",
        header: "Acciones",
        cell: ({ row }) => (
            <div className="flex justify-center gap-3">
                <button
                    onClick={() => onResponder(row.original)}
                    className="text-emerald-700 hover:text-emerald-900"
                    disabled={row.original.estado === "FINALIZADA"}
                >
                    <FiMessageCircle />
                </button>
            </div>
        )
    })
]