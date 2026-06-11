import api from "@/utils/api";

// Dashboard administrador
export const obtenerDashboardAdmin = async () => {
    try {

        const response = await api.get(
            "/dashboard/admin"
        );

        return response.data;

    } catch (error) {

        throw new Error(
            error.response?.data?.msg ||
            "Error al obtener dashboard"
        );
    }
};

// Dashboard vendedor
export const obtenerDashboardVendedor = async () => {
    try {

        const response = await api.get(
            "/dashboard/vendedor"
        );

        return response.data;

    } catch (error) {

        throw new Error(
            error.response?.data?.msg ||
            "Error al obtener dashboard"
        );
    }
};