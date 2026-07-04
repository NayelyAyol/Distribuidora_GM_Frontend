import { useRef, useState } from "react";
import { toast } from "react-toastify";
import { crearPedido } from "../services/pedidoService";

export default function usePedidoForm() {
    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        nombrePedido: "",
        nombreCompleto: "",
        identificacion: "",
        correo: "",
        telefono: "",
        tipoEntrega: "RETIRO_LOCAL",
        direccion: "",
        referencia: "",
        observaciones: "",
    });

    const [errors, setErrors] = useState({
        nombrePedido: "",
        nombreCompleto: "",
        identificacion: "",
        correo: "",
        telefono: "",
        imagen: "",
        direccion: "",
        referencia: ""
    })

    const [metodoPago, setMetodoPago] = useState("");
    const [imagen, setImagen] = useState(null);
    const [preview, setPreview] = useState(null);

    const fileInputRef = useRef(null);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }))

        if (name === "nombreCompleto") {
        if (!/^[\p{L}\s]*$/u.test(value)) return;
        if (value.length > 80) return;
        }

        if (name === "telefono") {
        if (!/^\d*$/.test(value)) return;
        if (value.length > 10) return;
        }

        if (name === "identificacion") {
        if (!/^\d*$/.test(value)) return;
        if (value.length > 13) return;
        }

        if (name === "nombrePedido" && value.length > 60) return;
        if (name === "direccion" && value.length > 80) return;
        if (name === "referencia" && value.length > 80) return;

        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleImagenChange = (e) => {
        const file = e.target.files[0]
        if (!file) return
        const tiposPermitidos = ["image/png", "image/jpeg", "image/jpg"]
        if (!tiposPermitidos.includes(file.type)) {
            setErrors(prev => ({ ...prev, imagen: "Solo se permiten imágenes PNG o JPG" }))
            return
        }
        setErrors(prev => ({ ...prev, imagen: "" })) // limpiar al subir bien
        setImagen(file)
        const reader = new FileReader()
        reader.onloadend = () => setPreview(reader.result)
        reader.readAsDataURL(file)
    }

const validarFormulario = () => {
    const newErrors = {}

    if (!form.nombrePedido.trim())
        newErrors.nombrePedido = "Ingrese el nombre del pedido"
    else if (form.nombrePedido.trim().length < 5)
        newErrors.nombrePedido = "El nombre del pedido debe tener mínimo 5 caracteres"

    if (!form.nombreCompleto.trim())
        newErrors.nombreCompleto = "Ingrese el nombre completo"
    else if (form.nombreCompleto.trim().length < 3)
        newErrors.nombreCompleto = "El nombre completo debe tener mínimo 3 caracteres"

    if (!form.identificacion.trim())
        newErrors.identificacion = "Ingrese la cédula o RUC"
    else if (form.identificacion.length !== 10 && form.identificacion.length !== 13)
        newErrors.identificacion = "Debe tener 10 (cédula) o 13 (RUC) dígitos"

    if (!form.correo.trim())
        newErrors.correo = "Ingrese el correo"
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.correo))
        newErrors.correo = "Ingrese un correo válido"

    if (!form.telefono.trim())
        newErrors.telefono = "Ingrese el teléfono"
    else if (!/^09\d{8}$/.test(form.telefono))
        newErrors.telefono = "Ingrese un celular ecuatoriano válido (09XXXXXXXX)"

    if (!imagen)
        newErrors.imagen = "Debe subir una imagen de la lista"

    if (form.tipoEntrega === "ENVIO_DOMICILIO") {
        if (!form.direccion.trim())
            newErrors.direccion = "Ingrese una dirección para el envío"
        if (!form.referencia.trim())
            newErrors.referencia = "Ingrese una referencia para el envío"
    }

    if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors)
        return false
    }

    return true
}

    const resetForm = () => {
        setForm({
        nombrePedido: "",
        nombreCompleto: "",
        identificacion: "",
        correo: "",
        telefono: "",
        tipoEntrega: "RETIRO_LOCAL",
        direccion: "",
        referencia: "",
        observaciones: "",
        });
        setMetodoPago("");
        setImagen(null);
        setPreview(null);
        setErrors({ nombrePedido: "", nombreCompleto: "", identificacion: "", correo: "", telefono: "", imagen: "", direccion: "", referencia: "" })

    };

    const handleSubmit = async () => {
        if (!validarFormulario()) return;

        setLoading(true);
        const formData = new FormData();

        formData.append("nombrePedido", form.nombrePedido);
        formData.append("tipoEntrega", form.tipoEntrega);
        formData.append("observaciones", form.observaciones);
        formData.append("imagen", imagen);

        formData.append("nombreCompleto", form.nombreCompleto);
        formData.append("identificacion", form.identificacion);
        formData.append("correo", form.correo);
        formData.append("telefono", form.telefono);

        if (form.tipoEntrega === "ENVIO_DOMICILIO") {
        formData.append("direccion", form.direccion);
        formData.append("referencia", form.referencia);
        }

        try {
        await crearPedido(formData);
        toast.success("Pedido enviado correctamente");
        resetForm();
        return true;
        } catch (error) {
        toast.error(error.message);
        return false;
        } finally {
        setLoading(false);
        }
    };

    return {
        form,
        setForm,
        loading,
        metodoPago,
        setMetodoPago,
        imagen,
        preview,
        fileInputRef,
        handleChange,
        handleImagenChange,
        handleSubmit,
        errors,
        setErrors,
    };
}
