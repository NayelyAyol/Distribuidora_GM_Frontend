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

export default function LoginPage() {

    const navigate = useNavigate()
    const setAuth = useAuthStore((state) => state.setAuth)

    const handleLogin = async (credentials) => {
        try {
            const res = await loginRequest(credentials)

            console.log("Respuesta login:", res)
            
            if (res?.token) {
                const userData = res.usuario

                setAuth({
                    token: res.token,
                    rol: userData?.rol,
                    user: {
                        id: userData?.id,
                        email: userData?.email,
                        role: userData?.rol,
                        name: userData?.nombre
                    }
                })

                navigate("/menu")
            }
        } catch (error) {
    console.error("ERROR COMPLETO:", error)
    console.error("response:", error.response)
    console.error("data:", error.response?.data)
    console.error("message:", error.message)

    throw error.response?.data ?? { message: error.message }        }
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