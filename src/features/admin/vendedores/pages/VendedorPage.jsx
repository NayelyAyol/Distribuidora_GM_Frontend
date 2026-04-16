import VendedorForm from "../components/VendedorForm"
import VendedoresTable from "../components/VendedorTable"
import { listarVendedores } from "../services/vendedorService"
import { useState, useEffect } from "react"
import { toast } from "react-toastify"

export default function VendedoresPage() {
    const [vendedores, setVendedores] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchVendedores = async () => {
        try {
            const data = await listarVendedores()
            setVendedores(data.vendedores || data)
        } catch (error) {
            toast.error("Error al obtener vendedores")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchVendedores()
    }, [])

    if (loading) {
        return <p className="p-6">Cargando vendedores...</p>
    }

    return (
        <div className="space-y-6">

            <div className="bg-white/60 backdrop-blur-xl p-6 rounded-2xl border border-white/20">
                <h2 className="text-xl font-bold mb-4">
                    Crear Vendedor
                </h2>
                <VendedorForm />
            </div>

            <div className="bg-white/60 backdrop-blur-xl p-6 rounded-2xl border border-white/20">
                <h2 className="text-xl font-bold mb-4">
                    Lista de Vendedores
                </h2>

                <VendedoresTable 
                    data={vendedores} 
                    onRefresh={fetchVendedores}
                />
            </div>

        </div>
    )
}