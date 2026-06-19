import { useState, useEffect } from "react"
import DataTable from "@/components/ui/DataTable"
import { pedidosDisponiblesColumns } from "../columns/pedidosDisponiblesColumns"
import { toast } from "react-toastify"
import { obtenerPedidosSeleccionados, tomarPedido } from "../services/pedidosSeleccionadosService"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { buttonOutlineClass, buttonPrimaryClass } from "@/utils/styles"
import { createPortal } from "react-dom"

export default function PedidosDisponiblesPage() {
    const [pedidos, setPedidos] = useState([])
    const [cargando, setCargando] = useState(false)
    const [pedidoToConfirm, setPedidoToConfirm] = useState(null)
    const [page, setPage] = useState(1)
    const [totalPaginas, setTotalPaginas] = useState(1)

    const cargarPedidos = async () => {
        setCargando(true)
        try {
            const params = { page }
            const query = new URLSearchParams(params).toString()
            const data = await obtenerPedidosSeleccionados()
            setPedidos(data.pedidos || [])
            setTotalPaginas(data.totalPaginas || 1)
        } catch (error) {
            toast.error(error.message || "Error al cargar pedidos disponibles")
        } finally {
            setCargando(false)
        }
    }

    useEffect(() => {
        cargarPedidos()
    }, [page])

    const handleConfirmarToma = async () => {
        if (!pedidoToConfirm) return

        try {
            await tomarPedido(pedidoToConfirm._id)
            toast.success("Pedido tomado correctamente")
            setPedidos(prev => prev.filter(p => p._id !== pedidoToConfirm._id))
        } catch (error) {
            toast.error(error.message || "Error al tomar pedido")
        } finally {
            setPedidoToConfirm(null)
        }
    }

    return (
        <div className="p-6 space-y-6">
            <div>
                <p className="text-gray-500">Este módulo te permite seleccionar un pedido por atender</p>
            </div>

            <div className="bg-white/60 backdrop-blur-xl rounded-2xl border border-white/20 overflow-hidden">
                {cargando ? (
                    <div className="p-6 text-center">Cargando pedidos...</div>
                ) : (
                    <div className="flex flex-col border-b bg-white">
                        <DataTable
                            data={pedidos}
                            columns={pedidosDisponiblesColumns((pedido) => setPedidoToConfirm(pedido))}
                        />
                        <div className="flex justify-center items-center gap-2 p-4 flex-wrap">
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
                )}
            </div>

            {pedidoToConfirm && createPortal(
                <div className="fixed top-0 left-0 right-0 bottom-0 bg-white/30 backdrop-blur-sm flex items-center justify-center z-50">
                    <Card className="w-full max-w-md p-6 bg-emerald-50 backdrop-blur-xl border border-gray-200 shadow-xl rounded-2xl">
                        <h2 className="text-lg font-bold text-gray-800 mb-2">
                            Confirmar
                        </h2>

                        <p className="text-[15px] text-gray-500 mb-4">
                            ¿Estás seguro de que deseas tomar el pedido del cliente
                            <span className="font-semibold text-emerald-800">
                                {" "}{pedidoToConfirm.datosFacturacion?.nombreCompleto || "Sin nombre"}
                            </span>?
                        </p>

                        <div className="flex justify-end gap-3">
                            <Button
                                variant="ghost"
                                className={`max-w-[100px] py-[22px] ${buttonOutlineClass}`}
                                onClick={() => setPedidoToConfirm(null)}
                            >
                                Cancelar
                            </Button>
                            <Button
                                onClick={handleConfirmarToma}
                                className={`max-w-[100px] ${buttonPrimaryClass}`}
                            >
                                Aceptar
                            </Button>
                        </div>
                    </Card>
                </div>,
                document.body
            )}
        </div>
    )
}