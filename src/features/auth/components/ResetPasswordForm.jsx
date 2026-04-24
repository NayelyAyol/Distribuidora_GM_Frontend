import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { labelClass, inputClass, buttonPrimaryClass } from "@/utils/styles"
import { useNavigate } from "react-router-dom"
import { MdVisibility, MdVisibilityOff } from "react-icons/md"
import { useState } from "react"

export default function ResetPasswordUI() {
    const navigate = useNavigate()

    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

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
                    className={`${buttonPrimaryClass} w-full py-5`}
                >
                    Cambiar contraseña
                </Button>

            </form>
        </div>
    )
}