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

        throw {
            message: error.response?.data?.msg || "Error al registrar vendedor",
        };
    }
};