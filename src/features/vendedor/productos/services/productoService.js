import api from "@/utils/api"

export const actualizarProducto = async(productoId, formData) => {
    try{
    const res = api.put(`productos/actualizar/${productoId}`, formData)
    return res.data;
    }catch (error) {
        console.error("Error al actualizar producto", error)
        throw new Error(
            error.response?.data?.msg || "Error al actualizar producto"
        )
    }
}