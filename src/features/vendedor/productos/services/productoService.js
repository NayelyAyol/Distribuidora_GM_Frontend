import api from "@/utils/api"

export const actualizarProducto = async(productoId, formData) => {
    try{
    const res = await api.put(`productos/actualizar/${productoId}`, formData)
    return res.data;
    }catch (error) {
        console.error("Error al actualizar producto", error)
        throw new Error(
            error.response?.data?.msg || "Error al actualizar producto"
        )
    }
}

export const gestionProductos = async (params = {}) => {
    try {
        const res = await api.get("/productos/gestion",
            {
                params
            }
        )
        return res.data
    } catch (error) {
        console.error("Error al gestionar productos",error)
        throw new Error(
            error.response?.data?.msg || "Error al gestionar productos"
        )
    }
}

export const desactivarProducto = async ( productoId ) => {
    try {
        const res = await api.put(`/productos/desactivar/${productoId}`)
        return res.data
    } catch (error) {
        console.error("Error al desactivar producto",error)
        throw new Error(
            error.response?.data?.msg || "Error al desactivar producto"
        )
    }
}

export const activarProducto = async ( productoId ) => {
    try {
        const res = await api.put(`/productos/activar/${productoId}`)
        return res.data
    } catch (error) {
        console.error("Error al activar producto",error)
        throw new Error(
            error.response?.data?.msg || "Error al activar producto"
        )
    }
}