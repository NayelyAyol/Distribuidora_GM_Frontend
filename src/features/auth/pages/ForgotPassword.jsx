import ForgotPasswordForm from "../components/ForgotPasswordForm"
import {
    pageClass,
    containerClass,
    formContainerClass,
    imageWrapperClass,
} from "@/utils/styles"
import { useNavigate } from "react-router-dom"
import { recoverPassword } from "../services/authService"
import { toast } from "react-toastify"

export default function ForgotPassword() {
    const navigate = useNavigate()

    const handleRecover = async (data) => {
        const loading = toast.loading("Enviando correo...")

        try {
            await recoverPassword(data.email)

            toast.dismiss(loading)
            toast.success("Correo enviado correctamente")

            setTimeout(() => {
                navigate("/login")
            }, 2000)

        } catch (error) {
            toast.dismiss(loading)

            const msg =
                error?.message ||
                error?.response?.data?.msg ||
                "Error al enviar correo"

            toast.error(msg)
        }
    }

    return (
        <div className={pageClass}>
            <div className={containerClass}>

                <div className={formContainerClass}>
                    <ForgotPasswordForm onSubmit={handleRecover} />
                </div>

                <div className={imageWrapperClass}>
                    <img
                        src="/images/login/ImgLogin.webp"
                        alt="Recuperación de contraseña"
                        loading="lazy"
                        onError={(e) => {
                            e.currentTarget.src = "/images/categories/default.webp"
                        }}
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                </div>

            </div>
        </div>
    )
}