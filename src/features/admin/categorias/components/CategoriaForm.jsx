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

import { crearCategoria, actualizarCategoria } from "../services/categoriaService"

import { toast } from "react-toastify"

import { useRef } from "react";

export default function CategoriaForm({ selectedCategory, setSelectedCategory, onSuccess, categorias = [] }) {

    const [preview, setPreview] = useState(null)
    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        nombre: "",
        descripcion: "",
        imagen: null
    })

    const fileInputRef = useRef(null);

    useEffect(() => {
        if (selectedCategory) {

            const img =
                selectedCategory.imagen?.url ||
                selectedCategory.imagen ||
                "";

            setForm({
                nombre: selectedCategory.nombre,
                descripcion: selectedCategory.descripcion,
                imagen: img
            });

            setPreview(img);
        } else {
            setForm({
                nombre: "",
                descripcion: "",
                imagen: null
            });

            setPreview(null);
        }
    }, [selectedCategory]);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {

        if (e) e.preventDefault();

        try {
            setLoading(true);

            if (!form.nombre.trim() || !form.descripcion.trim()) {
                toast.error("Todos los campos son obligatorios");
                return;
            }

            if (!selectedCategory && !form.imagen) {
                toast.error("La imagen es obligatoria");
                return;
            }

            const existe = categorias.some((cat) => {
                const mismoNombre =
                    cat.nombre.trim().toLowerCase() ===
                    form.nombre.trim().toLowerCase();

                if (selectedCategory) {
                    return mismoNombre && cat._id !== selectedCategory._id;
                }

                return mismoNombre;
            });

            if (existe) {
                toast.error("La categoría ya existe");
                return;
            }
            const formData = new FormData();

            formData.append("nombre", form.nombre.trim());
            formData.append("descripcion", form.descripcion.trim());

            if (form.imagen instanceof File) {
                formData.append("imagen", form.imagen);
            }

            console.log(form.imagen instanceof File)
            if (selectedCategory) {
                await actualizarCategoria(selectedCategory._id, formData);
                toast.success("Categoría actualizada correctamente");
            } else {
                await crearCategoria(formData);
                if (onSuccess) await onSuccess();
                toast.success("Categoría creada correctamente");
            }

            setSelectedCategory(null);
            setForm({
                nombre: "",
                descripcion: "",
                imagen: null,
            });

            setPreview(null);

            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }

        } catch (error) {
            console.error(error);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleImagen = (e) => {

        const file = e.target.files[0];

        if (!file) return;

        if (!file.type.startsWith("image/")) {
            toast.error("Solo se permiten imágenes");
            return;
        }

        if (file.size > 2 * 1024 * 1024) {
            toast.error("La imagen no debe superar los 2MB");
            return;
        }
        console.log(file)

        setForm((prev) => ({
            ...prev,
            imagen: file
        }));

        const reader = new FileReader();

        reader.onloadend = () => {
            setPreview(reader.result);
        };

        reader.readAsDataURL(file);
    };

    return (
        <div className="bg-white/80 backdrop-blur-xl border border-gray-200 shadow-lg rounded-2xl p-4">

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

                <div className="min-h-[255px] h-full w-full rounded-xl overflow-hidden border-2 border-dashed border-gray-300 bg-emerald-50">

                    <label className="flex min-h-[255px] w-full cursor-pointer items-center justify-center p-8">

                        {preview ? (
                            <img
                                src={preview}
                                alt="preview"
                                className="max-h-[310px] w-full object-contain bg-emerald-50"
                            />
                        ) : (
                            <div className="flex flex-col items-center justify-center">
                                <MdFileUpload className="text-[60px] text-emerald-500" />

                                <p className="mt-2 text-sm text-gray-600">
                                    Subir imagen
                                </p>
                            </div>
                        )}

                        <input
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={handleImagen}
                            ref={fileInputRef}
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
                            maxlength={25}
                        />
                    </div>

                    <div>
                        <Label className={`${labelClass} pb-2`}>Descripción</Label>
                        <textarea
                            name="descripcion"
                            value={form.descripcion}
                            onChange={handleChange}
                            className={inputClass}
                            maxlength={100}
                        />
                    </div>

                    <Button
                        type="button"
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