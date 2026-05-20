import { useRef, useState } from "react"
import { toast } from "react-toastify"

export default function usePedidoForm() {

    const [form, setForm] = useState({
        nombrePedido: "",
        fecha: "",
        direccion: "",
        referencia: "",
        telefono: "",
        observaciones: ""
    })

    const [metodoPago, setMetodoPago] = useState("")
    const [imagen, setImagen] = useState(null)
    const [preview, setPreview] = useState(null)

    const fileInputRef = useRef(null)

    const handleChange = (e) => {

        const { name, value } = e.target

        if (name === "telefono") {

            if (!/^\d*$/.test(value)) return

            if (value.length > 10) return
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

        if (!form.fecha) {

            toast.error(
                "Seleccione una fecha"
            )

            return false
        }

        if (!imagen) {

            toast.error(
                "Debe subir una imagen"
            )

            return false
        }

        if (!form.direccion.trim()) {

            toast.error(
                "Ingrese una dirección"
            )

            return false
        }

        if (!/^\d{10}$/.test(form.telefono)) {

            toast.error(
                "El teléfono debe tener 10 dígitos"
            )

            return false
        }

        if (!metodoPago) {

            toast.error(
                "Seleccione un método de pago"
            )

            return false
        }

        return true
    }

    const handleSubmit = () => {

        const valido = validarFormulario()

        if (!valido) return

        toast.success(
            "Pedido enviado correctamente"
        )
    }

    return {
        form,
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