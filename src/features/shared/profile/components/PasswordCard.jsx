import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { MdVisibility, MdVisibilityOff } from "react-icons/md"
import { toast } from "react-toastify"

import {
    inputClass,
    labelClass,
    buttonPrimaryClass
} from "@/utils/styles"

import { changePassword } from "../services/profileService"

export default function PasswordCard() {

    const [form, setForm] = useState({
        passwordActual: "",
        passwordNueva: "",
        confirmPassword: ""
    })

    const [loading, setLoading] = useState(false)

    const [showCurrent, setShowCurrent] = useState(false)
    const [showNew, setShowNew] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)

    const validatePassword = (password) => {
        return (
            /[a-z]/.test(password) &&
            /[A-Z]/.test(password) &&
            /\d/.test(password) &&
            /[^A-Za-z0-9]/.test(password) &&
            password.length >= 8 &&
            password.length <= 16
        )
    }

    const handleChange = (e) => {
        const { name, value } = e.target

        setForm(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const { passwordActual, passwordNueva, confirmPassword } = form

        if (!passwordActual || !passwordNueva || !confirmPassword) {
            toast.error("Todos los campos son obligatorios")
            return
        }

        if (passwordActual === passwordNueva) {
            toast.error("La nueva contraseña no puede ser igual a la actual")
            return
        }

        if (passwordNueva.length < 8) {
            toast.error("La contraseña debe tener mínimo 8 caracteres")
            return
        }

        if (passwordNueva !== confirmPassword) {
            toast.error("Las contraseñas no coinciden")
            return
        }

        if (!validatePassword(passwordNueva)) {
            toast.error("La contraseña debe tener 8-16 caracteres, mayúscula, minúscula, número y símbolo")
            return
        }

        try {
            setLoading(true)

            await changePassword({
                passwordActual,
                passwordNueva,
                confirmPassword
            })

            toast.success("Contraseña actualizada correctamente")

            setForm({
                passwordActual: "",
                passwordNueva: "",
                confirmPassword: ""
            })

        } catch (error) {
            toast.error(error?.message || "Error al actualizar contraseña")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="bg-white/80 backdrop-blur-xl border border-gray-200 shadow-lg rounded-2xl p-6 mt-6">

            <h2 className="text-lg font-bold mb-4 text-gray-800 justify-center flex">
                Cambiar contraseña
            </h2>

            <form className="space-y-4" onSubmit={handleSubmit}>

                <div className="relative">
                    <Label className={`${labelClass} mb-3`}>Contraseña actual</Label>
                    <Input
                        name="passwordActual"
                        type={showCurrent ? "text" : "password"}
                        value={form.passwordActual}
                        onChange={handleChange}
                        required
                        className={inputClass + " pr-10"}
                    />
                    <button
                        type="button"
                        onClick={() => setShowCurrent(!showCurrent)}
                        className="absolute right-3 top-3/4 -translate-y-1/2 text-emerald-900"
                    >
                        {showCurrent ? <MdVisibilityOff /> : <MdVisibility />}
                    </button>
                </div>

                <div className="relative">
                    <Label className={`${labelClass} mb-3`}>Nueva contraseña</Label>
                    <Input
                        name="passwordNueva"
                        type={showNew ? "text" : "password"}
                        value={form.passwordNueva}
                        onChange={handleChange}
                        required
                        className={inputClass + " pr-10"}
                    />
                    <button
                        type="button"
                        onClick={() => setShowNew(!showNew)}
                        className="absolute right-3 top-3/4 -translate-y-1/2 text-emerald-900"
                    >
                        {showNew ? <MdVisibilityOff /> : <MdVisibility />}
                    </button>
                </div>

                <div className="relative">
                    <Label className={`${labelClass} mb-3`}>Confirmar contraseña</Label>
                    <Input
                        name="confirmPassword"
                        type={showConfirm ? "text" : "password"}
                        value={form.confirmPassword}
                        onChange={handleChange}
                        required
                        className={inputClass + " pr-10"}
                    />
                    <button
                        type="button"
                        onClick={() => setShowConfirm(!showConfirm)}
                        className="absolute right-3 top-3/4 -translate-y-1/2 text-emerald-900"
                    >
                        {showConfirm ? <MdVisibilityOff /> : <MdVisibility />}
                    </button>
                </div>

                <Button type="submit" disabled={loading} className={buttonPrimaryClass}>
                    {loading ? "Actualizando..." : "Actualizar contraseña"}
                </Button>

            </form>
        </div>
    )
}