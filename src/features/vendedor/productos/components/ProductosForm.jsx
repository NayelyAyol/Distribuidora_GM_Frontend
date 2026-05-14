import { useEffect, useRef, useState } from "react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

import {
    inputClass,
    labelClass,
    buttonPrimaryClass,
    buttonOutlineClass
} from "@/utils/styles"

import { MdFileUpload } from "react-icons/md"

import { toast } from "react-toastify"

export default function ProductoForm({
    selectedProduct,
    setSelectedProduct,
    onClose,
    onSave
}) {

    const [preview, setPreview] = useState(null)

    const [form, setForm] = useState({
        nombre: "",
        descripcion: "",
        precio: "",
        stock: "",
        imagen: null
    })

    const fileInputRef = useRef(null)

    useEffect(() => {

        if (selectedProduct) {

            setForm({
                nombre: selectedProduct.nombre || "",
                descripcion: selectedProduct.descripcion || "",
                precio: selectedProduct.precio || "",
                stock: selectedProduct.stock || "",
                imagen: selectedProduct.imagen || null
            })

            setPreview(selectedProduct.imagen)

        } else {

            resetForm()
        }

    }, [selectedProduct])

    const resetForm = () => {

        setForm({
            nombre: "",
            descripcion: "",
            precio: "",
            stock: "",
            imagen: null
        })

        setPreview(null)

        if (fileInputRef.current) {
            fileInputRef.current.value = ""
        }
    }

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleImagen = (e) => {

        const file = e.target.files[0]

        if (!file) return

        if (!file.type.startsWith("image/")) {
            toast.error("Solo se permiten imágenes")
            return
        }

        if (file.size > 2 * 1024 * 1024) {
            toast.error("La imagen no debe superar los 2MB")
            return
        }

        setForm((prev) => ({
            ...prev,
            imagen: file
        }))

        const reader = new FileReader()

        reader.onloadend = () => {
            setPreview(reader.result)
        }

        reader.readAsDataURL(file)
    }

    const handleSubmit = () => {

        if (!form.nombre.trim()) {
            toast.error("El nombre es obligatorio")
            return
        }

        if (!form.descripcion.trim()) {
            toast.error("La descripción es obligatoria")
            return
        }

        if (!form.precio || Number(form.precio) <= 0) {
            toast.error("Ingrese un precio válido")
            return
        }

        if (!form.stock || Number(form.stock) < 0) {
            toast.error("Ingrese un stock válido")
            return
        }

        if (!selectedProduct && !form.imagen) {
            toast.error("La imagen es obligatoria")
            return
        }

        onSave(form)

        toast.success(
            selectedProduct
                ? "Producto actualizado"
                : "Producto creado"
        )

        resetForm()

        setSelectedProduct(null)

        onClose()
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

            <div className="h-[320px] rounded-2xl overflow-hidden border-2 border-dashed border-gray-300 bg-white/70">

                <label className="flex h-full w-full cursor-pointer items-center justify-center hover:bg-emerald-100/40 transition">

                    {preview ? (

                        <img
                            src={preview}
                            alt="preview"
                            className="w-full h-full object-cover"
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

                <div>

                    <Label className={`${labelClass} pb-2`}>
                        Nombre
                    </Label>

                    <Input
                        name="nombre"
                        value={form.nombre}
                        onChange={handleChange}
                        className={inputClass}
                    />

                </div>

                <div>

                    <Label className={`${labelClass} pb-2`}>
                        Descripción
                    </Label>

                    <Input
                        name="descripcion"
                        value={form.descripcion}
                        onChange={handleChange}
                        className={inputClass}
                    />

                </div>

                <div className="grid grid-cols-2 gap-4">

                    <div>

                        <Label className={`${labelClass} pb-2`}>
                            Precio
                        </Label>

                        <Input
                            type="number"
                            name="precio"
                            value={form.precio}
                            onChange={handleChange}
                            className={inputClass}
                        />

                    </div>

                    <div>

                        <Label className={`${labelClass} pb-2`}>
                            Stock
                        </Label>

                        <Input
                            type="number"
                            name="stock"
                            value={form.stock}
                            onChange={handleChange}
                            className={inputClass}
                        />

                    </div>

                </div>

                <div className="flex justify-end gap-3 pt-2">

                    <Button
                        variant="ghost"
                        className={`max-w-[100px] py-[22px] ${buttonOutlineClass}`}
                        onClick={onClose}
                    >
                        Cancelar
                    </Button>

                    <Button
                        onClick={handleSubmit}
                        className={`max-w-[100px] ${buttonPrimaryClass}`}
                    >
                        {selectedProduct
                            ? "Actualizar"
                            : "Aceptar"}
                    </Button>

                </div>

            </div>

        </div>
    )
}