import api from "../../../../utils/api";

export const crearPedido = async (formdata) => {
    try {
        const response = await api.post("/pedidos/crear", formdata)
        return response.data
    } catch (error) {
        console.error("Error creando pedido:", error)
        throw new Error(error.response?.data?.message || "Error al crear el pedido")
    }

}
