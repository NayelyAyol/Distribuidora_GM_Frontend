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

            if (value.length > 50) return

            if (
                !/^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9\s#.,\-°]*$/.test(value)
            ) {
                return
            }
        }

        setForm({
            ...form,
            [name]: value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        // Nombre
        if (form.nombre.trim().length < 3 || form.nombre.trim().length > 15) {
            toast.error("El nombre debe tener entre 3 y 15 caracteres")
            return
        }

        if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(form.nombre)) {
            toast.error("El nombre solo debe contener letras")
            return
        }

        // Apellido
        if (form.apellido.trim().length < 3 || form.apellido.trim().length > 20) {
            toast.error("El apellido debe tener entre 3 y 20 caracteres")
            return
        }

        if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(form.apellido)) {
            toast.error("El apellido solo debe contener letras")
            return
        }

        // Dirección
        if (form.direccion.trim().length < 5 || form.direccion.trim().length > 50) {
            toast.error("La dirección debe tener entre 5 y 50 caracteres")
            return
        }

        if (
            !/^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9\s#.,\-°]+$/.test(form.direccion)
        ) {
            toast.error("La dirección contiene caracteres no válidos")
            return
        }

        // Teléfono
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

                <div>
                    <Label className={`${labelClass} mb-3`}>Nombre</Label>
                    <Input
                        name="nombre"
                        required
                        minLength={3}
                        maxLength={15}
                        pattern="^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$"
                        title="Solo se permiten letras. Entre 3 y 15 caracteres."
                        onChange={handleChange}
                        value={form.nombre}
                        className={inputClass}
                    />
                </div>

                <div>
                    <Label className={`${labelClass} mb-3`}>Apellido</Label>
                    <Input
                        name="apellido"
                        required
                        minLength={3}
                        maxLength={20}
                        pattern="^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$"
                        title="Solo letras. Entre 3 y 20 caracteres."
                        onChange={handleChange}
                        value={form.apellido}
                        className={inputClass}
                    />
                </div>

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

                <div className="md:col-span-2">
                    <Label className={`${labelClass} mb-3`}>Dirección</Label>
                    <Input
                        name="direccion"
                        required
                        minLength={5}
                        maxLength={50}
                        pattern="^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9\s#.,\-°]+$"
                        title="Entre 5 y 50 caracteres. Solo letras, números y # . , - °"

                        onChange={handleChange}
                        value={form.direccion}
                        className={inputClass}
                    />
                </div>

                <div className="md:col-span-2">
                    <Label className={`${labelClass} mb-3`}>Teléfono</Label>
                    <Input
                        name="telefono"
                        required
                        minLength={10}
                        maxLength={10}
                        pattern="^\d{10}$"
                        title="Debe tener exactamente 10 dígitos"
                        onChange={handleChange}
                        value={form.telefono}
                        className={inputClass}
                    />
                </div>

                <div className="md:col-span-2">
                    <Button className={buttonPrimaryClass} type="submit">
                        Guardar
                    </Button>
                </div>

            </form>
        </div>
    )
}