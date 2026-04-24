import { useState } from "react"
import { toast } from "react-toastify"
import { registrarVendedor } from "../services/vendedorService"

export default function useVendedorForm(onSuccess, tipo = "VENDEDOR") {

    const [form, setForm] = useState({
        nombre: "",
        apellido: "",
        cedula: "",
        fecha_nacimiento: "",
        telefono: "",
        direccion: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)


    const onlyLetters = (value) =>
        /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]*$/.test(value)

    const onlyNumbers = (value) =>
        /^\d*$/.test(value)

    const validatePassword = (password) => {
        return (
            /[a-z]/.test(password) &&
            /[A-Z]/.test(password) &&
            /\d/.test(password) &&
            /[^A-Za-z0-9]/.test(password) &&
            password.length >= 8 &&
            password.length <= 16
        )
    }

    const calculateAge = (birthDate) => {
        const today = new Date()
        const birth = new Date(birthDate)

        let age = today.getFullYear() - birth.getFullYear()
        const m = today.getMonth() - birth.getMonth()

        if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
            age--
        }

        return age
    }


    const handleChange = (e) => {
        const { name, value } = e.target

        if (name === "nombre" || name === "apellido") {
            if (!onlyLetters(value)) return
        }

        if (name === "telefono" || name === "cedula") {
            if (!onlyNumbers(value)) return
        }

        if (name === "telefono" && value.length > 10) return
        if (name === "cedula" && value.length > 10) return

        setForm(prev => ({
            ...prev,
            [name]: value
        }))
    }


    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!e.target.checkValidity()) {
            e.target.reportValidity()
            return
        }

        if (!onlyLetters(form.nombre) || !onlyLetters(form.apellido)) {
            toast.error("Nombre y apellido solo deben contener letras")
            return
        }

        if (!/^\d{10}$/.test(form.cedula)) {
            toast.error("La cédula debe tener 10 dígitos")
            return
        }

        if (!/^\d{10}$/.test(form.telefono)) {
            toast.error("El teléfono debe tener 10 dígitos")
            return
        }

        if (!form.fecha_nacimiento) {
            toast.error("Fecha requerida")
            return
        }

        if (calculateAge(form.fecha_nacimiento) < 18) {
            toast.error("Debe ser mayor de edad")
            return
        }

        if (form.password !== form.confirmPassword) {
            toast.error("Contraseñas no coinciden")
            return
        }

        if (!validatePassword(form.password)) {
            toast.error("Contraseña inválida")
            return
        }

        try {
            setLoading(true)

            const { confirmPassword, ...payload } = form

            payload.rol=tipo

            await registrarVendedor(payload)

            toast.success("Vendedor creado")

            if (onSuccess) onSuccess()

            // reset
            setForm({
                nombre: "",
                apellido: "",
                cedula: "",
                fecha_nacimiento: "",
                telefono: "",
                direccion: "",
                email: "",
                password: "",
                confirmPassword: ""
            })

        } catch (error) {
            toast.error(error?.message || "Error al registrar vendedor")
        } finally {
            setLoading(false)
        }
    }

    return {
        form,
        loading,
        showPassword,
        showConfirmPassword,
        setShowPassword,
        setShowConfirmPassword,
        handleChange,
        handleSubmit
    }
}