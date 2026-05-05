import api from "@/utils/api"

export const crearCategoria = async (data) => {
    const formData = new FormData()

    formData.append("nombre", data.nombre)
    formData.append("descripcion", data.descripcion)

    if (data.imagen) {
        formData.append("imagen", data.imagen)
    }

    const res = await api.post("/categorias", formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })

    return res.data
}