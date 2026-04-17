import api from "@/utils/api"

export const loginRequest = async (credentials) => {
    try {
        const res = await api.post("/auth/login", credentials)
        return res.data
    } catch (error) {
        console.error("Login error:", error.response?.data || error.message)

        throw {
            message: error.response?.data?.msg || "Error en login"
        }
    }
}

export const recoverPassword = async (email) => {
    try {
        const res = await api.post("/auth/recuperar-password", { email })
        return res.data
    } catch (error) {
        console.error(
            "Recover password error:",
            error.response?.data || error.message
        )

        throw {
            message: error.response?.data?.msg || "Error al enviar recuperación"
        }
    }
}