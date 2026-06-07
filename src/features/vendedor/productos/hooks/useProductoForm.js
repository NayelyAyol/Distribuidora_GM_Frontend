import { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { crearProducto } from "../services/productoService";

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
            categoria: "", destacado: false, imagen: null,
            tipoIVA: ""
        });
        setPreview(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const camposSoloTexto = ['nombre', 'marca', 'proveedor', 'color', 'material'];

        if (camposSoloTexto.includes(name)) {
            const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/;
            if (!regex.test(value)) return; 
        }
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
        if (Number(form.precioVenta) <= Number(form.precioCompra)) {
            return toast.error("El precio de venta debe ser mayor al de compra");
        }
        
        if (Number(form.stock) < 0 || Number(form.stockMinimo) < 0) {
            return toast.error("Los valores de stock no pueden ser negativos");
        }

        const camposRequeridos = [
            'nombre', 'codigo', 'precioCompra', 'precioVenta', 'stock', 
            'stockMinimo', 'marca', 'proveedor', 'unidadMedida', 'categoria', 'tipoIVA'
        ];
        
        const faltanCampos = camposRequeridos.some(campo => {
            const valor = form[campo];
            return valor === null || valor === undefined || valor === "";
        });

        if (faltanCampos) {
            return toast.error("Por favor, completa todos los campos obligatorios");
        }
        
        try {
// ... dentro de submitForm, después de crear el formData
const formData = new FormData();
Object.entries(form).forEach(([key, val]) => {
    if (key === 'imagen' && val instanceof File) {
        formData.append("imagen", val);
    } else if (val !== null && val !== undefined && val !== "") {
        formData.append(key, val);
    }
});

// AÑADE ESTO PARA DEPURAR:
console.log("--- CONTENIDO DEL FORMDATA ---");
for (let pair of formData.entries()) {
    console.log(pair[0] + ': ' + pair[1]);
}
// -----------------------------
            
            const funcionDeGuardado = onSave || crearProducto;
            const respuesta = await funcionDeGuardado(formData);
            
            console.log("RESPUESTA CREAR PRODUCTO:", respuesta);

            const productoCreado = respuesta?.producto || respuesta;

            if (!productoCreado || !productoCreado._id) {
                throw new Error("El servidor no devolvió el ID del producto creado");
            }
            toast.success(respuesta.msg || "Producto guardado correctamente");
            
            if (onClose) {
                onClose();
            }
        } catch (err) {
            console.error("Error en submitForm:", err);
            toast.error(err.message || "Error al guardar el producto");
        }
    };

    return { form, preview, handleChange, handleImagen, submitForm, fileInputRef };
};