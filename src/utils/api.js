import axios from "axios"
import useAuthStore from "@/context/useAuthStore"

const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    headers: {
        "Content-Type": "application/json",
    },
})

// Uso de token de forma automatica en cada solicitud
api.interceptors.request.use(
    (config) => {
        const token = useAuthStore.getState().token

        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }

        return config
    },
    (error) => Promise.reject(error)
)

// Manejo de errores
api.interceptors.response.use(
    (response) => response,
    (error) => {
        const { logout } = useAuthStore.getState()

        if (error.response?.status === 401) {
            console.warn("Sesión expirada o no autorizada")
            logout()
            window.location.href = "/login"
        }

        return Promise.reject(error.response?.data || error)
    }
)

export default api