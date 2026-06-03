import { createColumnHelper } from "@tanstack/react-table"
import StatusBadge from "@/features/shared/components/StatusBadge"

const columnHelper = createColumnHelper()

export const pedidosDisponiblesColumns = (onToggle) => [

    columnHelper.accessor("cliente", {
        header: "Cliente",
        cell: (info) => {
            const perfil = info.getValue()?.perfilId;
            return perfil ? `${perfil.nombre} ${perfil.apellido}` : "Sin nombre";
        }
    }),

    columnHelper.accessor("createdAt", {
        header: "Fecha",
        cell: (info) => {
            const fecha = info.getValue();
            return fecha ? new Date(fecha).toLocaleDateString('es-EC') : "N/A";
        }
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
                        labelActivo="Disponible"
                        labelInactivo="Tomado"
                    />
                </div>
            )
        }
    })
]