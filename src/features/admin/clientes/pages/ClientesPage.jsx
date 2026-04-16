import { useState, useEffect } from "react"
import { toast } from "react-toastify"
import ClientesTable from "../components/ClientesTable"
import { listarClientes } from "../services/clienteService"

export default function ClientesPage() {

    const [clientes, setClientes] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchClientes = async () => {
        try {
            const data = await listarClientes()
            setClientes(data.clientes || data)
        } catch (error) {
            toast.error("Error al obtener clientes")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchClientes()
    }, [])

    if (loading) {
        return <p className="p-6">Cargando clientes...</p>
    }

    return (
        <div className="flex flex-col gap-6">

            <div>
                <p className="text-sm text-gray-500">
                    Administra los clientes del sistema
                </p>
            </div>

            <ClientesTable 
                data={clientes} 
                onRefresh={fetchClientes}
            />

        </div>
    )
}