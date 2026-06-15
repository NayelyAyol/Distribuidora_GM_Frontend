import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { MdVisibility, MdVisibilityOff } from "react-icons/md"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

import {
    inputClass,
    labelClass,
    buttonPrimaryClass,
} from "@/utils/styles"

export default function LoginForm({ onSubmit }) {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState("")

    const navigate = useNavigate()

    const isValidEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        setError("")

        // 🔴 VALIDACIONES CON TOAST
        if (!email || !password) {
            toast.error("Todos los campos son obligatorios")
            return
        }

        if (!isValidEmail(email)) {
            toast.error("Ingresa un correo válido")
            return
        }

        if (password.length < 6) {
            toast.error("La contraseña es muy corta")
            return
        }

        try {
            await onSubmit({ email, password })
        } catch (err) {
            const msg =
                err?.message ||
                "Usuario o contraseña incorrectos"

            setError(msg)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-8">

            {/* EMAIL */}
            <div className="space-y-3">
                <Label className={labelClass}>
                    Correo Electrónico
                </Label>

                <Input
                    type="email"
                    placeholder="m@gmail.com"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value)
                        setError("")
                    }}
                    required
                    className={inputClass}
                />
            </div>

            {/* PASSWORD */}
            <div className="space-y-3">

                <div className="flex justify-between items-baseline">
                    <Label className={labelClass}>
                        Contraseña
                    </Label>

                    <Button
                        type="button"
                        variant="link"
                        onClick={() => navigate("/resetear-password")}
                        className="text-sm font-semibold text-emerald-900 hover:text-black"
                    >
                        ¿Olvidaste tu contraseña?
                    </Button>
                </div>

                <div className="relative">
                    <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="********"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value)
                            setError("")
                        }}
                        required
                        className={inputClass}
                    />

                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-900"
                    >
                        {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
                    </button>
                </div>
            </div>

            {error && (
                <p className="text-red-500 text-sm text-center font-medium">
                    {error}
                </p>
            )}

            <Button type="submit" className={buttonPrimaryClass}>
                Aceptar
            </Button>

<div className="border"></div>
            {/*<Button variant="outline" className={`${buttonOutlineClass} py-5`}>
                <img src="/icons8-logo-de-google.svg" className="mr-3 h-5 w-5" />
                Iniciar sesión con Google
            </Button>
*/}
        </form>
    )
}