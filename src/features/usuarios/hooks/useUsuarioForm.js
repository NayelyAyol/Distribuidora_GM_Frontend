import { useState } from "react"
import { toast } from "react-toastify"
import { registrarVendedor } from "../services/vendedorService"
import validarIdentificacion from "@/utils/validarIdentificacion";

export default function useUsuarioForm(onSuccess) {

    const [form, setForm] = useState({
        nombre: "",
        apellido: "",
        cedula: "",
        fecha_nacimiento: "",
        telefono: "",
        direccion: "",
        email: "",
        password: "",
        confirmPassword: "",
    })

    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const clearError = (name) => {
        setErrors(prev => ({ ...prev, [name]: "" }))
    }

    const onlyLetters = (value) =>
        /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]*$/.test(value)

    const onlyNumbers = (value) =>
        /^\d*$/.test(value)

    const validCharsAddress = (value) =>
        /^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9\s#.,\-°]*$/.test(value)

    const calculateAge = (birthDate) => {
        const today = new Date()
        const birth = new Date(birthDate)
        let age = today.getFullYear() - birth.getFullYear()
        const m = today.getMonth() - birth.getMonth()
        if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--
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

        if (name === "direccion") {
            if (!validCharsAddress(value)) return
        }

        if (name === "password" || name === "confirmPassword") {  
            if (/\s/.test(value)) return                            
        }  

        if (name === "telefono" && value.length > 10) return
        if (name === "cedula" && value.length > 10) return
        if (name === "nombre" && value.length > 15) return
        if (name === "apellido" && value.length > 20) return
        if (name === "direccion" && value.length > 30) return

        clearError(name)

        setForm(prev => ({ ...prev, [name]: value }))
    }

    const validatePassword = (password) => {
        if (password.length < 8 || password.length > 16)
            return "La contraseña debe tener entre 8 y 16 caracteres"
        if (!/[A-Z]/.test(password))
            return "Debe incluir al menos una letra mayúscula"
        if (!/[a-z]/.test(password))
            return "Debe incluir al menos una letra minúscula"
        if (!/\d/.test(password))
            return "Debe incluir al menos un número"
        if (!/[^A-Za-z0-9\s]/.test(password))          
            return "Debe incluir al menos un carácter especial"
        if (/\s/.test(password))                        
            return "La contraseña no puede contener espacios"  
        return null
    }

    const validate = () => {
        const newErrors = {}

        // Nombre
        if (!form.nombre.trim()) {
            newErrors.nombre = "El nombre es obligatorio"
        } else if (form.nombre.trim().length < 3) {
            newErrors.nombre = "El nombre debe tener mínimo 3 caracteres"
        }

        // Apellido
        if (!form.apellido.trim()) {
            newErrors.apellido = "El apellido es obligatorio"
        } else if (form.apellido.trim().length < 3) {
            newErrors.apellido = "El apellido debe tener mínimo 3 caracteres"
        }

        // Cédula
        if (!form.cedula) {
            newErrors.cedula = "La cédula es obligatoria"
        } else if (!validarIdentificacion(form.cedula, true)) {   
            newErrors.cedula = "Ingrese una cédula válida de 10 dígitos"
        }

        // Fecha de nacimiento
        if (!form.fecha_nacimiento) {
            newErrors.fecha_nacimiento = "La fecha de nacimiento es obligatoria"
        } else {
            const age = calculateAge(form.fecha_nacimiento)
            if (age < 18) {
                newErrors.fecha_nacimiento = "Debe tener al menos 18 años de edad"
            } else if (age > 100) {
                newErrors.fecha_nacimiento = "La edad no puede ser mayor a 100 años"
            }
        }

        // Teléfono
        if (!form.telefono) {
            newErrors.telefono = "El teléfono es obligatorio"
        } else if (!/^\d{10}$/.test(form.telefono)) {
            newErrors.telefono = "El teléfono debe tener exactamente 10 dígitos"
        }

        // Dirección
        if (!form.direccion.trim()) {
            newErrors.direccion = "La dirección es obligatoria"
        } else if (form.direccion.trim().length < 5) {
            newErrors.direccion = "La dirección debe tener mínimo 5 caracteres"
        } else if (form.direccion.trim().length > 30) {        
            newErrors.direccion = "La dirección debe tener máximo 30 caracteres"
        }

        // Email
        if (!form.email.trim()) {
            newErrors.email = "El correo es obligatorio"
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
            newErrors.email = "Ingresa un correo válido"
        }

        // Contraseña
        const passwordError = validatePassword(form.password)
        if (!form.password) {
            newErrors.password = "La contraseña es obligatoria"
        } else if (passwordError) {
            newErrors.password = passwordError
        }

        // Confirmar contraseña
        if (!form.confirmPassword) {
            newErrors.confirmPassword = "Confirma tu contraseña"
        } else if (form.password !== form.confirmPassword) {
            newErrors.confirmPassword = "Las contraseñas no coinciden"
        }

        return newErrors
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const newErrors = validate()

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
            return
        }

        try {
            setLoading(true)
            const { confirmPassword, ...payload } = form
            await registrarVendedor({ ...payload, rol: "VENDEDOR" })
            toast.success("Vendedor creado")
            if (onSuccess) onSuccess()
            setForm({
                nombre: "",
                apellido: "",
                cedula: "",
                fecha_nacimiento: "",
                telefono: "",
                direccion: "",
                email: "",
                password: "",
                confirmPassword: "",
            })
            setErrors({})
        } catch (error) {
            toast.error(error?.message || "Error al registrar vendedor")
        } finally {
            setLoading(false)
        }
    }

    return {
        form,
        errors,
        loading,
        showPassword,
        showConfirmPassword,
        setShowPassword,
        setShowConfirmPassword,
        handleChange,
        handleSubmit,
    }
}