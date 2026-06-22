import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { inputClass, labelClass, buttonPrimaryClass } from "@/utils/styles"
import { updateProfile } from "../services/profileService"
import { toast } from "react-toastify"

export default function ProfileForm({ user, onRefresh }) {

    const [form, setForm] = useState({
        nombre: "",
        apellido: "",
        email: "",
        direccion: "",
        telefono: ""
    })

    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (user) {
            setForm({
                nombre: user.nombre || "",
                apellido: user.apellido || "",
                email: user.email || "",
                direccion: user.direccion || "",
                telefono: user.telefono || ""
            })
        }
    }, [user])

    const clearError = (name) => {
        setErrors(prev => ({ ...prev, [name]: "" }))
    }

    const handleChange = (e) => {
        const { name, value } = e.target

        if (name === "nombre") {
            if (!/^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]*$/.test(value)) return
            if (value.length > 15) return
        }

        if (name === "apellido") {
            if (!/^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]*$/.test(value)) return
            if (value.length > 20) return
        }

        if (name === "telefono") {
            if (!/^\d*$/.test(value) || value.length > 10) return
        }

        if (name === "direccion") {
            if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9\s#.,\-°]*$/.test(value)) return
            if (value.length > 50) return
        }

        clearError(name)
        setForm(prev => ({ ...prev, [name]: value }))
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

        // Dirección
        if (!form.direccion.trim()) {
            newErrors.direccion = "La dirección es obligatoria"
        } else if (form.direccion.trim().length < 5) {
            newErrors.direccion = "La dirección debe tener mínimo 5 caracteres"
        }

        // Teléfono
        if (!form.telefono.trim()) {
            newErrors.telefono = "El teléfono es obligatorio"
        } else if (!/^\d{10}$/.test(form.telefono)) {
            newErrors.telefono = "El teléfono debe tener exactamente 10 dígitos"
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
            await updateProfile(form)
            toast.success("Perfil actualizado")
            if (onRefresh) await onRefresh()
        } catch (error) {
            const msg = error.response?.data?.msg || "Error al actualizar perfil"
            toast.error(msg)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="bg-white/80 backdrop-blur-xl border border-gray-200 shadow-lg rounded-2xl p-6">

            <h2 className="text-lg font-bold mb-4 text-gray-800 justify-center flex">
                Actualizar información
            </h2>

            <form onSubmit={handleSubmit} noValidate className="grid grid-cols-1 md:grid-cols-2 gap-4">

                {/* Nombre */}
                <div className="space-y-1">
                    <Label className={`${labelClass} mb-3`}>Nombre</Label>
                    <Input
                        name="nombre"
                        value={form.nombre}
                        onChange={handleChange}
                        className={inputClass}
                        placeholder="Ej: Juan"
                        maxLength={15}
                    />
                    {errors.nombre && <p className="text-red-500 text-sm font-medium">{errors.nombre}</p>}
                </div>

                {/* Apellido */}
                <div className="space-y-1">
                    <Label className={`${labelClass} mb-3`}>Apellido</Label>
                    <Input
                        name="apellido"
                        value={form.apellido}
                        onChange={handleChange}
                        className={inputClass}
                        placeholder="Ej: Pérez"
                        maxLength={20}
                    />
                    {errors.apellido && <p className="text-red-500 text-sm font-medium">{errors.apellido}</p>}
                </div>

                {/* Email — solo lectura */}
                <div className="md:col-span-2 space-y-1">
                    <Label className={`${labelClass} mb-3`}>Email</Label>
                    <Input
                        type="email"
                        name="email"
                        value={form.email}
                        className={`${inputClass} bg-gray-100 cursor-not-allowed`}
                        readOnly
                    />
                </div>

                {/* Dirección */}
                <div className="md:col-span-2 space-y-1">
                    <Label className={`${labelClass} mb-3`}>Dirección</Label>
                    <Input
                        name="direccion"
                        value={form.direccion}
                        onChange={handleChange}
                        className={inputClass}
                        placeholder="Ej: Av. Amazonas 123"
                        maxLength={50}
                    />
                    {errors.direccion && <p className="text-red-500 text-sm font-medium">{errors.direccion}</p>}
                </div>

                {/* Teléfono */}
                <div className="md:col-span-2 space-y-1">
                    <Label className={`${labelClass} mb-3`}>Teléfono</Label>
                    <Input
                        name="telefono"
                        value={form.telefono}
                        onChange={handleChange}
                        className={inputClass}
                        placeholder="10 dígitos"
                        maxLength={10}
                    />
                    {errors.telefono && <p className="text-red-500 text-sm font-medium">{errors.telefono}</p>}
                </div>

                {/* Submit */}
                <div className="md:col-span-2">
                    <Button type="submit" disabled={loading} className={buttonPrimaryClass}>
                        {loading ? "Guardando..." : "Aceptar"}
                    </Button>
                </div>

            </form>
        </div>
    )
}