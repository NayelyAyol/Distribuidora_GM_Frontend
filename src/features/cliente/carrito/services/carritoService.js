import api from "../../../../utils/api"

export const agregarAlCarrito = async (productoId, cantidad) => {
    try{
    const response = await api.post("/carrito/agregar", { productoId, cantidad });
    return response.data;
} catch (error) {
    console.error("Error al agregar al carrito:", error);
    throw new Error(error.response?.data?.msg || "Error al agregar al carrito");
}
};

export const obtenerCarrito = async () => {
    try {
        const response = await api.get("/carrito/obtener");
        return response.data;
    } catch (error) {
        console.error("Error al obtener el carrito:", error);
        throw new Error(error.response?.data?.msg || "Error al obtener el carrito");
    }
};

export const actualizarCantidadCarrito = async (articuloId, { cantidad }) => {
    try {
        const response = await api.put(`/carrito/actualizar/${articuloId}`, { cantidad });
        return response.data;
    } catch (error) {
        console.error("Error al actualizar la cantidad en el carrito:", error);
        throw new Error(error.response?.data?.msg || "Error al actualizar la cantidad en el carrito");
    }
};


export const eliminarDelCarrito = async (productoId) => {
    try {
        const res = await api.delete(`/carrito/eliminar/${productoId}`)
        return res.data
    } catch (error) {
        console.error("Error al eliminar del carrito:", error);
        throw new Error(error.response?.data?.msg || "Error al eliminar del carrito");
    }
};

export const vaciarCarrito = async () => {
    try {
        const res = await api.delete("/carrito/vaciar");
        return res.data;
    } catch (error) {
        console.error("Error al vaciar el carrito:", error);
        throw new Error(error.response?.data?.msg || "Error al vaciar el carrito");
    }
};

export const validarCompra = async () => {
    try {
        const res = await api.post("/carrito/validar-compra");
        return res.data;
    } catch (error) {
        console.error("Error al validar la compra:", error);
        throw error.response?.data || { msg: "Error al validar la compra" };
    }
};

export const crearPedidoCarrito = async (formdata) => {
    try {
        const response = await api.post("/pedidos/crear-desde-carrito", formdata)
        return response.data
    } catch (error) {
        console.error("Error creando pedido:", error)
        throw new Error(error.response?.data?.msg || "Error al crear el pedido")
    }

}

export const pagarCarritoTarjeta = async (payload) => {
    try {
        const response = await api.post("/ventas/pagar-carrito-tarjeta", payload);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.msg || "Error en el pago con tarjeta");
    }
};