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

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value })

    const handleSubmit = (e) => {
        e.preventDefault()

        if (form.password !== form.confirmPassword) {
            alert("Las contraseñas no coinciden")
            return
        }

        console.log("Formulario listo:", form)
    }

    return (
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* NOMBRE */}
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

            {/* APELLIDO */}
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

            {/* CÉDULA */}
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

            {/* FECHA NACIMIENTO */}
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

            {/* TELÉFONO */}
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

            {/* DIRECCIÓN */}
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

            {/* EMAIL (ocupa todo el ancho) */}
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

            {/* PASSWORD */}
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
                    className="absolute right-3 top-10 text-emerald-900"
                >
                    {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
                </button>
            </div>

            {/* CONFIRM PASSWORD */}
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
                    className="absolute right-3 top-10 text-emerald-900"
                >
                    {showConfirmPassword ? <MdVisibilityOff /> : <MdVisibility />}
                </button>
            </div>

            {/* BOTÓN */}
            <div className="md:col-span-2 pt-4">
                <Button className={`${buttonPrimaryClass} text-xl`}>
                    Crear Cuenta
                </Button>
            </div>

        </form>
    )
}

export default RegisterForm