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

    const [errors, setErrors] = useState({
        email: "",
        password: ""
    })

    const navigate = useNavigate()

    const isValidEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    }

    const isStrongPassword = (password) => {
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,16}$/.test(password)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        setErrors({
            email: "",
            password: ""
        })

        const newErrors = {}

        if (!email) {
            newErrors.email = "El correo es obligatorio"
        } else if (!isValidEmail(email)) {
            newErrors.email = "Ingresa un correo válido"
        } else if (email.length > 100) {
            newErrors.email = "El correo es demasiado largo"
        }

        if (!password) {
            newErrors.password = "La contraseña es obligatoria"
        } else if (!isStrongPassword(password)) {
            newErrors.password =
                "Debe tener entre 8 y 16 caracteres, incluir mayúsculas, minúsculas, números y caracteres especiales"
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
            return
        }

        try {
            await onSubmit({
                email,
                password
            })
        } catch (err) {
            const msg =
                err?.message ||
                "Usuario o contraseña incorrectos"

            toast.error(msg)
        }
    }

    return (
        <form onSubmit={handleSubmit} noValidate className="space-y-8">

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

                        setErrors(prev => ({
                            ...prev,
                            email: ""
                        }))
                    }}
                    className={inputClass}
                    maxLength={100}
                />

                {errors.email && (
                    <p className="text-red-500 text-sm font-medium">
                        {errors.email}
                    </p>
                )}
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

                            setErrors(prev => ({
                                ...prev,
                                password: ""
                            }))
                        }}
                        className={inputClass}
                        minLength={8}
                        maxLength={16}
                    />

                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-900"
                    >
                        {showPassword
                            ? <MdVisibilityOff />
                            : <MdVisibility />
                        }
                    </button>
                </div>

                {errors.password && (
                    <p className="text-red-500 text-sm font-medium">
                        {errors.password}
                    </p>
                )}
            </div>

            <Button
                type="submit"
                className={buttonPrimaryClass}
            >
                Aceptar
            </Button>

        </form>
    )
}