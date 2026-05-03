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
                const userData = res.usuario

                setAuth({
                    token: res.token,
                    user: {
                        id: userData?.id,
                        email: userData?.email,
                        rol: userData.rol?.toUpperCase(),
                        nombre: userData?.nombre
                    }
                })

                toast.success("Bienvenido")

                navigate("/dashboard")
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
                        alt="login"
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                </div>

            </div>
        </div>
    )
}