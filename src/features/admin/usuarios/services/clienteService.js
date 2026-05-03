import api from "@/utils/api"

export const listarClientes = async () => {
    try{
    const res = await api.get("/admin/listar-clientes")
    return res.data
    } catch ( error ){
        console.error("Error listando clientes:", error)

        throw new Error(
            error.response?.data?.msg || "Error al obtener clientes"
        )
    }
}


export const activarCliente = async (id) => {
    return await api.put(`/admin/activar-cliente/${id}`)
}

export const desactivarCliente = async (id) => {
    return await api.put(`/admin/desactivar-cliente/${id}`)
}

export const buscarCliente = async (cedula) => {
    try{
        const res = await api.get(`/admin/buscar-cliente/${cedula}`)
        return res.data
    }catch ( error ){
        console.error("Error al buscar cliente: ", error)
        throw new Error(
            error.response?.data?.msg || "Error al buscar cliente"
        )
    }

}