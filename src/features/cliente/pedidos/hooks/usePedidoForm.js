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

    const [metodoPago, setMetodoPago] = useState("");
    const [imagen, setImagen] = useState(null);
    const [preview, setPreview] = useState(null);

    const fileInputRef = useRef(null);

    const handleChange = (e) => {
        const { name, value } = e.target;

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
        const file = e.target.files[0];

        if (!file) return;

        const tiposPermitidos = ["image/png", "image/jpeg", "image/jpg"];

        if (!tiposPermitidos.includes(file.type)) {
        toast.error("Solo se permiten imágenes PNG o JPG");

        return;
        }

        setImagen(file);

        const reader = new FileReader();

        reader.onloadend = () => {
        setPreview(reader.result);
        };

        reader.readAsDataURL(file);
    };

    const validarFormulario = () => {
        if (!form.nombrePedido.trim()) {
        toast.error("Ingrese el nombre del pedido");
        return false;
        }
        if (form.nombrePedido.trim().length < 5) {
        toast.error("El nombre del pedido debe tener mínimo 5 caracteres");
        return false;
        }

        if (!form.nombreCompleto.trim()) {
        toast.error("Ingrese el nombre completo");
        return false;
        }
        if (form.nombreCompleto.trim().length < 3) {
        toast.error("El nombre completo debe tener mínimo 3 caracteres");
        return false;
        }

        if (!form.identificacion.trim()) {
        toast.error("Ingrese la cédula o RUC");
        return false;
        }
        if (
        form.identificacion.length !== 10 &&
        form.identificacion.length !== 13
        ) {
        toast.error(
            "La identificación debe tener 10 (cédula) o 13 (RUC) dígitos",
        );
        return false;
        }

        if (!form.correo.trim()) {
        toast.error("Ingrese el correo");
        return false;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.correo)) {
        toast.error("Ingrese un correo válido");
        return false;
        }

        if (!form.telefono.trim()) {
        toast.error("Ingrese el teléfono");
        return false;
        }
        if (!/^09\d{8}$/.test(form.telefono)) {
        toast.error("Ingrese un celular ecuatoriano válido (09XXXXXXXX)");
        return false;
        }

        if (!imagen) {
        toast.error("Debe subir una imagen de la lista");
        return false;
        }

        if (form.tipoEntrega === "ENVIO_DOMICILIO") {
        if (!form.direccion.trim()) {
            toast.error("Ingrese una dirección para el envío");
            return false;
        }
        if (!form.referencia.trim()) {
            toast.error("Ingrese una referencia para el envío");
            return false;
        }
        }

        return true;
    };

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
    };
}
