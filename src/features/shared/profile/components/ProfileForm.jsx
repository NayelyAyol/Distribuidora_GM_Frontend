import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

import {
    inputClass,
    labelClass,
    buttonPrimaryClass
} from "@/utils/styles"

export default function ProfileForm() {

    const [form, setForm] = useState({
        nombre: "",
        apellido: "",
        email: "",
        direccion: "",
        celular: ""
    })

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        // 👇 solo validación HTML por ahora
        if (!e.target.checkValidity()) {
            e.target.reportValidity()
            return
        }

        // 🚧 lógica vendrá después
        console.log("Formulario listo:", form)
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
                    <Label className={labelClass}>Nombre</Label>
                    <Input
                        name="nombre"
                        required
                        onChange={handleChange}
                        value={form.nombre}
                        className={inputClass}
                    />
                </div>

                <div>
                    <Label className={labelClass}>Apellido</Label>
                    <Input
                        name="apellido"
                        required
                        onChange={handleChange}
                        value={form.apellido}
                        className={inputClass}
                    />
                </div>

                <div className="md:col-span-2">
                    <Label className={labelClass}>Email</Label>
                    <Input
                        type="email"
                        name="email"
                        required
                        onChange={handleChange}
                        value={form.email}
                        className={inputClass}
                    />
                </div>

                <div className="md:col-span-2">
                    <Label className={labelClass}>Dirección</Label>
                    <Input
                        name="direccion"
                        required
                        onChange={handleChange}
                        value={form.direccion}
                        className={inputClass}
                    />
                </div>

                <div className="md:col-span-2">
                    <Label className={labelClass}>Celular</Label>
                    <Input
                        name="celular"
                        required
                        onChange={handleChange}
                        value={form.celular}
                        className={inputClass}
                    />
                </div>

                <div className="md:col-span-2">
                    <Button className={buttonPrimaryClass}>
                        Guardar cambios
                    </Button>
                </div>

            </form>
        </div>
    )
}