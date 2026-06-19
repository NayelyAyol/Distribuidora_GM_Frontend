import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { inputClass, labelClass, buttonPrimaryClass, buttonOutlineClass } from "@/utils/styles"
import { MdFileUpload } from "react-icons/md"
import { FiEdit2 } from "react-icons/fi"
import { useProductoForm } from "../hooks/useProductoForm"
import { listarCategoriasActivas } from "../../../admin/categorias/services/categoriaService"
import { useEffect, useState } from "react"

export default function ProductoForm({ selectedProduct, setSelectedProduct, onClose, onSave }) {
    const { form, preview, handleChange, handleImagen, submitForm, fileInputRef } =
        useProductoForm(selectedProduct, onSave, onClose, setSelectedProduct);

    const [categorias, setCategorias] = useState([])

    useEffect(() => {
        const cargarCategorias = async () => {
            const data = await listarCategoriasActivas();
            setCategorias(data || []);
        };
        cargarCategorias();
    }, []);

    return (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 max-w-7xl mx-auto items-start">

            {/* Imagen */}
            <div className="relative h-full min-h-[400px] rounded-2xl overflow-hidden border-2 border-dashed border-gray-300 bg-emerald-50">
                {selectedProduct && (
                    <button type="button" onClick={() => fileInputRef.current?.click()} className="absolute top-4 right-4 z-10 w-11 h-11 rounded-full bg-white/90 backdrop-blur-md shadow-lg border border-gray-200 flex items-center justify-center hover:scale-105 transition">
                        <FiEdit2 className="text-emerald-700 text-lg" />
                    </button>
                )}
                <label className="flex h-full w-full cursor-pointer items-center justify-center hover:bg-emerald-100/40 transition">
                    {preview ? (
                        <img src={preview} alt="preview" className="w-full h-full object-cover" />
                    ) : (
                        <div className="flex flex-col items-center justify-center">
                            <MdFileUpload className="text-[90px] text-emerald-500" />
                            <p className="mt-3 text-sm text-gray-600">Subir imagen</p>
                        </div>
                    )}
                    <input type="file" className="hidden" accept="image/*" onChange={handleImagen} ref={fileInputRef} />
                </label>
            </div>

            {/* Campos */}
            <div className="space-y-4">

                {/* Nombre */}
                <div>
                    <Label className={`${labelClass} mb-3`}>Nombre *</Label>
                    <Input
                        name="nombre"
                        value={form.nombre}
                        onChange={handleChange}
                        className={inputClass}
                        maxLength={40}
                        placeholder="Mínimo 3 caracteres"
                    />
                </div>

                {/* Código interno */}
                <div>
                    <Label className={`${labelClass} mb-3`}>Código Interno *</Label>
                    <Input
                        name="codigo"
                        value={form.codigo}
                        onChange={handleChange}
                        className={inputClass}
                        maxLength={10}
                        placeholder="Ej: ABC-001 (mín. 3 caracteres)"
                    />
                </div>

                {/* Código de barras */}
                <div>
                    <Label className={`${labelClass} mb-3`}>Código de Barras</Label>
                    <Input
                        name="codigoBarras"
                        value={form.codigoBarras}
                        onChange={handleChange}
                        className={inputClass}
                        maxLength={14}
                        placeholder="8 a 14 dígitos (opcional)"
                    />
                </div>

                {/* Tipo IVA y Categoría */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <Label className={`${labelClass} mb-3`}>Tipo de IVA *</Label>
                        <div className="flex items-center bg-white border border-gray-200 rounded-xl px-3 py-2 shadow-sm w-full">
                            <select
                                name="tipoIVA"
                                value={form.tipoIVA}
                                onChange={handleChange}
                                className="w-full bg-transparent text-sm text-gray-700 focus:outline-none cursor-pointer"
                            >
                                <option value="">Seleccione IVA</option>
                                <option value="0%">0%</option>
                                <option value="15%">15%</option>
                                <option value="Exento">Exento</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <Label className={`${labelClass} mb-3`}>Categoría *</Label>
                        <div className="flex items-center bg-white border border-gray-200 rounded-xl px-3 py-2 shadow-sm w-full">
                            <select
                                name="categoria"
                                value={form.categoria}
                                onChange={handleChange}
                                className="w-full bg-transparent text-sm text-gray-700 focus:outline-none cursor-pointer"
                            >
                                <option value="">Seleccione una categoría</option>
                                {categorias.map((cat) => (
                                    <option key={cat._id} value={cat._id}>
                                        {cat.nombre}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Proveedor y Marca */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <Label className={`${labelClass} mb-3`}>Proveedor *</Label>
                        <Input
                            name="proveedor"
                            value={form.proveedor}
                            onChange={handleChange}
                            className={inputClass}
                            maxLength={40}
                            placeholder="Mínimo 2 caracteres"
                        />
                    </div>
                    <div>
                        <Label className={`${labelClass} mb-3`}>Marca *</Label>
                        <Input
                            name="marca"
                            value={form.marca}
                            onChange={handleChange}
                            className={inputClass}
                            maxLength={20}
                            placeholder="Mínimo 2 caracteres"
                        />
                    </div>
                </div>

                {/* Unidad de medida */}
                <div>
                    <Label className={`${labelClass} mb-3`}>Unidad de Medida *</Label>
                    <div className="flex items-center bg-white border border-gray-200 rounded-xl px-3 py-2 shadow-sm w-full">
                        <select
                            name="unidadMedida"
                            value={form.unidadMedida}
                            onChange={handleChange}
                            className="w-full bg-transparent text-sm text-gray-700 focus:outline-none cursor-pointer"
                        >
                            <option value="">Seleccione unidad</option>
                            <option value="Unidad">Unidad</option>
                            <option value="Caja">Caja</option>
                            <option value="Litro">Litro</option>
                            <option value="Kilogramo">Kilogramo</option>
                            <option value="Paquete">Paquete</option>
                        </select>
                    </div>
                </div>

                {/* Descripción */}
                <div>
                    <Label className={`${labelClass} mb-3`}>Descripción</Label>
                    <textarea
                        name="descripcion"
                        value={form.descripcion}
                        onChange={handleChange}
                        className={`${inputClass} min-h-[80px] resize-none`}
                        maxLength={80}
                        placeholder="Máximo 80 caracteres (opcional)"
                    />
                </div>

                {/* Color y Material */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <Label className={`${labelClass} mb-3`}>Color</Label>
                        <Input
                            name="color"
                            value={form.color}
                            onChange={handleChange}
                            className={inputClass}
                            maxLength={20}
                            placeholder="Opcional"
                        />
                    </div>
                    <div>
                        <Label className={`${labelClass} mb-3`}>Material</Label>
                        <Input
                            name="material"
                            value={form.material}
                            onChange={handleChange}
                            className={inputClass}
                            maxLength={30}
                            placeholder="Opcional"
                        />
                    </div>
                </div>

                {/* Tamaño y Presentación */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <Label className={`${labelClass} mb-3`}>Tamaño</Label>
                        <Input
                            name="tamanio"
                            value={form.tamanio}
                            onChange={handleChange}
                            className={inputClass}
                            maxLength={15}
                            placeholder="Opcional"
                        />
                    </div>
                    <div>
                        <Label className={`${labelClass} mb-3`}>Presentación</Label>
                        <Input
                            name="presentacion"
                            value={form.presentacion}
                            onChange={handleChange}
                            className={inputClass}
                            maxLength={20}
                            placeholder="Opcional"
                        />
                    </div>
                </div>

                {/* Precios */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <Label className={`${labelClass} mb-3`}>Precio Compra *</Label>
                        <Input
                            type="number"
                            name="precioCompra"
                            value={form.precioCompra}
                            onChange={handleChange}
                            className={inputClass}
                            min="0.01"
                            placeholder="Mayor a 0"
                            onKeyDown={(e) => { if (e.key === "-" || e.key === "e") e.preventDefault() }}
                            onInput={(e) => { if (e.target.value.length > 9) e.target.value = e.target.value.slice(0, 9) }}
                        />
                    </div>
                    <div>
                        <Label className={`${labelClass} mb-3`}>Precio Venta *</Label>
                        <Input
                            type="number"
                            name="precioVenta"
                            value={form.precioVenta}
                            onChange={handleChange}
                            className={`${inputClass} placeholder:text-sm`}
                            min="0.01"
                            placeholder="Mayor al precio de compra"
                            onKeyDown={(e) => { if (e.key === "-" || e.key === "e") e.preventDefault() }}
                            onInput={(e) => { if (e.target.value.length > 9) e.target.value = e.target.value.slice(0, 9) }}
                        />
                    </div>
                </div>

                {/* Precio mayorista y cantidad mínima mayorista */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <Label className={`${labelClass} mb-3`}>Precio Mayorista</Label>
                        <Input
                            type="number"
                            name="precioMayorista"
                            value={form.precioMayorista}
                            onChange={handleChange}
                            className={`${inputClass} placeholder:text-sm`}
                            min="0.01"
                            placeholder="Entre compra y venta"
                            onKeyDown={(e) => { if (e.key === "-" || e.key === "e") e.preventDefault() }}
                            onInput={(e) => { if (e.target.value.length > 9) e.target.value = e.target.value.slice(0, 9) }}
                        />
                    </div>
                    <div>
                        <Label className={`${labelClass} mb-3`}>Cantidad Mínima Mayorista</Label>
                        <Input
                            type="number"
                            name="cantidadMinimaMayorista"
                            value={form.cantidadMinimaMayorista}
                            onChange={handleChange}
                            className={`${inputClass} placeholder:text-sm`}
                            min="1"
                            placeholder="Entero mayor a 0 (opcional)"
                            onKeyDown={(e) => { if (e.key === "-" || e.key === "e" || e.key === ".") e.preventDefault() }}
                            onInput={(e) => { if (e.target.value.length > 6) e.target.value = e.target.value.slice(0, 6) }}
                        />
                    </div>
                </div>

                {/* Stock */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <Label className={`${labelClass} mb-3`}>Stock *</Label>
                        <Input
                            type="number"
                            name="stock"
                            value={form.stock}
                            onChange={handleChange}
                            className={inputClass}
                            min="0"
                            placeholder="Entero no negativo"
                            onKeyDown={(e) => { if (e.key === "-" || e.key === "e" || e.key === ".") e.preventDefault() }}
                            onInput={(e) => { if (e.target.value.length > 6) e.target.value = e.target.value.slice(0, 6) }}
                        />
                    </div>
                    <div>
                        <Label className={`${labelClass} mb-3`}>Stock Mínimo *</Label>
                        <Input
                            type="number"
                            name="stockMinimo"
                            value={form.stockMinimo}
                            onChange={handleChange}
                            className={inputClass}
                            min="0"
                            placeholder="Entero no negativo"
                            onKeyDown={(e) => { if (e.key === "-" || e.key === "e" || e.key === ".") e.preventDefault() }}
                            onInput={(e) => { if (e.target.value.length > 5) e.target.value = e.target.value.slice(0, 5) }}
                        />
                    </div>
                </div>

                {/* Destacado */}
                <div className="flex items-center gap-3 bg-white/70 p-3 rounded-xl border border-gray-200">
                    <input
                        type="checkbox"
                        name="destacado"
                        checked={form.destacado}
                        onChange={handleChange}
                        className="w-5 h-5 accent-emerald-600"
                    />
                    <Label className={labelClass}>Producto destacado</Label>
                </div>

                {/* Botones */}
                <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4">
                    <Button
                        variant="ghost"
                        className={`w-full sm:w-[120px] py-[22px] ${buttonOutlineClass}`}
                        onClick={onClose}
                    >
                        Cancelar
                    </Button>
                    <Button
                        onClick={submitForm}
                        className={`w-full sm:w-[140px] ${buttonPrimaryClass}`}
                    >
                        Aceptar
                    </Button>
                </div>

            </div>
        </div>
    )
}