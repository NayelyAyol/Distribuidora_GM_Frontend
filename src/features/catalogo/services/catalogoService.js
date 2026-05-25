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

export const Explorar = async (params = {}) => {
    try {
        const res = await api.get("/productos/explorar", {
            params
        })

        return res.data.productos
    } catch (error) {
        console.error("Error al explorar los productos", error)
        throw new Error(
            error.response?.data?.msg || "Error al explorar los productos"
        )
    }
}
