import api from "@/utils/api"

export const crearCategoria = async (data) => {
    try {
        const formData = new FormData()

        formData.append("nombre", data.nombre)
        formData.append("descripcion", data.descripcion)

        if (data.imagen) {
            formData.append("imagen", data.imagen)
        }

        const res = await api.post("/admin/categorias", formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })

        return res.data

    } catch (error) {
        console.error("Error creando categoría:", error)

        throw new Error(
            error.response?.data?.msg || "Error al crear categoría"
        )
    }
}

export const listarCategorias = async () => {
    try {
        const res = await api.get("/admin/listar-todas")
        return res.data

    } catch (error) {
        console.error("Error listando categorías:", error)

        throw new Error(
            error.response?.data?.msg || "Error al obtener categorías"
        )
    }
}