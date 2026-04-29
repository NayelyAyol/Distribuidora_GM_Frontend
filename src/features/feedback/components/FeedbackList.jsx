import { useState } from "react"
import FeedbackCard from "./FeedbackCard"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { buttonPrimaryClass, buttonOutlineClass, inputClass } from "@/utils/styles"


export default function FeedbackList() {

    const [data, setData] = useState([
        { id: 1, text: "Agregar modo oscuro", user: "Cliente 1", estado: "Pendiente", respuesta: null },
        { id: 2, text: "Mejorar rendimiento", user: "Cliente 2", estado: "Pendiente", respuesta: null },
        { id: 3, text: "Cambio de colores", user: "Cliente 3", estado: "Respondido", respuesta: "Se evaluará el cambio" }
    ])

    const [selected, setSelected] = useState(null)
    const [respuesta, setRespuesta] = useState("")

    const handleResponder = () => {

        if (!respuesta.trim()) return

        setData(prev =>
            prev.map(item =>
                item.id === selected.id
                    ? {
                        ...item,
                        estado: "respondido",
                        respuesta: respuesta
                    }
                    : item
            )
        )

        setSelected(null)
        setRespuesta("")
    }

    return (
        <div className="grid gap-4">

            {data.map(item => (
                <FeedbackCard
                    key={item.id}
                    item={item}
                    onOpen={() => setSelected(item)}
                />
            ))}

            {selected && (
                <div className="fixed top-0 left-0 right-0 bottom-0 bg-white/30 backdrop-blur-sm flex items-center justify-center z-50">

                    <Card className="w-full max-w-md p-6 bg-emerald-50 backdrop-blur-xl border border-gray-200 shadow-xl rounded-2xl">

                        <h2 className="text-lg font-bold text-gray-800 mb-2">
                            Responder
                        </h2>

                        <p className="text-[15px] text-gray-500 mb-3">
                            {selected.text}
                        </p>

                        <textarea
                            value={respuesta}
                            onChange={(e) => setRespuesta(e.target.value)}
                            placeholder="Escribe tu respuesta..."
                            className={`${inputClass} h-28 resize-none`}
                        />

                        <div className="flex justify-end gap-3 mt-4">

                            <Button
                                variant="ghost"
                                className={`max-w-[100px] py-[22px] ${buttonOutlineClass}`}
                                onClick={() => setSelected(null)}
                            >
                                Cancelar
                            </Button>

                            <Button
                                onClick={handleResponder}
                                className={`max-w-[100px] ${buttonPrimaryClass}`}                >
                                Guardar
                            </Button>

                        </div>

                    </Card>

                </div>
            )}

        </div>
    )
}