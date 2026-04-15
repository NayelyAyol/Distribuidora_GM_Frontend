import { Card } from "@/components/ui/card"
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable
} from "@tanstack/react-table"

import ClienteStatus from "./ClienteStatus"

const columnHelper = createColumnHelper()

export default function ClientesTable({ data }) {

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
            id: "estado",
            header: "Estado",
            cell: ({ row }) => (
                <ClienteStatus estado={row.original.estado} />
            )
        })
    ]

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel()
    })

    return (
        <Card extra="w-full p-6 overflow-x-auto">

            <div className="w-full flex justify-center">
                <table className="w-[95%]">

                    <thead>
                        {table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map(header => (
                                    <th key={header.id} className="text-center py-2 text-black text-sm bg-emerald-700/10">
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
                            <tr key={row.id} className=" border-t hover:bg-gray-50/50 transition">

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