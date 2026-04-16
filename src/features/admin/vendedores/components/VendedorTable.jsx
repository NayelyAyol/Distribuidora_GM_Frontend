import React from "react"
import { Card } from "@/components/ui/card"
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable
} from "@tanstack/react-table"

import { FiEdit } from "react-icons/fi"
import StatusBadge from "../../../shared/components/StatusBadge"
import { activarVendedor, desactivarVendedor } from "../services/vendedorService"
import { toast } from "react-toastify"

const columnHelper = createColumnHelper()

export default function VendedoresTable({ data, onRefresh }) {

    const columns = [
        columnHelper.accessor(row => row.perfilId?.nombre || "-", {
            id: "nombre",
            header: "Nombre"
        }),

        columnHelper.accessor(row => row.perfilId?.apellido || "-", {
            id: "apellido",
            header: "Apellido"
        }),

        columnHelper.accessor("email" || "-", {
            header: "Email"
        }),

        columnHelper.accessor("estado", {
            header: "Estado",
            cell: ({ row }) => {
                const vendedor = row.original

                const handleToggle = async (nuevoEstado) => {
                    try {
                        if (nuevoEstado) {
                            await activarVendedor(vendedor._id)
                            toast.success("Vendedor activado")
                        } else {
                            await desactivarVendedor(vendedor._id)
                            toast.success("Vendedor desactivado")
                        }

                        if (onRefresh) {
                            onRefresh()
                        }

                    } catch (error) {
                        toast.error("Error al actualizar estado")
                        console.error(error)
                    }
                }

                return (
                    <div className="flex justify-center">
                        <StatusBadge
                            estado={vendedor.estado}
                            onToggle={handleToggle}
                        />
                    </div>
                )
            }
        }),

        columnHelper.display({
            id: "acciones",
            header: "Acciones",
            cell: ({ row }) => {
                const vendedor = row.original

                return (
                    <div className="flex gap-4 justify-center">

                        <button className="flex items-center gap-1 text-emerald-800 hover:text-emerald-900">
                            <FiEdit />
                            Editar
                        </button>

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
        <Card extra="w-full p-4 overflow-x-auto">

            <table className="w-full">

                {/* HEADER */}
                <thead>
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <th
                                    key={header.id}
                                    className="text-center py-2 text-black font-semibold bg-emerald-700/10"
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

                {/* BODY */}
                <tbody>
                    {table.getRowModel().rows.length === 0 ? (
                        <tr>
                            <td colSpan={columns.length} className="text-center py-6 text-gray-400">
                                No hay vendedores disponibles
                            </td>
                        </tr>
                    ) : (
                        table.getRowModel().rows.map(row => (
                            <tr key={row.id} className="border-t hover:bg-gray-50 transition">
                                {row.getVisibleCells().map(cell => (
                                    <td
                                        key={cell.id}
                                        className="py-3 text-sm text-gray-700 text-center"
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

        </Card>
    )
}