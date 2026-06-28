import { useState, useEffect, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { MdFileUpload } from "react-icons/md"
import { buttonOutlineClass, inputClass, labelClass, buttonPrimaryClass } from "@/utils/styles"
import { crearCategoria, actualizarCategoria } from "../services/categoriaService"
import { toast } from "react-toastify"

export default function CategoriaForm({ selectedCategory, setSelectedCategory, onSuccess, categorias = [] }) {

    const [preview, setPreview] = useState(null)
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState({ nombre: "", imagen: "" })

    const [form, setForm] = useState({
        nombre: "",
        descripcion: "",
        imagen: null
    })

    const fileInputRef = useRef(null)

    useEffect(() => {
        if (selectedCategory) {
            const img = selectedCategory.imagen?.url || selectedCategory.imagen || ""
            setForm({
                nombre: selectedCategory.nombre,
                descripcion: selectedCategory.descripcion,
                imagen: img
            })
            setPreview(img)
        } else {
            setForm({ nombre: "", descripcion: "", imagen: null })
            setPreview(null)
        }
        setErrors({ nombre: "", imagen: "" }) // limpiar al cambiar modo
    }, [selectedCategory])

    const handleChange = (e) => {
        const { name, value } = e.target
        setForm(prev => ({ ...prev, [name]: value }))
        // limpiar error del campo al escribir
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }))
    }

    const handleSubmit = async (e) => {
        if (e) e.preventDefault()

        const newErrors = {}

        if (!form.nombre.trim()) {
            newErrors.nombre = "El nombre es obligatorio"
        } else if (form.nombre.trim().length < 3) {
            newErrors.nombre = "El nombre debe tener mínimo 3 caracteres"
        } else {
            const existe = categorias.some((cat) => {
                const mismoNombre = cat.nombre.trim().toLowerCase() === form.nombre.trim().toLowerCase()
                return selectedCategory
                    ? mismoNombre && cat._id !== selectedCategory._id
                    : mismoNombre
            })
            if (existe) newErrors.nombre = "La categoría ya existe"
        }

        if (!selectedCategory && !form.imagen) {
            newErrors.imagen = "La imagen es obligatoria"
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
            return
        }

        try {
            setLoading(true)

            const formData = new FormData()
            formData.append("nombre", form.nombre.trim())
            formData.append("descripcion", form.descripcion.trim())
            if (form.imagen instanceof File) formData.append("imagen", form.imagen)

            if (selectedCategory) {
                await actualizarCategoria(selectedCategory._id, formData)
                toast.success("Categoría actualizada correctamente")
            } else {
                await crearCategoria(formData)
                toast.success("Categoría creada correctamente")
            }

            if (onSuccess) await onSuccess()
            setSelectedCategory(null)
            setForm({ nombre: "", descripcion: "", imagen: null })
            setPreview(null)
            setErrors({ nombre: "", imagen: "" })
            if (fileInputRef.current) fileInputRef.current.value = ""

        } catch (error) {
            toast.error(error.message || "Error al procesar la categoría")
        } finally {
            setLoading(false)
        }
    }

    const handleImagen = (e) => {
        const file = e.target.files[0]
        if (!file) return

        if (!file.type.startsWith("image/")) {
            setErrors(prev => ({ ...prev, imagen: "Solo se permiten imágenes" }))
            return
        }
        if (file.size > 2 * 1024 * 1024) {
            setErrors(prev => ({ ...prev, imagen: "La imagen no debe superar los 2MB" }))
            return
        }

        setErrors(prev => ({ ...prev, imagen: "" }))
        setForm(prev => ({ ...prev, imagen: file }))

        const reader = new FileReader()
        reader.onloadend = () => setPreview(reader.result)
        reader.readAsDataURL(file)
    }

    return (
        <div className="bg-white/80 backdrop-blur-xl border border-gray-200 shadow-lg rounded-2xl p-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

                <div className="flex flex-col gap-1">
                    <div className={`min-h-[255px] h-full w-full rounded-xl overflow-hidden border-2 border-dashed bg-emerald-50 transition-colors
                        ${errors.imagen ? "border-red-400 bg-red-50" : "border-gray-300"}`}>
                        <label className="flex min-h-[255px] w-full cursor-pointer items-center justify-center p-8">
                            {preview ? (
                                <img src={preview} alt="preview" className="max-h-[310px] w-full object-contain" />
                            ) : (
                                <div className="flex flex-col items-center justify-center">
                                    <MdFileUpload className={`text-[60px] ${errors.imagen ? "text-red-400" : "text-emerald-500"}`} />
                                    <p className="mt-2 text-sm text-gray-600">Subir imagen</p>
                                    {errors.imagen && (
                                        <p className="mt-2 text-sm text-red-500 font-medium">{errors.imagen}</p>
                                    )}
                                </div>
                            )}
                            <input type="file" className="hidden" accept="image/*" onChange={handleImagen} ref={fileInputRef} />
                        </label>
                    </div>
                </div>

                <div className="flex flex-col justify-center gap-4">
                    <h2 className="text-lg font-bold text-gray-800">
                        {selectedCategory ? "Editar categoría" : "Crear categoría"}
                    </h2>

                    <div className="space-y-1">
                        <Label className={`${labelClass} pb-2`}>Nombre</Label>
                        <Input
                            name="nombre"
                            value={form.nombre}
                            onChange={handleChange}
                            className={inputClass}
                            maxLength={30}
                            placeholder="Mínimo 3 caracteres"
                        />
                        {errors.nombre && (
                            <p className="text-red-500 text-sm font-medium">{errors.nombre}</p>
                        )}
                    </div>

                    <div className="space-y-1">
                        <Label className={`${labelClass} pb-2`}>Descripción</Label>
                        <textarea
                            name="descripcion"
                            value={form.descripcion}
                            onChange={handleChange}
                            className={inputClass}
                            maxLength={70}
                            placeholder="Opcional (máx. 70 caracteres)"
                        />
                    </div>

                    <Button
                        type="button"
                        onClick={handleSubmit}
                        className={buttonPrimaryClass}
                        disabled={loading}
                    >
                        {loading ? "Procesando..." : selectedCategory ? "Actualizar" : "Aceptar"}
                    </Button>

                    {selectedCategory && (
                        <Button
                            variant="ghost"
                            className={`${buttonOutlineClass} py-5`}
                            onClick={() => setSelectedCategory(null)}
                        >
                            Cancelar
                        </Button>
                    )}
                </div>
            </div>
        </div>
    )
}