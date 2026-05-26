import LoginCard from "../components/LoginCard"
import {
    pageClass,
    containerClass,
    formContainerClass,
    imageWrapperClass,
} from "@/utils/styles"

import { useNavigate } from "react-router-dom"
import useAuthStore from "@/context/useAuthStore"
import { loginRequest } from "../services/authService"
import { toast } from "react-toastify"

export default function LoginPage() {

    const navigate = useNavigate()
    const setAuth = useAuthStore((state) => state.setAuth)

    const handleLogin = async (credentials) => {
        try {
            const res = await loginRequest(credentials)

            if (res?.token) {
                setAuth({
                    token: res.token,
                    user: res.usuario,
                })

                toast.success("Bienvenido")

                const rol = res.usuario?.rol?.toUpperCase()

                if (rol === "CLIENTE") {
                    navigate("/dashboard/perfil")
                } else {
                    navigate("/dashboard")
                }
            }
        } catch (error) {
            console.error("Error:", error)
            toast.error(error.message || "Error en login")
        }
    }

    return (    
        <div className={pageClass}>
            <div className={containerClass}>

                <div className={formContainerClass}>
                    <LoginCard onLogin={handleLogin} />
                </div>

                <div className={imageWrapperClass}>
                    <img
                        src="/images/Login/ImgLogin.webp"
                        onError={(e) => {
                            e.target.src = "/images/notFound/notFound.webp"
                        }}
                        alt="login"
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                </div>

            </div>
        </div>
    )
}