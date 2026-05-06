import api from "@/utils/api";

export const registrarVendedor = async (data) => {
    try {
        const res = await api.post(
            "/admin/registrar-vendedor",
            data
        );

        return res.data;
    } catch (error) {
        console.error("Error registrando vendedor:", error.response?.data || error.message);

        throw new Error(
            error.response?.data?.msg || "Error al registrar vendedor",
        );
    }
};

export const listarVendedores = async () => {
    try {
        const res = await api.get("/admin/listar-vendedores");
        return res.data;
    } catch (error) {
        console.error("Error listando vendedores:", error);

        throw new Error(
            error.response?.data?.msg || "Error al obtener vendedores",
        );
    }
};

export const activarVendedor = async (id) => {
    const res = await api.put(`/admin/activar-vendedor/${id}`)
    return res.data
}

export const desactivarVendedor = async (id) => {
    const res = await api.put(`/admin/desactivar-vendedor/${id}`)
    return res.data
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

export const listarVendedoresActivos = async () => {
    try {
        const res = await api.get("/admin/listar-vendedores-activos")
        return res.data
    } catch (error) {
        throw new Error(
            error.response?.data?.msg || "Error al obtener vendedores activos"
        )
    }
}

export const listarVendedoresInactivos = async () => {
    try {
        const res = await api.get("/admin/listar-vendedores-inactivos")
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