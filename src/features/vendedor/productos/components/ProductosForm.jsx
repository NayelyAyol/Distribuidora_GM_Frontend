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
        codigo: "",
        precioCompra: "",
        precioVenta: "",
        tipoIVA: "15",
        precioMayorista: "",
        cantidadMinimaMayorista: "",
        stock: "",
        stockMinimo: "",
        marca: "",
        unidadMedida: "",
        destacado: false,
        imagen: null
    })

    const fileInputRef = useRef(null)

    useEffect(() => {

        if (selectedProduct) {

            setForm({
                nombre: selectedProduct.nombre || "",
                descripcion: selectedProduct.descripcion || "",
                codigo: selectedProduct.codigo || "",
                precioCompra: selectedProduct.precioCompra || "",
                precioVenta: selectedProduct.precioVenta || "",
                tipoIVA: selectedProduct.tipoIVA || "15",
                precioMayorista: selectedProduct.precioMayorista || "",
                cantidadMinimaMayorista:
                    selectedProduct.cantidadMinimaMayorista || "",
                stock: selectedProduct.stock || "",
                stockMinimo: selectedProduct.stockMinimo || "",
                marca: selectedProduct.marca || "",
                unidadMedida: selectedProduct.unidadMedida || "",
                destacado: selectedProduct.destacado || false,
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
            codigo: "",
            precioCompra: "",
            precioVenta: "",
            tipoIVA: "15",
            precioMayorista: "",
            cantidadMinimaMayorista: "",
            stock: "",
            stockMinimo: "",
            marca: "",
            unidadMedida: "",
            destacado: false,
            imagen: null
        })

        setPreview(null)

        if (fileInputRef.current) {
            fileInputRef.current.value = ""
        }
    }

    const handleChange = (e) => {

        const { name, value, type, checked } = e.target

        setForm({
            ...form,
            [name]: type === "checkbox"
                ? checked
                : value
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

        if (!form.codigo.trim()) {
            toast.error("El código es obligatorio")
            return
        }

        if (Number(form.precioCompra) <= 0) {
            toast.error("Ingrese un precio de compra válido")
            return
        }

        if (Number(form.precioVenta) <= 0) {
            toast.error("Ingrese un precio de venta válido")
            return
        }

        if (Number(form.stock) < 0) {
            toast.error("Ingrese un stock válido")
            return
        }

        if (Number(form.stockMinimo) < 0) {
            toast.error("Ingrese un stock mínimo válido")
            return
        }

        if (!form.marca.trim()) {
            toast.error("La marca es obligatoria")
            return
        }

        if (!form.unidadMedida.trim()) {
            toast.error("La unidad de medida es obligatoria")
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

        if (setSelectedProduct) {
            setSelectedProduct(null)
        }

        if (onClose) {
            onClose()
        }
    }

    return (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 max-w-7xl mx-auto">

            <div className="h-[260px] md:h-[400px] xl:h-[640px] rounded-2xl overflow-hidden border-2 border-dashed border-gray-300 bg-emerald-50">

                <label className="flex h-full w-full cursor-pointer items-center justify-center hover:bg-emerald-100/40 transition">

                    {preview ? (

                        <img
                            src={preview}
                            alt="preview"
                            className="w-full h-full object-contain bg-white"
                        />

                    ) : (

                        <div className="flex flex-col items-center justify-center">

                            <MdFileUpload className="text-[70px] text-emerald-500" />

                            <p className="mt-3 text-sm text-gray-600">
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

            <div className="space-y-5">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

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
                            Código
                        </Label>

                        <Input
                            name="codigo"
                            value={form.codigo}
                            onChange={handleChange}
                            className={inputClass}
                        />
                    </div>

                </div>

                <div>

                    <Label className={`${labelClass} pb-2`}>
                        Descripción
                    </Label>

                    <textarea
                        name="descripcion"
                        value={form.descripcion}
                        onChange={handleChange}
                        className={`${inputClass} min-h-[100px] resize-none`}
                    />

                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                    <div>

                        <Label className={`${labelClass} pb-2`}>
                            Precio compra
                        </Label>

                        <Input
                            type="number"
                            name="precioCompra"
                            value={form.precioCompra}
                            onChange={handleChange}
                            className={inputClass}
                        />

                    </div>

                    <div>

                        <Label className={`${labelClass} pb-2`}>
                            Precio venta
                        </Label>

                        <Input
                            type="number"
                            name="precioVenta"
                            value={form.precioVenta}
                            onChange={handleChange}
                            className={inputClass}
                        />

                    </div>

                    <div>

                        <Label className={`${labelClass} pb-2`}>
                            IVA
                        </Label>

                        <select
                            name="tipoIVA"
                            value={form.tipoIVA}
                            onChange={handleChange}
                            className={inputClass}
                        >
                            <option value="0">0%</option>
                            <option value="15">15%</option>
                        </select>

                    </div>

                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    <div>

                        <Label className={`${labelClass} pb-2`}>
                            Precio mayorista
                        </Label>

                        <Input
                            type="number"
                            name="precioMayorista"
                            value={form.precioMayorista}
                            onChange={handleChange}
                            className={inputClass}
                        />

                    </div>

                    <div>

                        <Label className={`${labelClass} pb-2`}>
                            Cantidad mínima mayorista
                        </Label>

                        <Input
                            type="number"
                            name="cantidadMinimaMayorista"
                            value={form.cantidadMinimaMayorista}
                            onChange={handleChange}
                            className={inputClass}
                        />

                    </div>

                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

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

                    <div>

                        <Label className={`${labelClass} pb-2`}>
                            Stock mínimo
                        </Label>

                        <Input
                            type="number"
                            name="stockMinimo"
                            value={form.stockMinimo}
                            onChange={handleChange}
                            className={inputClass}
                        />

                    </div>

                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    <div>

                        <Label className={`${labelClass} pb-2`}>
                            Marca
                        </Label>

                        <Input
                            name="marca"
                            value={form.marca}
                            onChange={handleChange}
                            className={inputClass}
                        />

                    </div>

                    <div>

                        <Label className={`${labelClass} pb-2`}>
                            Unidad medida
                        </Label>

                        <Input
                            name="unidadMedida"
                            value={form.unidadMedida}
                            onChange={handleChange}
                            className={inputClass}
                        />

                    </div>

                </div>

                <div className="flex items-center gap-3 bg-white/70 p-3 rounded-xl border border-gray-200">

                    <input
                        type="checkbox"
                        name="destacado"
                        checked={form.destacado}
                        onChange={handleChange}
                        className="w-4 h-4 accent-emerald-600"
                    />

                    <Label className={labelClass}>
                        Producto destacado
                    </Label>

                </div>

                <div className="flex justify-end gap-3 pt-4">

                    <Button
                        variant="ghost"
                        className={`max-w-[120px] py-[22px] ${buttonOutlineClass}`}
                        onClick={onClose}
                    >
                        Cancelar
                    </Button>

                    <Button
                        onClick={handleSubmit}
                        className={`max-w-[140px] ${buttonPrimaryClass}`}
                    >
                        Aceptar
                    </Button>

                </div>

            </div>

        </div>
    )
}