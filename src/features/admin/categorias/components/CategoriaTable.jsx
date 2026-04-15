import { Card } from "@/components/ui/card"
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable
} from "@tanstack/react-table"

import { FiEdit, FiTrash } from "react-icons/fi"

const columnHelper = createColumnHelper()

export default function CategoriasTable({ data }) {

    const columns = [
        columnHelper.accessor("nombre", {
            header: "Nombre"
        }),
        columnHelper.accessor("descripcion", {
            header: "Descripción"
        }),

        columnHelper.display({
            id: "acciones",
            header: "Acciones",
            cell: () => (
                <div className="flex gap-3">

                    <button className="text-emerald-700 hover:text-emerald-900 flex items-center gap-1">
                        <FiEdit /> Editar
                    </button>

                    <button className="text-red-500 hover:text-red-700 flex items-center gap-1">
                        <FiTrash /> Eliminar
                    </button>

                </div>
            )
        })
    ]

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel()
    })

    return (
        <Card className="p-6 shadow-none border-0">

            <div className="flex justify-center">
                <table className="w-[95%]">

                    <thead>
                        {table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map(header => (
                                    <th
                                        key={header.id}
                                        className="text-center py-2 text-black text-sm bg-emerald-700/10"
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
                        {table.getRowModel().rows.map(row => (
                            <tr key={row.id} className="border-t hover:bg-gray-50/50">

                                {row.getVisibleCells().map(cell => (
                                    <td key={cell.id} className="py-3 text-sm text-gray-700 text-center">
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                        )}
                                    </td>
                                ))}

                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>

        </Card>
    )
}