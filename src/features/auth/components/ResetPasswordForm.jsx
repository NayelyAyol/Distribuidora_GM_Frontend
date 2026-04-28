import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { labelClass, inputClass, buttonPrimaryClass } from "@/utils/styles"
import { useNavigate, useSearchParams } from "react-router-dom"
import { MdVisibility, MdVisibilityOff } from "react-icons/md"
import { useState } from "react"
import { changePassword } from "../services/authService"
import { toast } from "react-toastify"

export default function ResetPasswordUI() {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()

    const token = searchParams.get("token")

    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const [loading, setLoading] = useState(false)

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

    const handlePassword = async () => {
        try {
            if (!password || !confirmPassword) {
                toast.error("Todos los campos son obligatorios")
                return
            }

            if (password.length < 8) {
                toast.error("La contraseña debe tener mínimo 8 caracteres")
                return
            }

            if (password !== confirmPassword) {
                toast.error("Las contraseñas no coinciden")
                return
            }

            if (!validatePassword(password)) {
                toast.error("Debe tener 8-16 caracteres, mayúscula, minúscula, número y símbolo")
                return
            }

            setLoading(true)

            const res = await changePassword(token, password, confirmPassword)

            if (res?.msg) {
                toast.success(res.msg)
                navigate("/login")
            }

        } catch (error) {
            toast.error(error?.message || "Error al cambiar la contraseña")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="w-full max-w-lg mx-auto">
            <button
                type="button"
                onClick={() => navigate("/login")}
                className="absolute top-6 left-6 text-sm text-gray-600 hover:text-emerald-600 transition"
            >
                ← Volver
            </button>

            <form className="space-y-6 relative">

                <div className="text-center pt-8">
                    <h2 className="text-2xl font-bold text-gray-800">
                        Nueva contraseña
                    </h2>
                    <p className="text-gray-500 text-sm mt-2">
                        Ingresa tu nueva contraseña para continuar
                    </p>
                </div>

                <div className="relative">
                    <Label className={`${labelClass} mb-2`}>
                        Nueva contraseña
                    </Label>

                    <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className={`${inputClass} pr-10`}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-9 text-emerald-900"
                    >
                        {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
                    </button>
                </div>

                <div className="relative">
                    <Label className={`${labelClass} mb-2`}>
                        Confirmar contraseña
                    </Label>

                    <Input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className={`${inputClass} pr-10`}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />

                    <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-9 text-emerald-900"
                    >
                        {showConfirmPassword ? <MdVisibilityOff /> : <MdVisibility />}
                    </button>
                </div>

                <Button
                    type="button"
                    onClick={handlePassword}
                    disabled={loading}
                    className={`${buttonPrimaryClass} w-full py-5`}
                >
                    {loading ? "Actualizando..." : "Cambiar contraseña"}
                </Button>

            </form>
        </div>
    )
}