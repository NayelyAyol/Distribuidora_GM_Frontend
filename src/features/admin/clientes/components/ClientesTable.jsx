import { Card } from "@/components/ui/card"
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable
} from "@tanstack/react-table"

import StatusBadge from "@/features/shared/components/StatusBadge"
import { activarCliente, desactivarCliente } from "../services/clienteService"
import { toast } from "react-toastify"

const columnHelper = createColumnHelper()

export default function ClientesTable({ data, onRefresh }) {

    const columns = [
        columnHelper.accessor(row => row.perfilId?.nombre, {
            id: "nombre",
            header: "Nombre"
        }),

        columnHelper.accessor(row => row.perfilId?.apellido, {
            id: "apellido",
            header: "Apellido"
        }),

        columnHelper.accessor("email", {
            header: "Email"
        }),

        columnHelper.accessor("estado", {
            header: "Estado",
            cell: ({ row }) => {
                const cliente = row.original

                const handleToggle = async (nuevoEstado) => {
                    try {
                        if (nuevoEstado) {
                            await activarCliente(cliente._id)
                            toast.success("Cliente activado")
                        } else {
                            await desactivarCliente(cliente._id)
                            toast.success("Cliente desactivado")
                        }

                        if (onRefresh) onRefresh()

                    } catch (error) {
                        toast.error("Error al actualizar estado")
                    }
                }

                return (
                    <div className="flex justify-center">
                        <StatusBadge
                            estado={cliente.estado}
                            onToggle={handleToggle}
                        />
                    </div>
                )
            }
        })
    ]

    const table = useReactTable({
        data: data || [],
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
                        {table.getRowModel().rows.length === 0 ? (
                            <tr>
                                <td colSpan={columns.length} className="text-center py-6 text-gray-400">
                                    No hay clientes disponibles
                                </td>
                            </tr>
                        ) : (
                            table.getRowModel().rows.map(row => (
                                <tr key={row.id} className="border-t hover:bg-gray-50/50 transition">
                                    {row.getVisibleCells().map(cell => (
                                        <td key={cell.id} className="py-3 text-sm text-gray-700 text-center">
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