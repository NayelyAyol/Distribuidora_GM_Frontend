import { useMemo, useState } from "react"
import { FiSearch, FiPlus } from "react-icons/fi"

import DataTable from "@/components/ui/DataTable"
import { pedidosSeleccionadosColumns } from "../columns/pedidosSeleccionadosColumns"
import { pedidosClienteColumns } from "@/features/cliente/pedidos/columns/pedidosClientesColumns"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

import { inputClass } from "@/utils/styles"
import { useNavigate } from "react-router-dom"
import useAuthStore from "@/context/useAuthStore"

export default function PedidosPage() {

    const [filtro, setFiltro] = useState("pendientes")
    const navigate = useNavigate()
    const user = useAuthStore((state) => state.user)
    const esCliente = user?.rol?.toUpperCase() === "CLIENTE"

    const pedidos = [
        {
            id: 1,
            cliente: "Juan Pérez",
            cedula: "1712345678",
            fecha: "2026-05-10",
            estado: "PENDIENTE"
        },
        {
            id: 2,
            cliente: "María López",
            cedula: "1712345679",
            fecha: "2026-05-08",
            estado: "FINALIZADO"
        },
        {
            id: 3,
            cliente: "Carlos García",
            cedula: "1712345680",
            fecha: "2026-05-09",
            estado: "PENDIENTE"
        }
    ]

    const pedidosFiltrados = useMemo(() => {

        return pedidos.filter((pedido) => {

            const coincideFiltro =
                filtro === "pendientes"
                    ? pedido.estado === "PENDIENTE"
                    : pedido.estado === "FINALIZADO"

            return coincideFiltro
        })

    }, [pedidos, filtro])

    return (
        <div className="p-6 space-y-6">

            <div>
                <p className="text-gray-500">
                    {esCliente
                        ? "Este módulo te permite visualizar tus pedidos realizados"
                        : "Este módulo te permite gestionar los pedidos asignados a tu cargo"}
                </p>
            </div>

            <div className="bg-white/60 backdrop-blur-xl rounded-2xl border border-white/20 overflow-hidden">

                <div className="p-6 space-y-4">

                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 px-5">

                        <div className="flex items-center bg-white rounded-full w-full md:w-[300px] border border-gray-100 shadow-sm">

                            <Input
                                type="text"
                                placeholder="Buscar pedido..."
                                className={`${inputClass} bg-transparent border-0 focus:ring-0 flex-1`}
                            />

                            <button
                                className="rounded-full flex items-center justify-center max-w-[120px] h-12 px-6 bg-emerald-700/10 hover:bg-emerald-100 text-emerald-800 transition"
                            >
                                <FiSearch className="text-emerald-900 text-xl" />
                            </button>

                        </div>

                        <div className="flex flex-wrap gap-3">

                            <Button
                                onClick={() => setFiltro("pendientes")}
                                className={
                                    filtro === "pendientes"
                                        ? "bg-emerald-100 text-emerald-700"
                                        : "bg-gray-200 text-gray-600"
                                }
                            >
                                Pendientes
                            </Button>

                            <Button
                                onClick={() => setFiltro("finalizados")}
                                className={
                                    filtro === "finalizados"
                                        ? "bg-emerald-100 text-emerald-700"
                                        : "bg-gray-200 text-gray-600"
                                }
                            >
                                Finalizados
                            </Button>

                            {esCliente && (
                                <Button
                                    onClick={() => navigate("/dashboard/mis-pedidos/nuevo-pedido")}
                                    className="
                                                px-3 py-1.5 rounded-lg
                                                bg-emerald-100
                                                hover:bg-emerald-200
                                                text-emerald-700
                                                text-sm
                                                flex items-center
                                                transition
                                            "
                                >
                                    <FiPlus />
                                    Nuevo pedido
                                </Button>

                            )}
                        </div>

                    </div>


                    <div className="w-full overflow-x-auto">

                    <DataTable
                        data={pedidosFiltrados}
                        columns={
                            esCliente
                                ? pedidosClienteColumns(
                                    (pedido) =>
                                        navigate(`/dashboard/mis-pedidos/${pedido.id}`)
                                )
                                : pedidosSeleccionadosColumns(
                                    (pedido) =>
                                        navigate(`/dashboard/mis-pedidos/${pedido.id}`)
                                )
                        }
                    />
                    </div>

                </div>

            </div>

        </div>
    )
}