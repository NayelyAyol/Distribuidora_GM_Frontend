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
    const [filter, setFilter] = useState("Pendiente")
    const [tipoFilter, setTipoFilter] = useState("") 

    const cargarQuejas = async () => {
        try {
            const estado = filter === "Pendiente" ? "PENDIENTE" : "FINALIZADA"
            const response = await obtenerQuejasSugerenciasAdmin(estado, tipoFilter)
            setData(response.quejasSugerencias || [])
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        cargarQuejas()
    }, [filter, tipoFilter])

    const handleResponder = async () => {
        if (!respuesta.trim()) {
            toast.error("Escribe una respuesta")
            return
        }
        try {
            await responderQuejaSugerencia(selected._id, respuesta)
            toast.success("Respuesta enviada correctamente")
            setSelected(null)
            setRespuesta("")
            cargarQuejas()
        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <div className="grid gap-4">

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">

                {/* Filtro estado */}
                <div className="flex gap-2">
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

                <div className="flex gap-2">
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

            {selected && (
                <div className="fixed top-0 left-0 right-0 bottom-0 bg-white/30 backdrop-blur-sm flex items-center justify-center z-50">
                    <Card className="w-full max-w-md p-6 bg-emerald-50 backdrop-blur-xl border border-gray-200 shadow-xl rounded-2xl">
                        <h2 className="text-lg font-bold text-gray-800 mb-2">Responder</h2>
                        <p className="text-[15px] text-gray-500 mb-3">{selected.mensaje}</p>
                        <textarea
                            value={respuesta}
                            onChange={(e) => setRespuesta(e.target.value)}
                            placeholder="Escribe tu respuesta..."
                            className={`${inputClass} h-[120px] resize-none`}
                            minLength={5}
                            maxLength={500}
                        />
                        <div className="flex justify-end gap-3 mt-4">
                            <Button
                                variant="ghost"
                                className={`max-w-[100px] py-[22px] ${buttonOutlineClass}`}
                                onClick={() => { setSelected(null); setRespuesta("") }}
                            >
                                Cancelar
                            </Button>
                            <Button
                                onClick={handleResponder}
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