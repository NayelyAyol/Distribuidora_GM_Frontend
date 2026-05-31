import { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";

export const useProductoForm = (selectedProduct, onSave, onClose, setSelectedProduct) => {
    const [preview, setPreview] = useState(null);
    const fileInputRef = useRef(null);

    const [form, setForm] = useState({
        nombre: "", descripcion: "", codigo: "", codigoBarras: "", 
        precioCompra: "", precioVenta: "", precioMayorista: "", 
        cantidadMinimaMayorista: "", stock: "", stockMinimo: "", 
        marca: "", proveedor: "", unidadMedida: "", color: "", 
        material: "", tamanio: "", presentacion: "", 
        categoria: "", destacado: false, imagen: null
    });

    useEffect(() => {
        if (selectedProduct) {
            setForm({
                ...selectedProduct,
                categoria: selectedProduct.categoria?._id || selectedProduct.categoria || "",
                imagen: selectedProduct.imagen?.url || null
            });
            setPreview(selectedProduct.imagen?.url);
        } else {
            resetForm();
        }
    }, [selectedProduct]);

    const resetForm = () => {
        setForm({
            nombre: "", descripcion: "", codigo: "", codigoBarras: "", 
            precioCompra: "", precioVenta: "", precioMayorista: "", 
            cantidadMinimaMayorista: "", stock: "", stockMinimo: "", 
            marca: "", proveedor: "", unidadMedida: "", color: "", 
            material: "", tamanio: "", presentacion: "", 
            categoria: "", destacado: false, imagen: null
        });
        setPreview(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm(prev => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    };

    const handleImagen = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        if (!file.type.startsWith("image/")) return toast.error("Solo se permiten imágenes");
        setForm(prev => ({ ...prev, imagen: file }));
        const reader = new FileReader();
        reader.onloadend = () => setPreview(reader.result);
        reader.readAsDataURL(file);
    };

    const submitForm = async () => {
        if (!form.nombre?.trim() || !form.codigo?.trim() || !form.precioCompra || 
            !form.precioVenta || form.stock === "" || form.stockMinimo === "" || 
            !form.marca?.trim() || !form.proveedor?.trim() || !form.unidadMedida?.trim() || 
            !form.categoria?.trim()) {
            return toast.error("Completa todos los campos obligatorios");
        }

        try {
            const formData = new FormData();
            Object.entries(form).forEach(([key, val]) => {
                if (key === 'imagen' && val instanceof File) {
                    formData.append("imagen", val);
                } else if (val !== null && val !== undefined && val !== "") {
                    formData.append(key, val);
                }
            });
            await onSave(formData);
            toast.success("Producto guardado correctamente");
            if (onClose) onClose();
        } catch (err) {
            toast.error(err.response?.data?.msg || "Error al guardar");
        }
    };

    return { form, preview, handleChange, handleImagen, submitForm, fileInputRef };
};