import api from "@/utils/api"

export const Catalogo = async() =>{
    try{
        const res = await api.get("/productos/catalogo")
        return res.data.productos
    }catch (error){
        console.error("Error al listar los productos", error)
        throw new Error(
            error.response?.data?.msg || "Error al listar los productos"
        )
    }
} 

export const BuscarProducto = async(nombre) =>{
    try{
        const res = api.get(`/productos/gestion?buscar=${nombre}`)
        return res.data.productos
    } catch (error){
        console.error("Error al buscar el producto")
        throw new Error (
            error.response?.data?.msg || "Error al buscar el producto"
        )
    }
}