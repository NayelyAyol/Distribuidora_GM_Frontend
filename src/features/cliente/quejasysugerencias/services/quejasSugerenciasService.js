import api from "../../../../utils/api";

// Crear queja o sugerencia
export const crearQuejaSugerencia = async (data) => {
    try {
        const response = await api.post(
            "/quejas-sugerencias/crear",
            data
        );

        return response.data;
    } catch (error) {
        console.error(
            "Error creando queja o sugerencia:",
            error
        );

        throw new Error(
            error.response?.data?.msg ||
            "Error al enviar la queja o sugerencia"
        );
    }
};

// Obtener mis quejas o sugerencias
export const obtenerMisQuejasSugerencias = async (
    estado = ""
) => {
    try {

        const query = estado
            ? `?estado=${estado}`
            : "";

        const response = await api.get(
            `/quejas-sugerencias/mis${query}`
        );

        return response.data;

    } catch (error) {

        console.error(
            "Error obteniendo quejas o sugerencias:",
            error
        );

        throw new Error(
            error.response?.data?.msg ||
            "Error al obtener las quejas o sugerencias"
        );
    }
};

// Obtener todas las quejas y sugerencias (ADMIN)
export const obtenerQuejasSugerenciasAdmin = async (
    estado = "",
    rolUsuario = ""
) => {
    try {

        const params = [];

        if (estado) {
            params.push(`estado=${estado}`);
        }

        if (rolUsuario) {
            params.push(`rolUsuario=${rolUsuario}`);
        }

        const query =
            params.length > 0
                ? `?${params.join("&")}`
                : "";

        const response = await api.get(
            `/quejas-sugerencias/admin${query}`
        );

        return response.data;

    } catch (error) {

        console.error(
            "Error obteniendo quejas y sugerencias:",
            error
        );

        throw new Error(
            error.response?.data?.msg ||
            "Error al obtener las quejas y sugerencias"
        );
    }
};

// Responder queja o sugerencia (ADMIN)
export const responderQuejaSugerencia = async (
    id,
    respuestaAdmin
) => {
    try {

        const response = await api.patch(
            `/quejas-sugerencias/responder/${id}`,
            {
                respuestaAdmin
            }
        );

        return response.data;

    } catch (error) {

        console.error(
            "Error respondiendo queja o sugerencia:",
            error
        );

        throw new Error(
            error.response?.data?.msg ||
            "Error al responder la queja o sugerencia"
        );
    }
};

// Obtener detalle
export const obtenerDetalleQuejaSugerencia = async (
    id
) => {
    try {

        const response = await api.get(
            `/quejas-sugerencias/detalle/${id}`
        );

        return response.data;

    } catch (error) {

        console.error(
            "Error obteniendo detalle:",
            error
        );

        throw new Error(
            error.response?.data?.msg ||
            "Error al obtener el detalle"
        );
    }
};