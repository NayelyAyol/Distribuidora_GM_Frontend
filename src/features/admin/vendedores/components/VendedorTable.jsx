import React from "react"
import {Card} from "@/components/ui/card"
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable
} from "@tanstack/react-table"

import { FiEdit, FiTrash } from "react-icons/fi"

const columnHelper = createColumnHelper()

export default function VendedoresTable({ data }) {

    const columns = [
        columnHelper.accessor("nombre", {
            header: "Nombre"
        }),
        columnHelper.accessor("apellido", {
            header: "Apellido"
        }),
        columnHelper.accessor("email", {
            header: "Email"
        }),

        columnHelper.display({
            id: "acciones",
            header: "Acciones",
            cell: () => (
                <div className="flex gap-4">

                    <button className="flex items-center gap-1 text-emerald-800 hover:text-emerald-900">
                        <FiEdit />
                        Editar
                    </button>

                    <button className="flex items-center gap-1 text-yellow-300 hover:text-yellow-500">
                        <FiTrash />
                        Eliminar
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
        <Card extra="w-full p-4 overflow-x-auto">

            <table className="w-full">

                <thead>
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <th key={header.id} className="text-center py-2 text-black">
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
                        <tr key={row.id} className="border-t">
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

        </Card>
    )
}