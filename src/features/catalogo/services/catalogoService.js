import api from "@/utils/api"

export const Explorar = async (params = {}) => {
    try {
        const res = await api.get("/productos/explorar", {
            params
        })
        return res.data
    } catch (error) {
        console.error("Error al explorar los productos:", error)
        throw new Error(
            error.response?.data?.msg || "Error al explorar los productos"
        )
    }
}