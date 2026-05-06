import { useState } from "react"
import { MdVisibility, MdVisibilityOff } from "react-icons/md"
import {
    inputClass,
    buttonPrimaryClass,
    labelClass
} from "@/utils/styles"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { registro } from "../services/authService"
import { toast } from "react-toastify"

const RegisterForm = () => {
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

    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [loading, setLoading] = useState(false)


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

        setForm({ ...form, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (loading) return

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

        setLoading(true)
        try {
            const { confirmPassword, ...data } = form

            await registro(data)
            toast.success("Registro exitoso")

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

        } catch (error) {
            console.error(error)
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div className="space-y-2">
                <Label className={labelClass}>Nombre</Label>
                <Input
                    name="nombre"
                    value={form.nombre}
                    onChange={handleChange}
                    placeholder="Carlos"
                    className={inputClass}
                    required
                />
            </div>

            <div className="space-y-2">
                <Label className={labelClass}>Apellido</Label>
                <Input
                    name="apellido"
                    value={form.apellido}
                    onChange={handleChange}
                    placeholder="Ruiz"
                    className={inputClass}
                    required
                />
            </div>

            <div className="space-y-2">
                <Label className={labelClass}>Cédula</Label>
                <Input
                    name="cedula"
                    value={form.cedula}
                    onChange={handleChange}
                    placeholder="1725841230"
                    className={inputClass}
                    required
                />
            </div>

            <div className="space-y-2">
                <Label className={labelClass}>Fecha de nacimiento</Label>
                <Input
                    type="date"
                    name="fecha_nacimiento"
                    value={form.fecha_nacimiento}
                    onChange={handleChange}
                    className={inputClass}
                    required
                />
            </div>

            <div className="space-y-2">
                <Label className={labelClass}>Teléfono</Label>
                <Input
                    name="telefono"
                    value={form.telefono}
                    onChange={handleChange}
                    placeholder="0984512367"
                    className={inputClass}
                    required
                />
            </div>

            <div className="space-y-2">
                <Label className={labelClass}>Dirección</Label>
                <Input
                    name="direccion"
                    value={form.direccion}
                    onChange={handleChange}
                    placeholder="Av. de los Granados"
                    className={inputClass}
                    required
                />
            </div>

            <div className="space-y-2 md:col-span-2">
                <Label className={labelClass}>Correo electrónico</Label>
                <Input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="correo@gmail.com"
                    className={inputClass}
                    required
                />
            </div>

            <div className="space-y-2 relative">
                <Label className={labelClass}>Contraseña</Label>
                <Input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    className={`${inputClass} pr-12`}
                    required
                />
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-7 text-emerald-900"
                >
                    {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
                </button>
            </div>

            <div className="space-y-2 relative">
                <Label className={labelClass}>Confirmar contraseña</Label>
                <Input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    className={`${inputClass} pr-12`}
                    required
                />
                <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-7 text-emerald-900"
                >
                    {showConfirmPassword ? <MdVisibilityOff /> : <MdVisibility />}
                </button>
            </div>

            <div className="md:col-span-2 pt-4">
                <Button disabled={loading} className={buttonPrimaryClass}
                    type="submit">
                    {loading ? "Creando..." : "Aceptar"}
                </Button>
            </div>

        </form>
    )
}

export default RegisterForm