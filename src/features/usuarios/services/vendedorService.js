import api from "@/utils/api";

export const registrarVendedor = async (data) => {
    try {
        const res = await api.post(
            "/admin/registrar-vendedor",
            data
        );

        return res.data;
    } catch (error) {
        const data = error.response?.data
        const mensaje = data?.error || data?.msg || "Error al registrar vendedor"
        console.error("Error registrando vendedor:", data)
        throw new Error(mensaje)
    }
};

export const desactivarVendedor = async (id) => {
    try {
        const res = await api.put(`/admin/desactivar-vendedor/${id}`)
        return res.data
    } catch (error) {
        throw new Error(
            error.response?.data?.msg || "Error al desactivar vendedor"
        )
    }
}

export const activarVendedor = async (id) => {
    try {
        const res = await api.put(`/admin/activar-vendedor/${id}`)
        return res.data
    } catch (error) {
        throw new Error(
            error.response?.data?.msg || "Error al activar vendedor"
        )
    }
}

export const buscarVendedor = async (cedula) => {
    try{
        const res = await api.get(`/admin/buscar-vendedor/${cedula}`)
        return res.data;
    } catch (error) {
        console.error("Error al buscar vendedores: ", error);

        throw new Error(
            error.response?.data?.msg || "Error al buscar vendedor",
        )
    }
}

export const listarVendedoresActivos = async ({ page = 1, limit = 15 } = {}) => {
    try {
        const res = await api.get("/admin/listar-vendedores-activos", {
            params: { page, limit }
        })
        return res.data
    } catch (error) {
        throw new Error(
            error.response?.data?.msg || "Error al obtener vendedores activos"
        )
    }
}

export const listarVendedoresInactivos = async ({ page = 1, limit = 15 } = {}) => {
    try {
        const res = await api.get("/admin/listar-vendedores-inactivos", {
            params: { page, limit }
        })
        return res.data
    } catch (error) {
        throw new Error(
            error.response?.data?.msg || "Error al obtener vendedores inactivos"
        )
    }
}

export const listarClientesPorVendedor = async (vendedorId) => {
    try {
        const res = await api.get(`/vendedor/clientes/${vendedorId}`)
        return res.data
    } catch (error) {
        console.error("Error al listar clientes del vendedor:", error)

        throw new Error(
            error.response?.data?.msg || "Error al obtener clientes del vendedor"
        )
    }
}