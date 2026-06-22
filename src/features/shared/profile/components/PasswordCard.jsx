import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { MdVisibility, MdVisibilityOff } from "react-icons/md"

import {
    inputClass,
    labelClass,
    buttonPrimaryClass
} from "@/utils/styles"

import { changePassword } from "../services/profileService"
import { toast } from "react-toastify"

export default function PasswordCard() {

    const [form, setForm] = useState({
        passwordActual: "",
        passwordNueva: "",
        confirmPassword: ""
    })

    const [errors, setErrors] = useState({})

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

        setErrors(prev => ({
            ...prev,
            [name]: ""
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const { passwordActual, passwordNueva, confirmPassword } = form

        const newErrors = {}

        if (!passwordActual) {
            newErrors.passwordActual = "La contraseña actual es obligatoria"
        }

        if (!passwordNueva) {
            newErrors.passwordNueva = "La nueva contraseña es obligatoria"
        }

        if (!confirmPassword) {
            newErrors.confirmPassword = "Debes confirmar la contraseña"
        }

        if (passwordActual && passwordNueva && passwordActual === passwordNueva) {
            newErrors.passwordNueva = "La nueva contraseña no puede ser igual a la actual"
        }

        if (passwordNueva && passwordNueva.length < 8) {
            newErrors.passwordNueva = "La contraseña debe tener mínimo 8 caracteres"
        }

        if (passwordNueva && confirmPassword && passwordNueva !== confirmPassword) {
            newErrors.confirmPassword = "Las contraseñas no coinciden"
        }

        if (passwordNueva && !validatePassword(passwordNueva)) {
            newErrors.passwordNueva =
                "Debe tener 8-16 caracteres, mayúscula, minúscula, número y símbolo"
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
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

            <form className="space-y-4" onSubmit={handleSubmit} noValidate>

                <div className="relative">
                    <Label htmlFor="passwordActual" className={`${labelClass} mb-3`}>
                        Contraseña actual
                    </Label>

                    <Input
                        id="passwordActual"
                        name="passwordActual"
                        type={showCurrent ? "text" : "password"}
                        value={form.passwordActual}
                        onChange={handleChange}
                        className={inputClass}
                        maxLength={16}
                    />

                    <button
                        type="button"
                        onClick={() => setShowCurrent(!showCurrent)}
                        className="absolute right-3 top-3/4 -translate-y-1/2 text-emerald-900"
                    >
                        {showCurrent ? <MdVisibilityOff /> : <MdVisibility />}
                    </button>

                    {errors.passwordActual && (
                        <p className="text-red-500 text-sm font-medium">
                            {errors.passwordActual}
                        </p>
                    )}
                </div>

                <div className="relative">
                    <Label htmlFor="passwordNueva" className={`${labelClass} mb-3`}>
                        Nueva contraseña
                    </Label>

                    <Input
                        id="passwordNueva"
                        name="passwordNueva"
                        type={showNew ? "text" : "password"}
                        value={form.passwordNueva}
                        onChange={handleChange}
                        className={inputClass}
                    />

                    <button
                        type="button"
                        onClick={() => setShowNew(!showNew)}
                        className="absolute right-3 top-3/4 -translate-y-1/2 text-emerald-900"
                    >
                        {showNew ? <MdVisibilityOff /> : <MdVisibility />}
                    </button>

                    {errors.passwordNueva && (
                        <p className="text-red-500 text-sm font-medium">
                            {errors.passwordNueva}
                        </p>
                    )}
                </div>

                <div className="relative">
                    <Label htmlFor="confirmPassword" className={`${labelClass} mb-3`}>
                        Confirmar contraseña
                    </Label>

                    <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirm ? "text" : "password"}
                        value={form.confirmPassword}
                        onChange={handleChange}
                        className={inputClass}
                    />

                    <button
                        type="button"
                        onClick={() => setShowConfirm(!showConfirm)}
                        className="absolute right-3 top-3/4 -translate-y-1/2 text-emerald-900"
                    >
                        {showConfirm ? <MdVisibilityOff /> : <MdVisibility />}
                    </button>

                    {errors.confirmPassword && (
                        <p className="text-red-500 text-sm font-medium">
                            {errors.confirmPassword}
                        </p>
                    )}
                </div>

                <Button
                    type="submit"
                    disabled={loading}
                    className={buttonPrimaryClass}
                >
                    {loading ? "Actualizando..." : "Aceptar"}
                </Button>

            </form>
        </div>
    )
}