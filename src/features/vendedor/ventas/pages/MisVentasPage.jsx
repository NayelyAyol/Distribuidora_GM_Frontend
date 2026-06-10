import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { FiSearch, FiRefreshCw } from "react-icons/fi"
import DataTable from "@/components/ui/DataTable"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { toast } from "react-toastify"
import { obtenerMisVentas } from "../services/ventaService" 
import { ventasColumns } from "../columns/ventasColumns"
import { inputClass } from "@/utils/styles"

export default function MisVentasPage() {
    const [ventas, setVentas] = useState([])
    const [loading, setLoading] = useState(false)
    const [busqueda, setBusqueda] = useState("")
    const navigate = useNavigate()

    const cargarVentas = async () => {
        setLoading(true)
        try {
            const params = busqueda ? { buscar: busqueda.trim() } : {};
            const query = new URLSearchParams(params).toString();
            
            const data = await obtenerMisVentas(query)
            setVentas(data.ventas || [])
        } catch (error) {
            toast.error(error.message || "Error al cargar ventas")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            cargarVentas()
        }, 500)

        return () => clearTimeout(delayDebounceFn)
    }, [busqueda])

    return (
        <div className="p-6 space-y-6">
            <div>
                <p className="text-gray-500">Este módulo te permite visualizar y gestionar tus ventas</p>
            </div>

            <div className="bg-white/60 backdrop-blur-xl rounded-2xl border border-white/20 p-6 space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                    <div className="flex items-center bg-white rounded-full w-full md:w-[350px] border border-gray-100 shadow-sm">
                        <Input 
                            placeholder="Buscar por nombre del cliente..." 
                            value={busqueda}
                            onChange={(e) => setBusqueda(e.target.value)}
                            className={`${inputClass} bg-transparent border-0 focus:ring-0 flex-1 placeholder:text-sm`}
                        />
                        <button className="rounded-full flex items-center justify-center h-12 w-12 px-2 bg-emerald-700/10 hover:bg-emerald-100 text-emerald-800 transition">
                            <FiSearch className="text-emerald-900 text-xl" />
                        </button>
                    </div>

                    {busqueda && (
                        <Button 
                            onClick={() => setBusqueda("")} 
                            variant="ghost"
                            className="text-gray-600 hover:text-red-600"
                        >
                            <FiRefreshCw className="mr-2" /> Limpiar
                        </Button>
                    )}
                </div>

                <div className="w-full overflow-x-auto">
                    <DataTable
                        data={ventas}
                        columns={ventasColumns((venta) => navigate(`/dashboard/mis-ventas/detalle/${venta._id}`))}
                    />
                </div>
            </div>
        </div>
    )
}