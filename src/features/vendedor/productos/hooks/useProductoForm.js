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
        categoria: "", tipoIVA: "", destacado: false, imagen: null
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
            categoria: "", tipoIVA: "", destacado: false, imagen: null
        });
        setPreview(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        const camposSoloLetras = ['nombre', 'marca', 'proveedor', 'color', 'material', 'presentacion']
        if (camposSoloLetras.includes(name)) {
            if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/.test(value)) return
        }

        if (name === 'codigo') {
            if (!/^[A-Z0-9-]*$/i.test(value)) return
            setForm(prev => ({ ...prev, codigo: value.toUpperCase() }))
            return
        }

        if (name === 'codigoBarras') {
            if (!/^\d*$/.test(value)) return
            if (value.length > 14) return
        }

        if (name === 'tamanio' && value.length > 15) return

        setForm(prev => ({ ...prev, [name]: type === "checkbox" ? checked : value }))
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

        const camposRequeridos = ['nombre', 'codigo', 'precioCompra', 'precioVenta', 'stock', 'stockMinimo', 'marca', 'proveedor', 'unidadMedida', 'categoria', 'tipoIVA']
        const faltanCampos = camposRequeridos.some(campo => {
            const valor = form[campo]
            return valor === null || valor === undefined || valor === ""
        })
        if (faltanCampos) return toast.error("Completa todos los campos obligatorios")

        if (form.nombre.trim().length < 3)
            return toast.error("El nombre debe tener mínimo 3 caracteres")

        if (form.codigo.trim().length < 3)
            return toast.error("El código debe tener mínimo 3 caracteres")
        if (!/^[A-Z0-9-]+$/.test(form.codigo.trim()))
            return toast.error("El código solo puede contener letras, números y guiones")

        if (form.codigoBarras?.trim() && !/^\d{8,14}$/.test(form.codigoBarras.trim()))
            return toast.error("El código de barras debe tener entre 8 y 14 dígitos")

        if (Number(form.precioCompra) <= 0)
            return toast.error("El precio de compra debe ser mayor a 0")
        if (Number(form.precioVenta) <= 0)
            return toast.error("El precio de venta debe ser mayor a 0")
        if (Number(form.precioVenta) <= Number(form.precioCompra))
            return toast.error("El precio de venta debe ser mayor al precio de compra")

        if (form.precioMayorista !== "" && form.precioMayorista !== undefined) {
            const pm = Number(form.precioMayorista)
            if (pm <= 0)
                return toast.error("El precio mayorista debe ser mayor a 0")
            if (pm <= Number(form.precioCompra))
                return toast.error("El precio mayorista debe ser mayor al precio de compra")
            if (pm >= Number(form.precioVenta))
                return toast.error("El precio mayorista debe ser menor al precio de venta")
        }

        if (!Number.isInteger(Number(form.stock)) || Number(form.stock) < 0)
            return toast.error("El stock debe ser un número entero no negativo")
        if (!Number.isInteger(Number(form.stockMinimo)) || Number(form.stockMinimo) < 0)
            return toast.error("El stock mínimo debe ser un número entero no negativo")

        if (form.cantidadMinimaMayorista !== "" && form.cantidadMinimaMayorista !== undefined) {
            if (!Number.isInteger(Number(form.cantidadMinimaMayorista)) || Number(form.cantidadMinimaMayorista) < 1)
                return toast.error("La cantidad mínima mayorista debe ser un entero mayor a 0")
        }

        if (form.marca.trim().length < 2)
            return toast.error("La marca debe tener mínimo 2 caracteres")

        if (form.proveedor.trim().length < 2)
            return toast.error("El proveedor debe tener mínimo 2 caracteres")

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

    return { form, preview, handleChange, handleImagen, submitForm, fileInputRef };
};