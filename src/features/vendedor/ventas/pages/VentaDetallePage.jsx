import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FiArrowLeft, FiCheckCircle, FiXCircle } from "react-icons/fi"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { obtenerDetalleVenta, confirmarTransferencia, cancelarVenta } from "../services/ventaService"
import { toast } from "react-toastify"
import { buttonOutlineClass, buttonPrimaryClass } from "@/utils/styles"

export default function VentaDetallePage() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [venta, setVenta] = useState(null)
    const [loading, setLoading] = useState(true)
    const [showCancelModal, setShowCancelModal] = useState(false)

    const cargarDetalle = async () => {
        try {
            setLoading(true)
            const data = await obtenerDetalleVenta(id)
            setVenta(data.venta)
        } catch (error) {
            toast.error(error.message || "Error al cargar detalle")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => { cargarDetalle() }, [id])

    const handleConfirmar = async () => {
        try {
            await confirmarTransferencia(id)
            toast.success("Transferencia confirmada")
            cargarDetalle()
        } catch (error) {
            toast.error(error.message)
        }
    }

    const handleCancelarVenta = async () => {
        try {
            setLoading(true);
            const data = await cancelarVenta(id);
            toast.success(data.msg || "Venta cancelada con éxito");
            setVenta(prev => ({ ...prev, estado: 'CANCELADO' }));
            setShowCancelModal(false);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div>Cargando...</div>
    if (!venta) return <div>Venta no encontrada.</div>

    const cardStyles = "p-6 rounded-3xl border border-white/20 shadow-sm bg-white/60 backdrop-blur-xl";

    return (
        <div className="p-6 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Detalle Venta: #{venta._id.slice(-6)}</h1>
                    <p className="text-gray-500">Gestión y resumen de la venta</p>
                </div>
                <Button onClick={() => navigate(-1)} className="bg-gray-200 text-gray-700 hover:bg-emerald-100">
                    <FiArrowLeft className="mr-2" /> Volver
                </Button>
            </div>

            <Card className={cardStyles}>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div>
                        <p className="text-sm text-gray-500">Cliente</p>
                        <p className="font-medium">{venta.datosFacturacion?.nombreCompleto}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Método de Pago</p>
                        <p className="font-medium">{venta.metodoPago}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Estado</p>
                        <p className="font-bold text-emerald-700">{venta.estado}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Total a Pagar</p>
                        <p className="font-bold text-lg">${venta.resumenPago?.totalPagar?.toFixed(2)}</p>
                    </div>
                </div>
            </Card>

            <Card className={cardStyles}>
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Artículos</h2>
                <div className="space-y-4">
                    {venta.articulos?.map((art) => (
                        <div key={art._id} className="flex items-center justify-between border border-gray-100 rounded-2xl p-4 bg-white">
                            <div>
                                <p className="font-medium text-gray-800">{art.nombreProducto}</p>
                                <p className="text-sm text-gray-500">Código: {art.codigo} </p>
                            </div>
                            <div className="text-right">
                                <p className="text-sm text-gray-500">x{art.cantidad}</p>
                                <p className="font-semibold text-emerald-700">${art.subtotal.toFixed(2)}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </Card>
                {(venta.estado !== 'FINALIZADO' && venta.estado !== 'CANCELADO') && (

            <Card className="
                        p-6
                        rounded-3xl
                        border border-white/20
                        shadow-sm
                        bg-white/60
                        backdrop-blur-xl
                    ">
                    <div className="flex flex-wrap gap-4 justify-end">
                        {venta.metodoPago === 'TRANSFERENCIA' && venta.estadoPago === 'PENDIENTE' && (
                            <Button onClick={handleConfirmar} className="bg-emerald-600 hover:bg-emerald-700">
                                <FiCheckCircle className="mr-2" /> Confirmar
                            </Button>
                        )}
                        <Button onClick={() => setShowCancelModal(true)} variant="outline" 
                        className="border-gray-200 text-gray-600 hover:border-red-500 hover:text-red-600 hover:bg-red-50 transition-all duration-200">
                            <FiXCircle className="mr-2" /> Cancelar Venta
                        </Button>
                    </div>
                
            </Card>
            )}
            {showCancelModal && (
                <div className="fixed top-0 left-0 right-0 bottom-0 bg-white/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <Card className="w-full max-w-md p-6 bg-white backdrop-blur-xl border border-gray-200 shadow-xl rounded-2xl">
                        <h2 className="text-lg font-bold text-gray-800 mb-2">Confirmar cancelación</h2>
                        <p className="text-[15px] text-gray-500 mb-6">
                            ¿Estás seguro de que deseas cancelar la venta #{id.slice(-6)}? 
                        </p>
                        
                        <div className="flex justify-end gap-3">
                            <Button
                                variant="ghost"
                                className={`py-[22px] ${buttonOutlineClass}`}
                                onClick={() => setShowCancelModal(false)}
                            >
                                Cancelar
                            </Button>
                            
                            <Button
                                onClick={handleCancelarVenta}
                                className={`bg-red-600 hover:bg-red-700 text-white ${buttonPrimaryClass}`}
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