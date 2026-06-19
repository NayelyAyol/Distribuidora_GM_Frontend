import { useState } from "react"
import { Button } from "@/components/ui/button"
import { buttonPrimaryClass } from "@/utils/styles"
import { toast } from "react-toastify"
import { Input } from "@/components/ui/input"
import { FiMessageCircle } from "react-icons/fi"
import useAuthStore from "@/context/useAuthStore"

export default function RecomendacionForm({
    placeholderAsunto = "Asunto",
    placeholderMensaje = "Escribe tu mensaje...",
    mensajeExito = "Mensaje enviado correctamente",
    onSubmit
}) {
    const [tipo, setTipo] = useState("QUEJA")
    const [asunto, setAsunto] = useState("")
    const [mensaje, setMensaje] = useState("")
    
    const user = useAuthStore((state) => state.user)
    const rol = user?.rol?.toUpperCase()
    const esVendedor = rol === "VENDEDOR"

    console.log(user)
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!asunto.trim()) { toast.error("Ingresa un asunto"); return }
        if (!mensaje.trim()) { toast.error("Escribe un mensaje"); return }
        if (asunto.trim().length < 3) { toast.error("El asunto debe tener mínimo 3 caracteres"); return }
        if (asunto.trim().length > 60) { toast.error("El asunto no puede exceder los 60 caracteres"); return }
        if (mensaje.trim().length < 5) { toast.error("El mensaje debe tener mínimo 5 caracteres"); return }
        if (mensaje.trim().length > 500) { toast.error("'El mensaje no puede exceder los 500 caracteres"); return }

        try {
            await onSubmit({ tipo, asunto, mensaje })
            toast.success(mensajeExito)
            setAsunto("")
            setMensaje("")
        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">

            <div className="flex gap-2">

                {!esVendedor && (
                    <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-3 py-2 shadow-sm shrink-0">
                        <FiMessageCircle className="text-gray-400 text-lg flex-shrink-0" />
                        <select
                            value={tipo}
                            onChange={(e) => setTipo(e.target.value)}
                            className="bg-transparent text-sm text-gray-700 focus:outline-none cursor-pointer pr-1"
                        >
                            <option value="QUEJA">Queja</option>
                            <option value="SUGERENCIA">Sugerencia</option>
                        </select>
                    </div>
                )}

                <Input
                    value={asunto}
                    className="bg-white rounded-xl placeholder:text-sm h-11 px-4 flex-1 border-gray-200 shadow-sm"
                    onChange={(e) => setAsunto(e.target.value)}
                    placeholder={placeholderAsunto}
                    minLength={3}
                    maxLength={60}
                />

            </div>

            <textarea
                value={mensaje}
                onChange={(e) => setMensaje(e.target.value)}
                placeholder={placeholderMensaje}
                className="w-full p-4 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm shadow-sm"
                rows={4}
                minLength={5}
                maxLength={500}
            />

            <Button type="submit" className={`${buttonPrimaryClass} w-full`}>
                Enviar
            </Button>
        </form>
    )
}