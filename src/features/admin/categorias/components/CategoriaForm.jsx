import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { MdFileUpload } from "react-icons/md"
import { buttonOutlineClass } from "@/utils/styles"

import {
    inputClass,
    labelClass,
    buttonPrimaryClass
} from "@/utils/styles"

import { crearCategoria } from "../services/categoriaService"

import { toast } from "react-toastify"

export default function CategoriaForm({ selectedCategory, setSelectedCategory }) {

    const [form, setForm] = useState({
        nombre: "",
        descripcion: "",
        imagen: null
    })

    useEffect(() => {
        if (selectedCategory) {
            setForm({
                nombre: selectedCategory.nombre,
                descripcion: selectedCategory.descripcion,
                imagen: selectedCategory.imagen
            })
        } else {
            setForm({
                nombre: "",
                descripcion: "",
                imagen: null
            })
        }

    }, [selectedCategory])

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async () => {
        try {
            if (!form.nombre || !form.descripcion) {
                toast.error("Todos los campos son obligatorios")
                return
            }
            if (selectedCategory) {
                console.log("EDITANDO:", form)
            } else {
                await crearCategoria(form)
                toast.success("Categoría creada correctamente")
            }

            setSelectedCategory(null)
            setForm({
                nombre: "",
                descripcion: "",
                imagen: null
            })

        } catch (error) {
            console.error(error)
            toast.error(
                error.response?.data?.msg ||
                error.message ||
                "Error al crear categoría"
            )
        }
    }

    const handleImagen = (e) => {
        const file = e.target.files[0]

        if (!file) return


        if (!file.type.startsWith("image/")) {
            toast.error("Solo se permiten imágenes")
            return
        }

        setForm({
            ...form,
            imagen: file
        })
    }

    return (
        <div className="bg-white/80 backdrop-blur-xl border border-gray-200 shadow-lg rounded-2xl p-4">

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

                <div className="h-full w-full rounded-xl bg-emerald-50 flex items-center justify-center">

                    <label className="flex h-full w-full flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 cursor-pointer hover:bg-emerald-100/40 transition">

                        <MdFileUpload className="text-[60px] text-emerald-500" />

                        <p className="mt-2 text-sm text-gray-600">
                            Subir imagen
                        </p>

                        <input
                            type="file"
                            className="hidden"
                            onChange={handleImagen}
                        />

                    </label>

                </div>

                <div className="flex flex-col justify-center gap-4">

                    <h2 className="text-lg font-bold text-gray-800">
                        {selectedCategory ? "Editar categoría" : "Crear categoría"}
                    </h2>

                    <div>
                        <Label className={`${labelClass} pb-2`}>Nombre</Label>
                        <Input
                            name="nombre"
                            value={form.nombre}
                            onChange={handleChange}
                            className={inputClass}
                        />
                    </div>

                    <div>
                        <Label className={`${labelClass} pb-2`}>Descripción</Label>
                        <Input
                            name="descripcion"
                            value={form.descripcion}
                            onChange={handleChange}
                            className={inputClass}
                        />
                    </div>

                    <Button
                        onClick={handleSubmit}
                        className={buttonPrimaryClass}>
                        {selectedCategory ? "Actualizar" : "Aceptar"}
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