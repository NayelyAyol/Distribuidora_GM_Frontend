import api from "@/utils/api"

export const ventaDesdePedido = async (pedidoId, datosVenta) => {
    try {
        const response = await api.post(
            `/ventas/crear-desde-pedido/${pedidoId}`,
            datosVenta
        )
        return response.data
    } catch (error) {
        console.error("Error al crear venta desde pedido:", error)
        throw new Error(
            error.response?.data?.msg || "Error al procesar la venta desde pedido"
        )
    }
}

export const ventaDirecta = async (datosVenta) => {
    try {
        const response = await api.post(`/ventas/directa`, datosVenta)
        return response.data
    } catch (error) {
        console.error("Error al registrar la venta:", error)
        throw new Error(error.response?.data?.msg || "Error al procesar la venta")
    }
}

export const confirmarTransferencia = async (ventaId, referenciaPago) => {
    try {
        const response = await api.put(
            `/ventas/confirmar-transferencia/${ventaId}`,
            { referenciaPago }
        )
        return response.data
    } catch (error) {
        console.error("Error al confirmar transferencia:", error)
        throw new Error(
            error.response?.data?.msg || "Error al confirmar transferencia"
        )
    }
}