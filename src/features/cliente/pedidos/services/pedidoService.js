import api from "../../../../utils/api";

export const crearPedido = async (formdata) => {
    try {
        const response = await api.post("/pedidos/crear-foto", formdata)
        return response.data
    } catch (error) {
        console.error("Error creando pedido:", error)
        throw new Error(error.response?.data?.msg || "Error al crear el pedido")
    }

}

export const obtenerMisPedidos = async (queryString) => {
    try {
        const response = await api.get(`/pedidos/mis-pedidos?${queryString}`)
        return response.data
    } catch (error) {
        console.error("Error obteniendo pedidos del cliente:", error)
        throw new Error(error.response?.data?.msg || "Error al obtener los pedidos")
    }
}


export const armarPedidoFoto = async (pedidoId, articulos) => {
    try {
        const response = await api.put(`/pedidos/armar-desde-foto/${pedidoId}`, {
            articulos
        });
    return response.data;
    } catch (error) {
        console.error("Error al confirmar transferencia:", error);
        throw new Error(error.response?.data?.msg || "Error al confirmar");
    }
}

export const definirPagoPedido = async (pedidoId, data) => {
    try {
        const response = await api.put(`/pedidos/definir-pago/${pedidoId}`, data);
        return response.data;
    } catch (error) {
        console.error("Error definiendo método de pago:", error);
        throw new Error(error.response?.data?.msg || "Error al definir el método de pago");
    }
};