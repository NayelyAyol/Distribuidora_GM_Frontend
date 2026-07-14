import { useState, useEffect, useCallback } from "react"
import { Card } from "@/components/ui/card"
import { toast } from "react-toastify"
import NotificationItem from "../components/NotificationItem"
import {
    listarAccionesAdmin,
    finalizarAccionAdmin,
    ejecutarPromocionSugerida,
    ejecutarFechaFestiva
} from "../service/accionesService"

const labels = {
    PROMOCION_SUGERIDA: "Promociones sugeridas",
    NUEVA_MERCADERIA: "Nueva mercadería",
    BAJO_NUMERO_VENTAS: "Bajo número de ventas",
    PAGO_SRI: "Pago al SRI",
    FECHA_FESTIVA: "Promoción por fechas festivas"
}

export default function NotificationPage() {

    const [acciones, setAcciones] = useState([])
    const [loading, setLoading] = useState(true)

    const cargarAcciones = useCallback(async () => {
        try {
            const response = await listarAccionesAdmin()
            setAcciones(response.acciones || [])
        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        cargarAcciones()
    }, [cargarAcciones])

    // Solo se permite "apagar" el switch -> marcar la acción como atendida
    const handleFinalizar = async (tipo) => {
        try {
            await finalizarAccionAdmin(tipo)

            setAcciones(prev =>
                prev.map(item =>
                    item.tipo === tipo
                        ? { ...item, estado: "FINALIZADA" }
                        : item
                )
            )

            toast.success("Acción ejecutada con éxito")
        } catch (error) {
            toast.error(error.message)
        }
    }

    const handleEjecutar = async (tipo) => {
        try {
            await ejecutarPromocionSugerida()

            setAcciones(prev =>
                prev.map(item =>
                    item.tipo === tipo
                        ? { ...item, estado: "FINALIZADA" }
                        : item
                )
            )

            toast.success("Promoción ejecutada correctamente")
        } catch (error) {
            toast.error(error.message)
        }
    }

    const handleEjecutarFechaFestiva = async (tipo) => {
        try {
            await ejecutarFechaFestiva()
            setAcciones(prev =>
                prev.map(item =>
                    item.tipo === tipo
                        ? { ...item, estado: "FINALIZADA" }
                        : item
                )
            )
            toast.success("Campaña de fecha festiva ejecutada correctamente")
        } catch (error) {
            toast.error(error.message)
        }
    }

    if (loading) {
        return (
            <div className="space-y-4">
                <Card className="p-6 rounded-2xl">
                    <p className="text-gray-500 text-center py-6">
                        Cargando notificaciones...
                    </p>
                </Card>
            </div>
        )
    }

    return (
        <div className="space-y-4">
            <Card className="p-6 rounded-2xl">
                <div className="divide-y">
                    {acciones.map((accion) => {
                        const esFechaFestiva = accion.tipo === "FECHA_FESTIVA"

                        // El label refleja el evento concreto que devuelve el backend
                        const label = labels[accion.tipo] || accion.tipo

                        // Si el backend dice que no hay evento disponible, no se puede ejecutar
                        const puedeEjecutar = esFechaFestiva
                            ? !!accion.hayEventoDisponible
                            : true

                        // Para fecha festiva: si no hay evento disponible, el switch
                        const estadoMostrado = esFechaFestiva && !puedeEjecutar
                            ? "SIN_EVENTO"
                            : accion.estado

                        return (
                            <NotificationItem
                                key={accion.tipo}
                                id={`switch-${accion.tipo}`}
                                label={label}
                                tipo={accion.tipo}
                                estado={estadoMostrado}
                                showButton={
                                    (accion.tipo === "PROMOCION_SUGERIDA" ||
                                        esFechaFestiva) && puedeEjecutar
                                }
                                onFinalizar={handleFinalizar}
                                onEjecutar={
                                    esFechaFestiva
                                        ? handleEjecutarFechaFestiva
                                        : handleEjecutar
                                }
                            />
                        )
                    })}
                </div>
            </Card>
        </div>
    )
}