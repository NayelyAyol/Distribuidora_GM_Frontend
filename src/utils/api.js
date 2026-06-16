import axios from "axios";
import useAuthStore from "@/context/useAuthStore";
import { navigateTo } from "./navigation";

const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
});

// Uso de token de forma automatica en cada solicitud
api.interceptors.request.use(
    (config) => {
    const token = useAuthStore.getState().token;

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
    },
    (error) => Promise.reject(error),
);

// Manejo de errores
api.interceptors.response.use(
    (response) => response,
    (error) => {
        const { logout } = useAuthStore.getState()
        const url = error.config?.url || ""

        const isPublicEndpoint = [
            "/auth/login",
            "/auth/recuperar-password",
            "/clientes/registro",
        ].some((endpoint) => url.includes(endpoint))

        if (error.response?.status === 401 && !isPublicEndpoint) {
            console.warn("Sesión expirada o no autorizada")
            logout()
            navigateTo("/login", { replace: true })
        }

        return Promise.reject(error)
    },
)

export default api;
