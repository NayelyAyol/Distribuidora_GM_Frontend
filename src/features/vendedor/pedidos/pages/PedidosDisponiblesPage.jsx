import { useState } from "react"
import DataTable from "@/components/ui/DataTable"
import { pedidosDisponiblesColumns } from "../columns/pedidosDisponiblesColumns"
import { toast } from "react-toastify"

export default function PedidosDisponiblesPage() {

    const [pedidos, setPedidos] = useState([
        {
            id: 1,
            cliente: "Juan Pérez",
            fecha: "2026-05-10"
        },
        {
            id: 2,
            cliente: "María García",
            fecha: "2026-05-11"
        }
    ])

    const handleSelectPedido = (pedido) => {
        toast.success("Pedido tomado")

        setPedidos(prev => prev.filter(p => p.id !== pedido.id))
    }

    return (
        <div className="p-6 space-y-6">

            <div>
                <p className="text-gray-500">
                    Este módulo te permite seleccionar un pedido por atender
                </p>
            </div>

            <div className="bg-white/60 backdrop-blur-xl rounded-2xl border border-white/20 overflow-hidden">

                <div className="flex border-b bg-white">

                    <DataTable
                        data={pedidos}
                        columns={pedidosDisponiblesColumns(handleSelectPedido)}
                    />

                </div>

            </div>
        </div>
    )
}