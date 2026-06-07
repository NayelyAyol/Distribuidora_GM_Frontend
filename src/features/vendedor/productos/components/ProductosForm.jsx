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
            
            <div className="relative h-full min-h-[400px] rounded-2xl overflow-hidden border-2 border-dashed border-gray-300 bg-emerald-50">
                {selectedProduct && (
                    <button type="button" onClick={() => fileInputRef.current?.click()} className="absolute top-4 right-4 z-10 w-11 h-11 rounded-full bg-white/90 backdrop-blur-md shadow-lg border border-gray-200 flex items-center justify-center hover:scale-105 transition">
                        <FiEdit2 className="text-emerald-700 text-lg" />
                    </button>
                )}
                <label className="flex h-full w-full cursor-pointer items-center justify-center hover:bg-emerald-100/40 transition">
                    {preview ? <img src={preview} alt="preview" className="w-full h-full object-cover" /> : (
                        <div className="flex flex-col items-center justify-center">
                            <MdFileUpload className="text-[90px] text-emerald-500" />
                            <p className="mt-3 text-sm text-gray-600">Subir imagen</p>
                        </div>
                    )}
                    <input type="file" className="hidden" accept="image/*" onChange={handleImagen} ref={fileInputRef} />
                </label>
            </div>

            <div className="space-y-4">
                <div><Label className={`${labelClass} mb-3`}>Nombre *</Label>
                <Input name="nombre" 
                value={form.nombre} 
                onChange={handleChange} 
                className={inputClass}
                maxLength={40}
                /></div>
                <div><Label className={`${labelClass} mb-3`}>Código Interno *</Label>
                <Input name="codigo" 
                value={form.codigo} 
                onChange={handleChange} 
                className={inputClass} 
                maxLength={10}/></div>

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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><Label className={`${labelClass} mb-3`}>Proveedor *</Label>
                    <Input name="proveedor" 
                    value={form.proveedor} 
                    onChange={handleChange} 
                    className={inputClass} 
                    maxLength={30}
                    /></div>
                    <div><Label className={`${labelClass} mb-3`}>Marca *</Label>
                    <Input name="marca" 
                    value={form.marca} 
                    onChange={handleChange} 
                    className={inputClass} 
                    maxLength={25}
                    /></div>
                </div>

                <div><Label className={`${labelClass} mb-3`}>Descripción</Label>
                <textarea name="descripcion" 
                value={form.descripcion} 
                onChange={handleChange} 
                className={`${inputClass} min-h-[80px] resize-none`}
                maxLength={80}/></div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><Label 
                    className={`${labelClass} mb-3`}>Color</Label>
                    <Input name="color" 
                    value={form.color} 
                    onChange={handleChange} 
                    className={inputClass} 
                    maxLength={20}/></div>
                    <div><Label className={`${labelClass} mb-3`}>Material</Label>
                    <Input name="material" 
                    value={form.material} 
                    onChange={handleChange} 
                    className={inputClass}
                    maxLength={30}
                    /></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><Label className={`${labelClass} mb-3`}>Presentación</Label>
                    <Input name="presentacion" value={form.presentacion} 
                    maxLength={20}
                    onChange={handleChange} className={inputClass} /></div>
                    <div><Label className={`${labelClass} mb-3`}>Unidad Medida *</Label>
                    <Input name="unidadMedida" value={form.unidadMedida} onChange={handleChange} className={inputClass} maxLength={10} /></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><Label className={`${labelClass} mb-3`}>Precio Compra *</Label>
                    <Input type="number" 
                    name="precioCompra" 
                    value={form.precioCompra} 
                    onChange={handleChange} 
                    className={inputClass} 
                    min="0"
                    max="999999999"
                    onKeyDown={(e) => {
                        if (e.key === "-" || e.key === "e") {
                        e.preventDefault();
                    }
                    }}
                    onInput={(e) => {
                        if (e.target.value.length > 9) e.target.value = e.target.value.slice(0, 9);
                    }}
                    /></div>
                    <div><Label className={`${labelClass} mb-3`}>Precio Venta *</Label>
                    <Input type="number" 
                    name="precioVenta" 
                    value={form.precioVenta} 
                    onChange={handleChange} 
                    className={inputClass}
                    min="0"
                    max="999999999"
                    onKeyDown={(e) => {
                    if (e.key === "-" || e.key === "e") {
                        e.preventDefault();
                    }
                    }}
                    onInput={(e) => {
                        if (e.target.value.length > 9) e.target.value = e.target.value.slice(0, 9);
                    }}
                    /></div>
                </div>

                <div>
                    <Label className={`${labelClass} mb-3`}>Precio Mayorista</Label>
                    <Input type="number" 
                    name="precioMayorista" 
                    value={form.precioMayorista} 
                    onChange={handleChange} 
                    className={inputClass} 
                    min="0"
                    max="999999999"
                    onKeyDown={(e) => {
                        if (e.key === "-" || e.key === "e") {
                            e.preventDefault();
                        }
                    }}
                    onInput={(e) => {
                        if (e.target.value.length > 9) e.target.value = e.target.value.slice(0, 9);
                    }}
                    />
                </div>


                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><Label className={`${labelClass} mb-3`}>Stock *</Label>
                    <Input type="number" 
                    name="stock" 
                    value={form.stock} 
                    onChange={handleChange} 
                    className={inputClass} 
                    min="0"
                    onInput={(e) => {
                        if (e.target.value.length > 6) e.target.value = e.target.value.slice(0, 6);
                    }}
                    onKeyDown={(e) => {
                    if (e.key === "-" || e.key === "e") {
                        e.preventDefault();
                    }
                    }}/></div>
                    <div><Label className={`${labelClass} mb-3`}>Stock Mínimo *</Label>
                    <Input type="number" 
                    name="stockMinimo" 
                    value={form.stockMinimo} 
                    onChange={handleChange} 
                    className={inputClass} 
                    min="0"
                    onInput={(e) => {
                        if (e.target.value.length > 5) e.target.value = e.target.value.slice(0, 5);
                    }}
                    onKeyDown={(e) => {
                    if (e.key === "-" || e.key === "e") {
                        e.preventDefault();
                    }
                    }}/></div>
                </div>

                <div className="flex items-center gap-3 bg-white/70 p-3 rounded-xl border border-gray-200">
                    <input type="checkbox" name="destacado" checked={form.destacado} onChange={handleChange} className="w-5 h-5 accent-emerald-600" />
                    <Label className={labelClass}>Producto destacado</Label>
                </div>

                <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4">
                    <Button variant="ghost" className={`w-full sm:w-[120px] py-[22px] ${buttonOutlineClass}`} onClick={onClose}>Cancelar</Button>
                    <Button onClick={submitForm} className={`w-full sm:w-[140px] ${buttonPrimaryClass}`}>Aceptar</Button>
                </div>
            </div>
        </div>
    )
}