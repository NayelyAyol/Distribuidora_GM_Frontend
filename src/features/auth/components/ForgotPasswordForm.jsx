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
import { FiArrowLeft } from "react-icons/fi"

export default function ForgotPasswordForm({ onSubmit }) {
    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm()

    return (
        <div className="w-full max-w-lg relative">
                <button
                    type="button"
                    onClick={() => navigate("/login")}
                    className="
                        absolute
                        -top-[200px]
                        
                        left-0
                        sm:left-0

                        w-10 h-10
                        sm:w-11 sm:h-11

                        rounded-xl
                        bg-white
                        shadow-sm
                        border border-gray-100
                        flex items-center justify-center

                        hover:bg-emerald-50
                        transition
                        z-10
                    "
                >
                    <FiArrowLeft className="text-lg sm:text-xl text-gray-700" />
                </button>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

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
                        className={inputClass}
                        {...register("email", {
                            required: "El correo es obligatorio",
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: "Ingresa un correo válido"
                            }
                        })}
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