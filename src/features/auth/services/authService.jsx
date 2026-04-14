import api from "@/utils/api"

export const loginRequest = async (credentials) => {
    try {
        const res = await api.post("/auth/login", credentials)
        return res.data
    } catch (error) {
        console.error("Login error:", error.response?.data || error.message)
        throw error.response?.data ?? { message: "Error en login" }
    }
}