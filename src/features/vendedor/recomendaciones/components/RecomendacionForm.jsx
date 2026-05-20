import { useState } from "react"
import { Button } from "@/components/ui/button"
import { buttonPrimaryClass } from "@/utils/styles"
import { toast } from "react-toastify"

export default function RecomendacionForm() {

    const [text, setText] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!text.trim()) {
            toast.error("Escribe un mensaje antes de enviar")
            return
        }

        if (text.trim().length < 10) {
            toast.error("El mensaje debe tener al menos 10 caracteres")
            return
        }

        if (text.trim().length > 300) {
            toast.error("El mensaje no puede superar 300 caracteres")
            return
        }

        const data = {
            text: text.trim(),
            fecha: new Date().toISOString()
        }

        console.log(data)

        toast.success("Mensaje enviado correctamente")

        setText("")
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">

            <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Escribe tu recomendación..."
                className="w-full p-4 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                rows={4}
            />

            <Button className={`${buttonPrimaryClass} w-full`}>
                Enviar
            </Button>

        </form>
    )
}