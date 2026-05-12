import { Card } from "@/components/ui/card"
import {
    flexRender,
    getCoreRowModel,
    useReactTable
} from "@tanstack/react-table"

export default function DataTable({ data, columns }) {

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
                                    No hay datos disponibles
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