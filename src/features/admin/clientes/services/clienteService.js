import api from "@/utils/api"

export const listarClientes = async () => {
    const res = await api.get("/admin/listar-clientes")
    return res.data
}

export const activarCliente = async (id) => {
    return await api.put(`/admin/activar-cliente/${id}`)
}

export const desactivarCliente = async (id) => {
    return await api.put(`/admin/desactivar-cliente/${id}`)
}