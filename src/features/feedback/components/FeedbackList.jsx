import { useState, useEffect } from "react"
import FeedbackCard from "./FeedbackCard"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
    buttonPrimaryClass,
    buttonOutlineClass,
    inputClass
} from "@/utils/styles"
import { toast } from "react-toastify"

import {
    obtenerQuejasSugerenciasAdmin,
    responderQuejaSugerencia
} from "@/features/cliente/quejasysugerencias/services/quejasSugerenciasService"

export default function FeedbackList() {

    const [data, setData] = useState([])
    const [selected, setSelected] = useState(null)
    const [respuesta, setRespuesta] = useState("")
    const [errors, setErrors] = useState({ respuesta: "" })   
    const [filter, setFilter] = useState("Pendiente")
    const [tipoFilter, setTipoFilter] = useState("QUEJA")
    const [cargando, setCargando] = useState(false)
    const [page, setPage] = useState(1)
    const [totalPaginas, setTotalPaginas] = useState(1)

    const cargarQuejas = async () => {
        setCargando(true)
        try {
            const estado = filter === "Pendiente" ? "PENDIENTE" : "FINALIZADA"
            const response = await obtenerQuejasSugerenciasAdmin(estado, tipoFilter, page)
            setData(response.quejasSugerencias || [])
            setTotalPaginas(response.totalPaginas || 1)
        } catch (error) {
            toast.error(error.message)
        } finally {
            setCargando(false)
        }
    }

    useEffect(() => {
        cargarQuejas()
    }, [filter, tipoFilter, page])

    useEffect(() => {
        setPage(1)
    }, [filter, tipoFilter])

    const validarRespuesta = () => {
        const texto = respuesta.trim()
        if (!texto) return "La respuesta es obligatoria"
        if (texto.length < 5) return "La respuesta debe tener mínimo 5 caracteres"
        if (texto.length > 500) return "La respuesta no puede exceder los 500 caracteres"
        return ""
    }

    const handleResponder = async () => {
        const error = validarRespuesta()
        if (error) {
            setErrors({ respuesta: error })
            return
        }
        try {
            await responderQuejaSugerencia(selected._id, respuesta.trim())
            toast.success("Respuesta enviada correctamente")
            setSelected(null)
            setRespuesta("")
            setErrors({ respuesta: "" })      
            cargarQuejas()
        } catch (error) {
            toast.error(error.message)
        }
    }

    const cerrarModal = () => {               
        setSelected(null)
        setRespuesta("")
        setErrors({ respuesta: "" })
    }

    return (
        <div className="grid gap-4">

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

                <div className="flex flex-wrap gap-2">
                    <Button
                        onClick={() => setFilter("Pendiente")}
                        className={filter === "Pendiente" ? "bg-emerald-100 text-emerald-700" : "bg-gray-200 text-gray-600"}
                    >
                        Pendientes
                    </Button>
                    <Button
                        onClick={() => setFilter("Finalizada")}
                        className={filter === "Finalizada" ? "bg-emerald-100 text-emerald-700" : "bg-gray-200 text-gray-600"}
                    >
                        Finalizadas
                    </Button>
                </div>

                <div className="flex flex-wrap gap-2 sm:justify-end">
                    {[["QUEJA", "Quejas"], ["SUGERENCIA", "Sugerencias"]].map(([val, label]) => (
                        <Button
                            key={val}
                            onClick={() => setTipoFilter(val)}
                            className={tipoFilter === val ? "bg-emerald-100 text-emerald-700" : "bg-gray-200 text-gray-600"}
                        >
                            {label}
                        </Button>
                    ))}
                </div>

            </div>

            {cargando ? (
                <div className="text-center py-10 text-gray-500">
                    Cargando...
                </div>
            ) : (
                <>
                    {data.map(item => (
                        <FeedbackCard
                            key={item._id}
                            item={item}
                            onOpen={() => setSelected(item)}
                        />
                    ))}

                    {data.length === 0 && (
                        <div className="text-center py-10 text-gray-500 border border-dashed rounded-2xl">
                            {filter === "Pendiente"
                                ? "No hay quejas o sugerencias pendientes por responder."
                                : "No hay quejas o sugerencias finalizadas."}
                        </div>
                    )}

                    {data.length > 0 && (
                        <div className="flex justify-center items-center gap-2 pt-2 flex-wrap">
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
                    )}
                </>
            )}

            {selected && (
                <div className="fixed inset-0 bg-white/30 backdrop-blur-sm flex items-end sm:items-center justify-center z-50 px-4 pb-4 sm:p-4">
                    <Card className="w-full sm:max-w-md p-5 sm:p-6 bg-emerald-50 backdrop-blur-xl border border-gray-200 shadow-xl rounded-2xl max-h-[90vh] overflow-y-auto custom-scroll">
                        <h2 className="text-lg font-bold text-gray-800 mb-2">Responder</h2>
                        <p className="text-[15px] text-gray-500 mb-3 break-words">{selected.mensaje}</p>
                        <div className="space-y-1">
                            <textarea
                                value={respuesta}
                                onChange={(e) => {
                                    setRespuesta(e.target.value)
                                    if (errors.respuesta) setErrors({ respuesta: "" })
                                }}
                                placeholder="Escribe tu respuesta..."
                                className={`${inputClass} h-[120px] resize-none w-full`}
                                maxLength={500}
                            />
                            {errors.respuesta && (
                                <p className="text-red-500 text-sm font-medium">{errors.respuesta}</p>
                            )}
                        </div>
                        <div className="flex justify-end gap-3 mt-4">
                            <Button
                                variant="ghost"
                                className={`flex-1 sm:flex-none sm:max-w-[100px] py-[22px] ${buttonOutlineClass}`}
                                onClick={cerrarModal}
                            >
                                Cancelar
                            </Button>
                            <Button
                                onClick={handleResponder}
                                className={`flex-1 sm:flex-none sm:max-w-[100px] ${buttonPrimaryClass}`}
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