import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    labelClass,
    inputClass,
    buttonPrimaryClass
} from "@/utils/styles"
import { useNavigate } from "react-router-dom"

export default function ForgotPasswordForm({ onSubmit }) {
    const navigate = useNavigate()

    const { register, handleSubmit, formState: { errors } } = useForm()

    return (
        <div className="w-full max-w-lg">

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <button
                    onClick={() => navigate("/login")}
                    className="absolute top-6 left-6 text-sm text-gray-600 hover:text-emerald-600 transition"
                >
                    ← Volver
                </button>

                {/* Título */}
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-800">
                        ¿Olvidaste tu contraseña?
                    </h2>
                    <p className="text-gray-500 text-sm mt-2">
                        Ingresa tu correo y te enviaremos instrucciones
                    </p>
                </div>

                {/* Email */}
                <div>
                    <Label className={`${labelClass} mb-2`}>
                        Correo electrónico
                    </Label>

                    <Input
                        type="email"
                        placeholder="ejemplo@email.com"
                        {...register("email", {
                            required: "El correo es obligatorio"
                        })}
                        className={inputClass}
                    />

                    {errors.email && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.email.message}
                        </p>
                    )}
                </div>

                {/* Botón */}
                <Button
                    className={`${buttonPrimaryClass} w-full py-5`}
                    type="submit"
                >
                    Enviar
                </Button>

            </form>
        </div>
    )
}