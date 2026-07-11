import { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { crearProducto } from "../services/productoService";

const UNIDADES_VALIDAS = ["Unidad", "Caja", "Litro", "Kilogramo", "Paquete"];
const IVA_VALIDOS = ["15%", "0%", "Exento"];

const FORM_INICIAL = {
    nombre: "", descripcion: "", codigo: "", codigoBarras: "",
    precioCompra: "", precioVenta: "", precioMayorista: "",
    cantidadMinimaMayorista: "", stock: "", stockMinimo: "",
    marca: "", proveedor: "", unidadMedida: "", color: "",
    material: "", tamanio: "", presentacion: "",
    categoria: "", tipoIVA: "", destacado: false, imagen: null
};

export const useProductoForm = (selectedProduct, onSave, onClose, setSelectedProduct) => {
    const [preview, setPreview] = useState(null);
    const fileInputRef = useRef(null);
    const [form, setForm] = useState(FORM_INICIAL);
    const [errors, setErrors] = useState({});

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
        setErrors({});
    }, [selectedProduct]);

    const resetForm = () => {
        setForm(FORM_INICIAL);
        setPreview(null);
        setErrors({});
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const clearError = (name) => {
        setErrors(prev => (prev[name] ? { ...prev, [name]: "" } : prev));
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        const camposTextoLibre = ['nombre', 'marca', 'proveedor', 'color', 'material', 'presentacion']
        if (camposTextoLibre.includes(name)) {
            if (!/^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s.,#/\-]*$/.test(value)) return
        }

        if (name === 'codigo') {
            if (!/^[A-Z0-9-]*$/i.test(value)) return
            setForm(prev => ({ ...prev, codigo: value.toUpperCase() }))
            clearError(name)
            return
        }

        if (name === 'codigoBarras') {
            if (!/^\d*$/.test(value)) return
            if (value.length > 14) return
        }

        if (name === 'tamanio' && value.length > 15) return

        clearError(name)
        setForm(prev => ({ ...prev, [name]: type === "checkbox" ? checked : value }))
    };

    const handleImagen = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        if (!file.type.startsWith("image/")) return toast.error("Solo se permiten imágenes");
        clearError("imagen");                    
        setForm(prev => ({ ...prev, imagen: file }));
        const reader = new FileReader();
        reader.onloadend = () => setPreview(reader.result);
        reader.readAsDataURL(file);
    };

    const validate = () => {
        const e = {};

        // Nombre
        if (!form.nombre?.trim()) e.nombre = "El nombre del producto es obligatorio";
        else if (form.nombre.trim().length < 3) e.nombre = "El nombre debe tener mínimo 3 caracteres";

        // Código interno
        if (!form.codigo?.trim()) e.codigo = "El código interno del producto es obligatorio";
        else if (form.codigo.trim().length < 3) e.codigo = "El código debe tener mínimo 3 caracteres";
        else if (!/^[A-Z0-9-]+$/.test(form.codigo.trim())) e.codigo = "El código solo puede contener letras, números y guiones";

        // Código de barras (opcional)
        if (form.codigoBarras?.trim() && !/^\d{8,14}$/.test(form.codigoBarras.trim())) {
            e.codigoBarras = "El código de barras debe tener entre 8 y 14 dígitos";
        }

        // Tipo de IVA
        if (!form.tipoIVA) e.tipoIVA = "El tipo de IVA es obligatorio";
        else if (!IVA_VALIDOS.includes(form.tipoIVA)) e.tipoIVA = "Selecciona un tipo de IVA válido";

        // Categoría
        if (!form.categoria) e.categoria = "La categoría es obligatoria";

        // Proveedor
        if (!form.proveedor?.trim()) e.proveedor = "El proveedor es obligatorio";
        else if (form.proveedor.trim().length < 2) e.proveedor = "El proveedor debe tener mínimo 2 caracteres";

        // Marca
        if (!form.marca?.trim()) e.marca = "La marca es obligatoria";
        else if (form.marca.trim().length < 2) e.marca = "La marca debe tener mínimo 2 caracteres";

        // Unidad de medida
        if (!form.unidadMedida) e.unidadMedida = "La unidad de medida es obligatoria";
        else if (!UNIDADES_VALIDAS.includes(form.unidadMedida)) e.unidadMedida = "Selecciona una unidad de medida válida";

        // Precio de compra
        const precioCompra = Number(form.precioCompra);
        if (form.precioCompra === "" || form.precioCompra === undefined) e.precioCompra = "El precio de compra es obligatorio";
        else if (isNaN(precioCompra) || precioCompra < 0.01) e.precioCompra = "El precio de compra debe ser mayor a 0";

        // Precio de venta
        const precioVenta = Number(form.precioVenta);
        if (form.precioVenta === "" || form.precioVenta === undefined) e.precioVenta = "El precio de venta es obligatorio";
        else if (isNaN(precioVenta) || precioVenta < 0.01) e.precioVenta = "El precio de venta debe ser mayor a 0";
        else if (!e.precioCompra && precioVenta <= precioCompra) e.precioVenta = "El precio de venta debe ser mayor al precio de compra";

        // Precio mayorista (opcional)
        if (form.precioMayorista !== "" && form.precioMayorista !== undefined && form.precioMayorista !== null) {
            const pm = Number(form.precioMayorista);
            if (isNaN(pm) || pm < 0.01) e.precioMayorista = "El precio mayorista debe ser mayor a 0";
            else if (!e.precioCompra && pm <= precioCompra) e.precioMayorista = "El precio mayorista debe ser mayor al precio de compra";
            else if (!e.precioVenta && pm >= precioVenta) e.precioMayorista = "El precio mayorista debe ser menor al precio de venta";
        }

        // Cantidad mínima mayorista (opcional)
        if (form.cantidadMinimaMayorista !== "" && form.cantidadMinimaMayorista !== undefined && form.cantidadMinimaMayorista !== null) {
            const cmm = Number(form.cantidadMinimaMayorista);
            if (isNaN(cmm) || !Number.isInteger(cmm) || cmm < 1) {
                e.cantidadMinimaMayorista = "La cantidad mínima mayorista debe ser un entero mayor a 0";
            }
        }

        // Stock
        const stock = Number(form.stock);
        if (form.stock === "" || form.stock === undefined) e.stock = "El stock es obligatorio";
        else if (isNaN(stock) || !Number.isInteger(stock)) e.stock = "El stock debe ser un número entero";
        else if (stock < 0) e.stock = "El stock no puede ser un valor negativo";

        // Stock mínimo
        const stockMinimo = Number(form.stockMinimo);
        if (form.stockMinimo === "" || form.stockMinimo === undefined) e.stockMinimo = "El stock mínimo es obligatorio";
        else if (isNaN(stockMinimo) || !Number.isInteger(stockMinimo)) e.stockMinimo = "El stock mínimo debe ser un número entero";
        else if (stockMinimo < 0) e.stockMinimo = "El stock mínimo no puede ser negativo";

        if (!selectedProduct && !(form.imagen instanceof File)) {
            e.imagen = "La imagen es obligatoria";
        }

        return e;
    };

    const submitForm = async () => {
        const nuevosErrores = validate();

        if (Object.keys(nuevosErrores).length > 0) {
            setErrors(nuevosErrores);
            toast.error("Revisa los campos en rojo, falta completar o corregir información");
            return;
        }

        setErrors({});

        try {
            const formData = new FormData()
            Object.entries(form).forEach(([key, val]) => {
                if (key === 'imagen' && val instanceof File) {
                    formData.append("imagen", val)
                } else if (val !== null && val !== undefined && val !== "") {
                    formData.append(key, val)
                }
            })

            const funcionDeGuardado = onSave || crearProducto
            const respuesta = await funcionDeGuardado(formData)

            if (!respuesta) throw new Error("Respuesta inválida del servidor")
            toast.success(respuesta.msg || "Producto guardado correctamente")
            if (onClose) onClose()
        } catch (err) {
            toast.error(err.message || "Error al guardar el producto")
        }
    };

    return { form, errors, preview, handleChange, handleImagen, submitForm, fileInputRef };
};