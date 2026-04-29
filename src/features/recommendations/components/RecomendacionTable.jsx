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

export default function RecomendacionTable({
    data,
    onRefresh,
    onToggleEstado,
    extraColumns = [],
    hiddenColumns = []
}) {

    const baseColumns = [

        columnHelper.accessor("descripcion", {
            id: "descripcion",
            header: "Descripción"
        }),

        columnHelper.accessor("vendedor", {
            id: "vendedor",
            header: "Vendedor"
        }),

        columnHelper.accessor("fecha", {
            id: "fecha",
            header: "Fecha"
        }),

        columnHelper.accessor("estado", {
            id: "estado",
            header: "Estado",
            cell: ({ row }) => {
                const recomendacion = row.original

                const handleToggle = async (nuevoEstado) => {
                    try {
                        if (onToggleEstado) {
                            await onToggleEstado(recomendacion, nuevoEstado)
                            if (onRefresh) onRefresh()
                        }
                    } catch {
                        toast.error("Error al actualizar estado")
                    }
                }

                return (
                    <div className="flex justify-center">
                        <StatusBadge
                            estado={recomendacion.estado}
                            onToggle={handleToggle}
                            labelActivo="Atendida"
                            labelInactivo="No atendida"
                        />
                    </div>
                )
            }
        })
    ]

    const allColumns = [...baseColumns, ...extraColumns]

    const filteredColumns = allColumns.filter(
        col => !hiddenColumns.includes(col.id)
    )

    const table = useReactTable({
        data: data || [],
        columns: filteredColumns,
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
                                    colSpan={filteredColumns.length}
                                    className="text-center py-6 text-gray-400"
                                >
                                    No hay recomendaciones disponibles
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