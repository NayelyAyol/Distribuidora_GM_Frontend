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
    try {
        const res = await api.put(`/admin/activar-cliente/${id}`)
        return res.data
    } catch (error) {
        throw new Error(
            error.response?.data?.msg || "Error al activar cliente"
        )
    }
}

export const desactivarCliente = async (id) => {
    try {
        const res = await api.put(`/admin/desactivar-cliente/${id}`)
        return res.data
    } catch (error) {
        throw new Error(
            error.response?.data?.msg || "Error al desactivar cliente"
        )
    }
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

export const listarClientesActivos = async () => {
    try {
        const res = await api.get("/admin/listar-clientes-activos")
        return res.data
    } catch (error) {
        throw new Error(
            error.response?.data?.msg || "Error al obtener clientes activos"
        )
    }
}

export const listarClientesInactivos = async () => {
    try {
        const res = await api.get("/admin/listar-clientes-inactivos")
        return res.data
    } catch (error) {
        throw new Error(
            error.response?.data?.msg || "Error al obtener clientes inactivos"
        )
    }
}

export const registrarCliente = async (data) => {
    try {
        const res = await api.post("/vendedor/registrar-cliente", data)
        return res.data
    } catch (error) {
        console.error("Error al registrar cliente:", error)

        throw new Error(
            error.response?.data?.msg || "Error al registrar cliente"
        )
    }
}