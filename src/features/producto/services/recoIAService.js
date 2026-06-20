import api from "@/utils/api"

export const obtenerRecomendacionesIA = async (productoId) => {
    try {
        const res = await api.get(`/recomendaciones-ia/producto/${productoId}`)
        return res.data
    } catch (error) {
        console.error("Error al obtener recomendaciones IA:", error)
        throw new Error(
            error.response?.data?.msg || "Error al obtener recomendaciones"
        )
    }
}