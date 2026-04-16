import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

import {
    inputClass,
    labelClass,
    buttonPrimaryClass
} from "@/utils/styles"
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

    const handleChange = (e) => {
        const { name, value } = e.target

        // Validación en tiempo real
        if (name === "nombre" || name === "apellido") {
            if (!/^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]*$/.test(value)) return
        }

        if (name === "telefono") {
            if (!/^\d*$/.test(value) || value.length > 10) return
        }

        setForm({
            ...form,
            [name]: value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        // Validaciones adicionales
        if (!/^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/.test(form.nombre)) {
            toast.error("El nombre solo debe contener letras")
            return
        }

        if (!/^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/.test(form.apellido)) {
            toast.error("El apellido solo debe contener letras")
            return
        }

        if (!/^\d{10}$/.test(form.telefono)) {
            toast.error("El teléfono debe tener exactamente 10 dígitos")
            return
        }

        if (!e.target.checkValidity()) {
            e.target.reportValidity()
            return
        }

        const loadingToast = toast.loading("Actualizando perfil...")

        try {
            await updateProfile(form)

            toast.dismiss(loadingToast)
            toast.success("Perfil actualizado")

            if (onRefresh) {
                await onRefresh()
            }

        } catch (error) {
            toast.dismiss(loadingToast)

            const msg = error.response?.data?.message || "Error al actualizar perfil"
            toast.error(msg)
            console.error("Error al actualizar perfil:", error)
        }
    }

    return (
        <div className="bg-white/80 backdrop-blur-xl border border-gray-200 shadow-lg rounded-2xl p-6">

            <h2 className="text-lg font-bold mb-4 text-gray-800 justify-center flex">
                Actualizar información
            </h2>

            <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >

                {/* Nombre */}
                <div>
                    <Label className={`${labelClass} mb-3`}>Nombre</Label>
                    <Input
                        name="nombre"
                        required
                        pattern="^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$"
                        title="Solo se permiten letras"
                        onChange={handleChange}
                        value={form.nombre}
                        className={inputClass}
                    />
                </div>

                {/* Apellido */}
                <div>
                    <Label className={`${labelClass} mb-3`}>Apellido</Label>
                    <Input
                        name="apellido"
                        required
                        pattern="^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$"
                        title="Solo se permiten letras"
                        onChange={handleChange}
                        value={form.apellido}
                        className={inputClass}
                    />
                </div>

                {/* Email (bloqueado) */}
                <div className="md:col-span-2">
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
                <div className="md:col-span-2">
                    <Label className={`${labelClass} mb-3`}>Dirección</Label>
                    <Input
                        name="direccion"
                        required
                        onChange={handleChange}
                        value={form.direccion}
                        className={inputClass}
                    />
                </div>

                {/* Teléfono */}
                <div className="md:col-span-2">
                    <Label className={`${labelClass} mb-3`}>Teléfono</Label>
                    <Input
                        name="telefono"
                        required
                        pattern="^\d{10}$"
                        title="Debe tener exactamente 10 dígitos"
                        onChange={handleChange}
                        value={form.telefono}
                        className={inputClass}
                    />
                </div>

                {/* Botón */}
                <div className="md:col-span-2">
                    <Button className={buttonPrimaryClass} type="submit">
                        Guardar cambios
                    </Button>
                </div>

            </form>
        </div>
    )
}