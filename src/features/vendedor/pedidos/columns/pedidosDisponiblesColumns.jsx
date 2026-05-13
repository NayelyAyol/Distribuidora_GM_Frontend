import { createColumnHelper } from "@tanstack/react-table"
import StatusBadge from "@/features/shared/components/StatusBadge"

const columnHelper = createColumnHelper()

export const pedidosDisponiblesColumns = (onToggle) => [

    columnHelper.accessor("cliente", {
        header: "Cliente"
    }),

    columnHelper.accessor("fecha", {
        header: "Fecha"
    }),

    columnHelper.accessor("estado", {
        header: "Estado",
        cell: ({ row }) => {
            const pedido = row.original

            const handleToggle = async (nuevoEstado) => {
                await onToggle(pedido, nuevoEstado)
            }

            return (
                <div className="flex justify-center">
                    <StatusBadge
                        estado={pedido.estado}
                        onToggle={handleToggle}
                        labelActivo="Tomado"
                        labelInactivo="Disponible"
                    />
                </div>
            )
        }
    })
]