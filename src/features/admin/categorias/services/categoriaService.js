import api from "@/utils/api"

export const crearCategoria = async (data) => {
    try {
        const res = await api.post("/categorias/crear", {
            nombre: data.nombre,
            descripcion: data.descripcion,
            imagen: data.imagen
        });

        return res.data;

    } catch (error) {
        console.error("Error creando categoría:", error);

        throw new Error(
            error.response?.data?.msg || "Error al crear categoría"
        );
    }
};

export const listarCategorias = async () => {
    try {
        const res = await api.get("/categorias/listar-todas")
        return res.data

    } catch (error) {
        console.error("Error listando categorías:", error)

        throw new Error(
            error.response?.data?.msg || "Error al obtener categorías"
        )
    }
}