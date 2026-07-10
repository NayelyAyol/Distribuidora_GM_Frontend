import StatusBadge from "@/features/shared/components/StatusBadge"
import { createColumnHelper } from "@tanstack/react-table"

const columnHelper = createColumnHelper()

export const usuarioColumns = (onRefresh, onToggleEstado) => [

    columnHelper.display({
        id: "nombre",
        header: "Nombre",
        cell: ({ row }) => {
            const nombre = row.original.perfilId?.nombre || "-"
            return (
                <span className="truncate max-w-[150px] inline-block align-middle" title={nombre}>
                    {nombre}
                </span>
            )
        }
    }),

    columnHelper.display({
        id: "apellido",
        header: "Apellido",
        cell: ({ row }) => {
            const apellido = row.original.perfilId?.apellido || "-"
            return (
                <span className="truncate max-w-[150px] inline-block align-middle" title={apellido}>
                    {apellido}
                </span>
            )
        }
    }),

    columnHelper.display({
        id: "email",
        header: "Email",
        cell: ({ row }) => {
            const email = row.original.email || "-"
            return (
                <span className="truncate max-w-[210px] inline-block align-middle" title={email}>
                    {email}
                </span>
            )
        }
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

            const isActivo = usuario.estado === true || usuario.estado === "ACTIVO"
            const label = isActivo ? "Activo" : "Inactivo"

            const handleToggle = async () => {
                const nuevoEstado = isActivo ? "INACTIVO" : "ACTIVO";
                await onToggleEstado(usuario, nuevoEstado)
                await onRefresh()
            }

            return (
                <StatusBadge
                    label={label}
                    isActivo={isActivo}
                    onToggle={handleToggle}
                />
            )
        }
    })
]