import api from "@/utils/api"

export const ventaDesdePedido = async (pedidoId, datosVenta) => {
    try {
        const response = await api.post(
            `/ventas/crear-desde-pedido/${pedidoId}`,
            datosVenta
        )
        return response.data
    } catch (error) {
        if (error.response) {
            console.error("--- EL BACKEND RECHAZÓ LA PETICIÓN ---");
            console.error("Código de estado:", error.response.status);
            console.error("Datos del error (el mensaje real):", error.response.data);
            
            const msgError = error.response.data.msg || error.response.data.message || "Error desconocido";
            throw new Error(msgError);
        } else if (error.request) {
            console.error("--- NO HUBO RESPUESTA DEL SERVIDOR ---");
            throw new Error("No hay conexión con el servidor");
        } else {
            throw new Error("Error al configurar la petición");
        }
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

export const pagarCarritoConTarjeta = async (datosPago) => {
    try {
        const response = await api.post(`/ventas/pagar-carrito-tarjeta`, datosPago)
        return response.data
    } catch (error) {
        console.error("Error al procesar pago con tarjeta:", error)
        throw new Error(error.response?.data?.msg || "Error al procesar el pago con tarjeta")
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

export const obtenerMisVentas = async (queryString = "") => {
    try {
        const response = await api.get(`/ventas/mis-ventas?${queryString}`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener mis ventas:", error);
        throw new Error(
            error.response?.data?.msg || "Error al obtener la lista de ventas"
        );
    }
};

export const obtenerDetalleVenta = async (ventaId) => {
    try {
        const response = await api.get(`/ventas/detalle/${ventaId}`);
        return response.data;
    } catch (error) {
        console.error(`Error al obtener detalle de venta ${ventaId}:`, error);
        throw new Error(
            error.response?.data?.msg || "Error al obtener el detalle de la venta"
        );
    }
};

export const cancelarVenta = async (ventaId) => {
    try {
        const response = await api.put(`/ventas/cancelar/${ventaId}`);
        return response.data;
    } catch (error) {
        console.error(`Error al cancelar la venta ${ventaId}:`, error);
        throw new Error(
            error.response?.data?.msg || "Error al cancelar la venta"
        );
    }
};

export const confirmarTransferenciaVenta = async (ventaId) => {
    try {
        const response = await api.put(`/ventas/confirmar-transferencia/${ventaId}`);
        return response.data;
    } catch (error) {
        console.error("Error al confirmar transferencia:", error);
        throw new Error(error.response?.data?.msg || "Error al confirmar");
    }
};