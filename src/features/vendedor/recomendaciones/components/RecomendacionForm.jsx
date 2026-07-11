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
    const [errors, setErrors] = useState({ asunto: "", mensaje: "" })

    const user = useAuthStore((state) => state.user)
    const rol = user?.rol?.toUpperCase()
    const esVendedor = rol === "VENDEDOR"

    const handleSubmit = async (e) => {
        e.preventDefault()

        const newErrors = {}

        if (!asunto.trim())
            newErrors.asunto = "Ingresa un asunto"
        else if (asunto.trim().length < 3)
            newErrors.asunto = "El asunto debe tener mínimo 3 caracteres"
        else if (asunto.trim().length > 60)
            newErrors.asunto = "El asunto no puede exceder los 60 caracteres"

        if (!mensaje.trim())
            newErrors.mensaje = "Escribe un mensaje"
        else if (mensaje.trim().length < 5)
            newErrors.mensaje = "El mensaje debe tener mínimo 5 caracteres"
        else if (mensaje.trim().length > 500)
            newErrors.mensaje = "El mensaje no puede exceder los 500 caracteres"

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
            return
        }

        try {
            await onSubmit({ tipo, asunto, mensaje })
            toast.success(mensajeExito)
            setAsunto("")
            setMensaje("")
            setErrors({ asunto: "", mensaje: "" })
        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">

            <div className="space-y-1">
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
                        onChange={(e) => {
                            const valor = e.target.value.slice(0, 60)
                            setAsunto(valor)
                            if (errors.asunto) setErrors(prev => ({ ...prev, asunto: "" }))
                        }}
                        placeholder={placeholderAsunto}
                        maxLength={60}
                    />
                </div>
                {errors.asunto && (
                    <p className="text-red-500 text-sm font-medium">{errors.asunto}</p>
                )}
            </div>

            <div className="space-y-1">
                <textarea
                    value={mensaje}
                    onChange={(e) => {
                        const valor = e.target.value.slice(0, 500)
                        setMensaje(valor)
                        if (errors.mensaje) setErrors(prev => ({ ...prev, mensaje: "" }))
                    }}
                    placeholder={placeholderMensaje}
                    className="w-full p-4 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm shadow-sm overflow-auto custom-scroll"
                    rows={4}
                    maxLength={500}
                />
                {errors.mensaje && (
                    <p className="text-red-500 text-sm font-medium">{errors.mensaje}</p>
                )}
            </div>

            <Button type="submit" className={`${buttonPrimaryClass} w-full`}>
                Enviar
            </Button>
        </form>
    )
}