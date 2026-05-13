import StatusBadge from "@/features/shared/components/StatusBadge"
import { createColumnHelper } from "@tanstack/react-table"

const columnHelper = createColumnHelper()

export const usuarioColumns = (onRefresh, onToggleEstado) => [

    columnHelper.display({
        id: "nombre",
        header: "Nombre",
        cell: ({ row }) => row.original.perfilId?.nombre || "-"
    }),

    columnHelper.display({
        id: "apellido",
        header: "Apellido",
        cell: ({ row }) => row.original.perfilId?.apellido || "-"
    }),

    columnHelper.display({
        id: "email",
        header: "Email",
        cell: ({ row }) => row.original.email || "-"
    }),

    columnHelper.display({
        id: "cedula",
        header: "Cédula",
        cell: ({ row }) => row.original.perfilId?.cedula || "-"
    }),

    columnHelper.display({
        id: "estado",
        header: "Estado",
        cell: ({ row }) => {
            const usuario = row.original

            const handleToggle = async (estado) => {
                await onToggleEstado(usuario, estado)
                await onRefresh()
            }

            return (
                <StatusBadge
                    estado={usuario.estado}
                    onToggle={handleToggle}
                />
            )
        }
    })
]