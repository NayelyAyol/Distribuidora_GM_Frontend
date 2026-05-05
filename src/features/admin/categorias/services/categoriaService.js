import api from "@/utils/api"

export const crearCategoria = async (data) => {
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
}

export const listarCategorias = async () => {
    const res = await api.get("/admin/listar-todas")
    return res.data
}