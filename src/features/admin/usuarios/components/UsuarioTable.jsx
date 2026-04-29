import { Card } from "@/components/ui/card"
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable
} from "@tanstack/react-table"

import StatusBadge from "@/features/shared/components/StatusBadge"
import { toast } from "react-toastify"

const columnHelper = createColumnHelper()

export default function UsuarioTable({
    data,
    onRefresh,
    onToggleEstado,
    extraColumns = []
}) {

    const columns = [
        columnHelper.accessor(row => row.perfilId?.nombre || "-", {
            id: "nombre",
            header: "Nombre"
        }),

        columnHelper.accessor(row => row.perfilId?.apellido || "-", {
            id: "apellido",
            header: "Apellido"
        }),

        columnHelper.accessor("email", {
            header: "Email"
        }),

        columnHelper.accessor("estado", {
            header: "Estado",
            cell: ({ row }) => {
                const usuario = row.original

                const handleToggle = async (nuevoEstado) => {
                    try {
                        await onToggleEstado(usuario, nuevoEstado)
                        if (onRefresh) onRefresh()
                    } catch {
                        toast.error("Error al actualizar estado")
                    }
                }

                return (
                    <div className="flex justify-center">
                        <StatusBadge
                            estado={usuario.estado}
                            onToggle={handleToggle}
                        />
                    </div>
                )
            }
        }),

        ...extraColumns
    ]

    const table = useReactTable({
        data: data || [],
        columns,
        getCoreRowModel: getCoreRowModel()
    })

    return (
        <Card className="w-full p-6">

            <div className="w-full flex overflow-x-auto">
                <table className="min-w-[600px] w-full">

                    <thead>
                        {table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map(header => (
                                    <th
                                        key={header.id}
                                        className="text-center py-2 text-black text-sm bg-emerald-700/10 whitespace-nowrap"
                                    >
                                        {flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>

                    <tbody>
                        {table.getRowModel().rows.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={columns.length}
                                    className="text-center py-6 text-gray-400"
                                >
                                    No hay usuarios disponibles
                                </td>
                            </tr>
                        ) : (
                            table.getRowModel().rows.map(row => (
                                <tr
                                    key={row.id}
                                    className="border-t hover:bg-gray-50/50 transition"
                                >
                                    {row.getVisibleCells().map(cell => (
                                        <td
                                            key={cell.id}
                                            className="py-3 text-sm text-gray-700 text-center whitespace-nowrap"
                                        >
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        )}
                    </tbody>

                </table>
            </div>
        </Card>
    )
}