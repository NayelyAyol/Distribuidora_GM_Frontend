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
