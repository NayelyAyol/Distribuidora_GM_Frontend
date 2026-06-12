import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { FiSearch, FiRefreshCw } from "react-icons/fi"
import DataTable from "@/components/ui/DataTable"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { toast } from "react-toastify"
import { obtenerMisVentas, cancelarVenta } from "../services/ventaService"
import { ventasColumns } from "../columns/ventasColumns"
import { inputClass, buttonOutlineClass, buttonPrimaryClass } from "@/utils/styles"

export default function MisVentasPage() {
    const [ventas, setVentas] = useState([])
    const [loading, setLoading] = useState(false)
    const [busqueda, setBusqueda] = useState("")
    const [filtroEstado, setFiltroEstado] = useState("EN_PROCESO")
    const [filtroEstadoPago, setFiltroEstadoPago] = useState("")
    const [filtroOrigen, setFiltroOrigen] = useState("")
    const [page, setPage] = useState(1)
    const [totalPaginas, setTotalPaginas] = useState(1)
    const [ventaACancelar, setVentaACancelar] = useState(null)
    const navigate = useNavigate()

    const cargarVentas = async () => {
        setLoading(true)
        try {
            const params = { page }
            if (busqueda.trim()) params.buscar = busqueda.trim()
            if (filtroEstado) params.estado = filtroEstado
            if (filtroEstadoPago) params.estadoPago = filtroEstadoPago
            if (filtroOrigen) params.origen = filtroOrigen

            const query = new URLSearchParams(params).toString()
            const data = await obtenerMisVentas(query)
            setVentas(data.ventas || [])
            setTotalPaginas(data.totalPaginas || 1)
        } catch (error) {
            toast.error(error.message || "Error al cargar ventas")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        setPage(1)
    }, [busqueda, filtroEstado, filtroEstadoPago, filtroOrigen])

    useEffect(() => {
        const delay = setTimeout(() => cargarVentas(), 400)
        return () => clearTimeout(delay)
    }, [busqueda, filtroEstado, filtroEstadoPago, filtroOrigen, page])

    const handleCancelar = (venta) => setVentaACancelar(venta)

    const handleConfirmarCancelacion = async () => {
        try {
            setLoading(true)
            const data = await cancelarVenta(ventaACancelar._id)
            toast.success(data.msg || "Venta cancelada con éxito")
            setVentaACancelar(null)
            cargarVentas()
        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    const filtrosActivos = busqueda || filtroEstadoPago || filtroOrigen

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

                    {filtrosActivos && (
                        <Button
                            onClick={() => { setBusqueda(""); setFiltroEstadoPago(""); setFiltroOrigen(""); }}
                            className="bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm"
                        >
                            <FiRefreshCw className="mr-2" /> Limpiar
                        </Button>
                    )}
                </div>

                {/* Filtros de origen y estado de pago */}
                <div className="flex flex-wrap gap-2 pt-2 justify-end">
                    <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-3 py-2 shadow-sm w-full sm:w-40">
                        <select
                            value={filtroOrigen}
                            onChange={(e) => setFiltroOrigen(e.target.value)}
                            className="bg-transparent text-sm text-gray-700 focus:outline-none cursor-pointer w-full"
                        >
                            <option value="">Origen</option>
                            <option value="PEDIDO">Pedido</option>
                            <option value="DIRECTA">Directa</option>
                        </select>
                    </div>

                    <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-3 py-2 shadow-sm w-full sm:w-44">
                        <select
                            value={filtroEstadoPago}
                            onChange={(e) => setFiltroEstadoPago(e.target.value)}
                            className="bg-transparent text-sm text-gray-700 focus:outline-none cursor-pointer w-full"
                        >
                            <option value="">Estado pago</option>
                            <option value="PENDIENTE">Pendiente</option>
                            <option value="PAGADO">Pagado</option>
                        </select>
                    </div>

                    {/* Filtros de estado */}
                    <Button onClick={() => setFiltroEstado("EN_PROCESO")} className={filtroEstado === "EN_PROCESO" ? "bg-emerald-100 text-emerald-700" : "bg-gray-200 text-gray-600"}>
                        En Proceso
                    </Button>
                    <Button onClick={() => setFiltroEstado("FINALIZADO")} className={filtroEstado === "FINALIZADO" ? "bg-emerald-100 text-emerald-700" : "bg-gray-200 text-gray-600"}>
                        Finalizadas
                    </Button>
                    <Button onClick={() => setFiltroEstado("CANCELADO")} className={filtroEstado === "CANCELADO" ? "bg-emerald-100 text-emerald-700" : "bg-gray-200 text-gray-600"}>
                        Canceladas
                    </Button>
                </div>

                <div className="w-full overflow-x-auto">
                    <DataTable
                        data={ventas}
                        columns={ventasColumns(
                            (venta) => navigate(`/dashboard/mis-ventas/detalle/${venta._id}`),
                            handleCancelar
                        )}
                    />
                </div>

                {/* Paginación estilo CatalogoPage */}
                <div className="flex justify-center items-center gap-2 mt-4 flex-wrap">
                    {Array.from({ length: totalPaginas }, (_, index) => {
                        const numero = index + 1
                        const activa = numero === page
                        return (
                            <button
                                key={numero}
                                onClick={() => setPage(numero)}
                                className={`min-w-[40px] h-[40px] px-3 rounded-xl border transition font-medium
                                    ${activa
                                        ? "bg-emerald-100 text-emerald-700 border-emerald-300"
                                        : "text-gray-600 hover:bg-gray-100 border-gray-200"
                                    }`}
                            >
                                {numero}
                            </button>
                        )
                    })}
                </div>
            </div>

            {/* Modal cancelación */}
            {ventaACancelar && (
                <div className="fixed top-0 left-0 right-0 bottom-0 bg-white/30 backdrop-blur-sm flex items-center justify-center z-50">
                    <Card className="w-full max-w-md p-6 bg-emerald-50 backdrop-blur-xl border border-gray-200 shadow-xl rounded-2xl">
                        <h2 className="text-lg font-bold text-gray-800 mb-2">Confirmar cancelación</h2>
                        <p className="text-[15px] text-gray-500 mb-6">
                            ¿Estás seguro de que deseas cancelar la venta del cliente {ventaACancelar?.datosFacturacion?.nombreCompleto || "Usuario"}?
                        </p>
                        <div className="flex justify-end gap-3">
                            <Button
                                variant="ghost"
                                className={`max-w-[100px] py-[22px] ${buttonOutlineClass}`}
                                onClick={() => setVentaACancelar(null)}
                            >
                                Cancelar
                            </Button>
                            <Button
                                onClick={handleConfirmarCancelacion}
                                disabled={loading}
                                className={`max-w-[100px] ${buttonPrimaryClass}`}
                            >
                                Aceptar
                            </Button>
                        </div>
                    </Card>
                </div>
            )}
        </div>
    )
}