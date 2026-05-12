import api from "@/utils/api"

export const crearCategoria = async (formData) => {
    try {
        const res = await api.post("/categorias/crear", formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });

        return res.data;

    } catch (error) {
        console.error("Error creando categoría:", error);

        throw new Error(
            error.response?.data?.msg || "Error al crear categoría"
        );
    }
};


export const actualizarCategoria = async (categoriaId, formData) => {
    try {
        const res = await api.put(
            `/categorias/actualizar/${categoriaId}`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }
        );

        return res.data;

    } catch (error) {
        console.error("Error actualizando categoría:", error);

        throw new Error(
            error.response?.data?.msg || "Error al actualizar categoría"
        );
    }
};

export const listarCategoriasInactivas = async () => {
    try {
        const res = await api.get("/categorias/inactivas")
        return res.data.categorias
    } catch (error) {
        console.error("Error listando categorías inactivas:", error)
        throw new Error(
            error.response?.data?.msg || "Error al obtener categorías inactivas"
        )
    }
}

export const listarCategoriasActivas = async () => {
    try {
        const res = await api.get("/categorias")
        return res.data.categorias
    } catch (error) {
        console.error("Error listando categorías activas:", error)
        throw new Error(
            error.response?.data?.msg || "Error al obtener categorías activas"
        )
    }
}

export const desactivarCategoria = async (categoriaId) => {
    try {
        const res = await api.put(`/categorias/desactivar/${categoriaId}`);
        return res.data.categorias
    } catch (error) {
        console.error("Error desactivando categoría:", error);
        throw new Error(
            error.response?.data?.msg || "Error al desactivar categoría"
        );
    }
};

export const activarCategoria = async (categoriaId) => {
    try {
        const res = await api.put(`/categorias/activar/${categoriaId}`);
        return res.data.categorias
    } catch (error) {
        console.error("Error activando categoría:", error);
        throw new Error(
            error.response?.data?.msg || "Error al activar categoría"
        );
    }
};