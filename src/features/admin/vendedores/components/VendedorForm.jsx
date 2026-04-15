import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { MdVisibility, MdVisibilityOff } from "react-icons/md"
import { toast } from "react-toastify"

import {
    inputClass,
    labelClass,
    buttonPrimaryClass
} from "@/utils/styles"

import { registrarVendedor } from "../services/vendedorService"

export default function VendedorForm() {

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

    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [loading, setLoading] = useState(false)

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

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!e.target.checkValidity()) {
            e.target.reportValidity()
            return
        }

        if (form.password !== form.confirmPassword) {
            toast.error("Las contraseñas no coinciden")
            return
        }

        if (!validatePassword(form.password)) {
            toast.error(
                "La contraseña debe tener 8-16 caracteres, mayúscula, minúscula, número y símbolo"
            )
            return
        }

        try {
            setLoading(true)

            const payload = {
                nombre: form.nombre,
                apellido: form.apellido,
                cedula: form.cedula,
                fecha_nacimiento: form.fecha_nacimiento,
                telefono: form.telefono,
                direccion: form.direccion,
                email: form.email,
                password: form.password
            }

            await registrarVendedor(payload)

            toast.success("Vendedor creado correctamente")

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

    return (
        <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >

            <div>
                <Label className={labelClass}>Nombre</Label>
                <Input name="nombre" required onChange={handleChange} value={form.nombre} className={inputClass} />
            </div>

            <div>
                <Label className={labelClass}>Apellido</Label>
                <Input name="apellido" required onChange={handleChange} value={form.apellido} className={inputClass} />
            </div>

            <div>
                <Label className={labelClass}>Cédula</Label>
                <Input name="cedula" required onChange={handleChange} value={form.cedula} className={inputClass} />
            </div>

            <div>
                <Label className={labelClass}>Fecha nacimiento</Label>
                <Input type="date" name="fecha_nacimiento" required onChange={handleChange} value={form.fecha_nacimiento} className={inputClass} />
            </div>

            <div>
                <Label className={labelClass}>Teléfono</Label>
                <Input name="telefono" required onChange={handleChange} value={form.telefono} className={inputClass} />
            </div>

            <div>
                <Label className={labelClass}>Dirección</Label>
                <Input name="direccion" required onChange={handleChange} value={form.direccion} className={inputClass} />
            </div>

            <div className="md:col-span-2">
                <Label className={labelClass}>Email</Label>
                <Input type="email" name="email" required onChange={handleChange} value={form.email} className={inputClass} />
            </div>

            {/* PASSWORD */}
            <div className="relative">
                <Label className={labelClass}>Contraseña</Label>
                <Input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    minLength={8}
                    maxLength={16}
                    onChange={handleChange}
                    value={form.password}
                    className={inputClass + " pr-10"}
                />

                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2/3 -translate-y-1/2 text-emerald-900"
                >
                    {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
                </button>
            </div>

            {/* CONFIRM PASSWORD */}
            <div className="relative">
                <Label className={labelClass}>Confirmar contraseña</Label>
                <Input
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    required
                    onChange={handleChange}
                    value={form.confirmPassword}
                    className={`${inputClass} pr-10`}
                />

                <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-2/3 -translate-y-1/2 text-emerald-900"
                >
                    {showConfirmPassword ? <MdVisibilityOff /> : <MdVisibility />}
                </button>
            </div>

            {/* BUTTON */}
            <div className="md:col-span-2">
                <Button type="submit" className={buttonPrimaryClass} disabled={loading}>
                    {loading ? "Creando..." : "Crear Vendedor"}
                </Button>
            </div>

        </form>
    )
}