import api from "../../../../utils/api";

// Obtener perfil
export const getProfile = async () => {
    const res = await api.get("/auth/perfil")
    return res.data
}

// Actualizar perfil
export const updateProfile = async (data) => {
    const res = await api.put("/auth/perfil", data)
    return res.data
}

// Cambiar contraseña
export const changePassword = async (data) => {
    const res = await api.put("/auth/actualizar-password", data)
    return res.data
}