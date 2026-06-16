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
import { toast } from "react-toastify"

export default function ForgotPasswordForm({ onSubmit }) {

    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm()

    const handleFormSubmit = (data) => {
        toast.dismiss()

        if (!data.email) {
            toast.error("El correo es obligatorio")
            return
        }

        onSubmit(data)
    }

return (
    <div className="w-full max-w-lg relative">

        <div className="relative flex items-center justify-center pt-2 mb-8 px-2 sm:px-0">

            <button
                type="button"
                onClick={() => navigate("/login")}
                className="
                    absolute
                    left-0

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

            <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-800">
                    ¿Olvidaste tu contraseña?
                </h2>

                <p className="text-gray-500 text-sm mt-2">
                    Ingresa tu correo y te enviaremos instrucciones
                </p>
            </div>

        </div>

        <form
            onSubmit={handleSubmit(handleFormSubmit)}
            noValidate
            className="space-y-6"
        >

            <div>
                <Label className={`${labelClass} mb-2`}>
                    Correo electrónico
                </Label>

                <Input
                    type="email"
                    placeholder="ejemplo@email.com"
                    className={inputClass}
                    maxLength={200}
                    {...register("email", {
                        required: "El correo es obligatorio",
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Ingresa un correo válido"
                        }
                    })}
                />

                {errors.email && (
                    <p className="text-red-500 text-sm mt-1 font-medium">
                        {errors.email.message}
                    </p>
                )}
            </div>

            <Button
                type="submit"
                className={`${buttonPrimaryClass} py-5`}
            >
                Enviar
            </Button>

        </form>

    </div>
)
}