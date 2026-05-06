import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import UsuarioTable from "@/features/usuarios/components/UsuarioTable"
import { listarClientesPorVendedor } from "../../../usuarios/services/vendedorService"
import useAuthStore from "@/context/useAuthStore"

export default function ClientesVendedorPage() {

    const [clientes, setClientes] = useState([])
    const user = useAuthStore(state => state.user)

    const fetchClientes = async () => {
        try {
            const data = await listarClientesPorVendedor(user._id)
            setClientes(data.clientes || data)
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        fetchClientes()
    }, [])

    return (
        <div className="p-6 space-y-6">

            <div>
                <p className="text-gray-500">
                    Este módulo te permite gestionar los clientes creados por ti.
                </p>
            </div>

            <div className="bg-white/60 backdrop-blur-xl rounded-2xl border border-white/20 overflow-hidden">

            <UsuarioTable
                data={clientes}
                onRefresh={fetchClientes}
                onToggleEstado={() => {}}
            />
            </div>
        </div>
    )
}