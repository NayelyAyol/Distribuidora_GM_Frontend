import { useState } from "react"
import { Button } from "@/components/ui/button"
import { buttonPrimaryClass } from "@/utils/styles"
import { toast } from "react-toastify"
import { crearQuejaSugerencia } from "@/features/cliente/quejasysugerencias/services/quejasSugerenciasService"
import { Input } from "@/components/ui/input"

export default function RecomendacionForm({
    placeholderAsunto = "Asunto",
    placeholderMensaje = "Escribe tu mensaje...",
    mensajeExito = "Mensaje enviado correctamente"
}) {

    const [asunto, setAsunto] = useState("")
    const [mensaje, setMensaje] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!asunto.trim()) {
            toast.error("Ingresa un asunto")
            return
        }

        if (!mensaje.trim()) {
            toast.error("Escribe un mensaje")
            return
        }

        if (asunto.trim().length < 5) {
            toast.error(
                "El asunto debe tener al menos 5 caracteres"
            )
            return
        }

        try {

            await crearQuejaSugerencia({
                asunto,
                mensaje
            })

            toast.success(mensajeExito)

            setAsunto("")
            setMensaje("")

        } catch (error) {

            toast.error(error.message)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">

            <Input
                value={asunto}
                className="bg-white rounded-lg placeholder:text-base h-11 px-4"
                onChange={(e) => setAsunto(e.target.value)}
                placeholder={placeholderAsunto}
                maxLength={100}
            />

            <textarea
                value={mensaje}
                onChange={(e) => setMensaje(e.target.value)}
                placeholder={placeholderMensaje}
                className="w-full p-4 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                rows={4}
                maxLength={300}
            />

            <Button
                type="submit"
                className={`${buttonPrimaryClass} w-full`}
            >
                Enviar
            </Button>

        </form>
    )
}