import { useRef, useState } from "react"
import { toast } from "react-toastify"
import { crearPedido } from "../services/pedidoService"

export default function usePedidoForm() {

    const [form, setForm] = useState({
        nombrePedido: "",
        nombreCompleto: "",
        identificacion: "",
        correo: "",
        telefono: "",
        tipoEntrega: "RETIRO_LOCAL", 
        direccion: "",
        referencia: "",
        observaciones: ""
    })

    const [metodoPago, setMetodoPago] = useState("")
    const [imagen, setImagen] = useState(null)
    const [preview, setPreview] = useState(null)

    const fileInputRef = useRef(null)

    const handleChange = (e) => {

        const { name, value } = e.target

        if (name === "nombreCompleto") {

            if (!/^[\p{L}\s]*$/u.test(value)) {
                return;
            }

        }

        if (name === "telefono") {

            if (!/^\d*$/.test(value)) return

            if (value.length > 10) return
        }
        
        if (name === "identificacion") {

            if (!/^\d*$/.test(value)) return

            if (value.length > 13) return
        }

        setForm(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleImagenChange = (e) => {

        const file = e.target.files[0]

        if (!file) return

        const tiposPermitidos = [
            "image/png",
            "image/jpeg",
            "image/jpg"
        ]

        if (!tiposPermitidos.includes(file.type)) {

            toast.error(
                "Solo se permiten imágenes PNG o JPG"
            )

            return
        }

        setImagen(file)

        const reader = new FileReader()

        reader.onloadend = () => {
            setPreview(reader.result)
        }

        reader.readAsDataURL(file)
    }

    const validarFormulario = () => {

        if (!form.nombrePedido.trim()) {

            toast.error(
                "Ingrese el nombre del pedido"
            )

            return false
        }

        if (!form.nombreCompleto.trim()) {

            toast.error(
                "Ingrese el nombre completo"
            )

            return false
        }

        if (!form.identificacion.trim()) {

            toast.error(
                "Ingrese el numero de cédula o RUC"
            )

            return false
        }

        if (!form.correo.trim()) {

            toast.error(
                "Ingrese el correo"
            )

            return false
        }

        if (!form.telefono.trim()) {

            toast.error(
                "Ingrese el teléfono"
            )

            return false
        }

        if (!imagen) {

            toast.error(
                "Debe subir una imagen"
            )

            return false
        }

        if (form.tipoEntrega === "ENVIO_DOMICILIO" && !form.direccion.trim()) {
                toast.error("Ingrese una dirección para el envío");
                return false;
            }
        
        if (form.tipoEntrega === "ENVIO_DOMICILIO" && !form.referencia.trim()) {
                toast.error("Ingrese una referencia para el envío");
                return false;
            }

        const id = form.identificacion.trim();

        if (!/^\d+$/.test(id)) {
            toast.error("La identificación solo debe contener números");
            return false;
        }

        if (id.length !== 10 && id.length !== 13) {
            toast.error("La identificación debe tener 10 (cédula) o 13 (RUC) dígitos");
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(form.correo)) {
            toast.error("Ingrese un correo electrónico válido");
            return false;
        }

        if (!/^\d{10}$/.test(form.telefono)) {

            toast.error(
                "El teléfono debe tener 10 dígitos"
            )

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
            observaciones: ""
        });
        setMetodoPago("");
        setImagen(null);
        setPreview(null);
    };

    const handleSubmit = async () => {
        if (!validarFormulario()) return;

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
            return true
        } catch (error) {
            toast.error(error.message);
            return false
        }
    }

    return {
        form,
        setForm,
        metodoPago,
        setMetodoPago,
        imagen,
        preview,
        fileInputRef,
        handleChange,
        handleImagenChange,
        handleSubmit
    }
}