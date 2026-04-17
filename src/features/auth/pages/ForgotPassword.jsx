import ForgotPasswordForm from "../components/ForgotPasswordForm"
import {
    pageClass,
    containerClass,
    formContainerClass,
    imageWrapperClass,
} from "@/utils/styles"
import { useNavigate } from "react-router-dom"

export default function ForgotPassword() {
    const navigate = useNavigate()

    const handleRecover = async (data) => {
        console.log(data)
    }

    return (
        <div className={pageClass}>
            <div className={containerClass}>

                {/* Formulario */}
                <div className={formContainerClass}>

                    <button
                        onClick={() => navigate("/login")}
                        className="absolute top-6 left-6 text-sm text-gray-600 hover:text-emerald-600 transition"
                    >
                        ← Volver
                    </button>

                    <ForgotPasswordForm onSubmit={handleRecover} />
                </div>

                {/* Imagen */}
                <div className={imageWrapperClass}>
                    <img
                        src="/images/Login/olvidarContraseña.webp"
                        alt="recover"
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                </div>

            </div>
        </div>
    )
}