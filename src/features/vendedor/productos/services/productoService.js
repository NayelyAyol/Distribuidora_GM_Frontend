import api from "@/utils/api"

export const crearProducto = async (formData) => {
    try {
        console.log("Enviando petición...");
        const res = await api.post("/productos/crear", formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        
        // Verifica si res.data existe o si es el objeto completo
        console.log("Estructura completa de respuesta:", res); 
        
        if (!res.data) {
            console.warn("La respuesta del servidor no tiene 'data'");
            return res; // Retorna el objeto completo por si el dato está en otro nivel
        }
        
        return res.data; 
    } catch (error) {
        console.error("Error en la petición:", error.response?.data || error.message);
        throw new Error(error.response?.data?.msg || "Error desconocido al crear el producto");
    }
}

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