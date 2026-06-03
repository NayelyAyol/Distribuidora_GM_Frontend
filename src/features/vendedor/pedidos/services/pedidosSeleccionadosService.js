import api from "../../../../utils/api";

export const obtenerPedidosSeleccionados = async () => {
    try {
        const response = await api.get(`/pedidos/pendientes`)
        return response.data
    } catch (error) {
        console.error("Error al obtener pedidos seleccionados:", error)
        throw new Error(
            error.response?.data?.msg || "Error al obtener pedidos seleccionados",
        )    
    }
}

export const tomarPedido = async (id) => {
    try {
        const response = await api.put(`/pedidos/aceptar/${id}`)
        return response.data
    } catch (error) {
        console.error("Error al tomar pedido:", error)
        throw new Error(
            error.response?.data?.msg || "Error al tomar pedido",
        )
    }
}