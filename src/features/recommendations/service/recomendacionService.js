import api from "@/utils/api";

// Crear una recomendación (Vendedor)
export const crearRecomendacion = async (data) => {
    try {
        const response = await api.post("/recomendacion/crear", data);
        return response.data;
    } catch (error) {
        console.error("Error completo:", error.response?.data);  // ← agrega esto
        console.error("Status:", error.response?.status);
        console.error("Data enviada:", data);
        console.error("Error creando recomendación:", error);
        throw new Error(error.response?.data?.msg || "Error al enviar la recomendación");
    }
};

// Obtener mis recomendaciones (Vendedor)
export const obtenerMisRecomendaciones = async (estado = "") => {
    try {
        const response = await api.get(`/recomendacion/mis?estado=${estado}`);
        return response.data;
    } catch (error) {
        console.error("Error obteniendo mis recomendaciones:", error);
        throw new Error(error.response?.data?.msg || "Error al obtener las recomendaciones");
    }
};

// Obtener todas las recomendaciones (Administrador)
export const obtenerRecomendacionesAdmin = async (estado = "", buscar = "") => {
    try {
        const response = await api.get(`/recomendacion/admin?estado=${estado}&buscar=${buscar}`);
        return response.data;
    } catch (error) {
        console.error("Error obteniendo recomendaciones del admin:", error);
        throw new Error(error.response?.data?.msg || "Error al obtener las recomendaciones");
    }
};

// Responder una recomendación (Administrador)
export const responderRecomendacion = async (id, respuestaAdmin) => {
    try {
        const response = await api.patch(`/recomendacion/responder/${id}`, { respuestaAdmin });
        return response.data;
    } catch (error) {
        console.error("Error al responder la recomendación:", error);
        throw new Error(error.response?.data?.msg || "Error al responder la recomendación");
    }
};

// Obtener detalle de una recomendación
export const obtenerDetalleRecomendacion = async (id) => {
    try {
        const response = await api.get(`/recomendacion/detalle/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener detalle de la recomendación:", error);
        throw new Error(error.response?.data?.msg || "Error al obtener el detalle");
    }
};