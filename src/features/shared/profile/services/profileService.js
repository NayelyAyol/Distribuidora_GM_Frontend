import api from "@/utils/api";

export const getProfile = async () => {
    try {
        const res = await api.get("/auth/perfil");
        return res.data;
    } catch (error) {
        console.error("Error al obtener el perfil:", error);
        throw new Error(error.response?.data?.msg || "Error al obtener el perfil");
    }
};

export const updateProfile = async (data) => {
    try {
        const res = await api.put("/auth/perfil", data);
        return res.data;
    } catch (error) {
        console.error("Error al actualizar el perfil:", error);
        throw new Error(error.response?.data?.msg || "Error al actualizar el perfil");
    }
};

export const uploadProfileImage = async (formData) => {
    try {
        const res = await api.put("/auth/actualizar-foto", formData);
        return res.data;
    } catch (error) {
        console.error("Error al subir la foto:", error);
        throw new Error(error.response?.data?.msg || "Error al subir la foto");
    }
};

export const changePassword = async (data) => {
    try {
        const res = await api.put("/auth/actualizar-password", data);
        return res.data;
    } catch (error) {
        console.error("Error al cambiar la contraseña:", error);
        throw new Error(error.response?.data?.msg || "Error al cambiar la contraseña");
    }
};