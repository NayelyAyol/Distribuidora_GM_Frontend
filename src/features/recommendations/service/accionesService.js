import api from "@/utils/api";

// Listar todas las acciones administrativas (Admin)
export const listarAccionesAdmin = async () => {
    try {
        const response = await api.get("/acciones-admin");
        return response.data;
    } catch (error) {
        console.error("Error obteniendo acciones administrativas:", error);
        throw new Error(error.response?.data?.msg || "Error al obtener las acciones administrativas");
    }
};

// Marcar una acción como finalizada (Admin)
export const finalizarAccionAdmin = async (tipo) => {
    try {
        const response = await api.patch(`/acciones-admin/${tipo}/finalizar`);
        return response.data;
    } catch (error) {
        console.error("Error al finalizar acción administrativa:", error);
        throw new Error(error.response?.data?.msg || "Error al finalizar la acción administrativa");
    }
};

// Marcar una acción como pendiente nuevamente (Admin)
export const reactivarAccionAdmin = async (tipo) => {
    try {
        const response = await api.patch(`/acciones-admin/${tipo}/reactivar`);
        return response.data;
    } catch (error) {
        console.error("Error al reactivar acción administrativa:", error);
        throw new Error(error.response?.data?.msg || "Error al reactivar la acción administrativa");
    }
};

// Ejecutar la promoción sugerida (Admin)
export const ejecutarPromocionSugerida = async () => {
    try {
        const response = await api.post("/acciones-admin/PROMOCION_SUGERIDA/ejecutar");
        return response.data;
    } catch (error) {
        console.error("Error al ejecutar promoción sugerida:", error);
        throw new Error(error.response?.data?.msg || "Error al ejecutar la promoción sugerida");
    }
};

export const ejecutarFechaFestiva = async () => {
    try {
        const response = await api.post("/acciones-admin/ejecutar/fecha-festiva");
        return response.data;
    } catch (error) {
        console.error("Error al ejecutar fecha festiva:", error);
        throw new Error(error.response?.data?.msg || "Error al ejecutar la campaña de fecha festiva");
    }
};