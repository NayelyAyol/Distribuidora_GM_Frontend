import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

import {
    inputClass,
    labelClass,
    buttonPrimaryClass
} from "@/utils/styles"

export default function CategoriaForm() {

    const [form, setForm] = useState({
        nombre: "",
        descripcion: ""
    })

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(form)
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white/80 backdrop-blur-xl border border-gray-200 shadow-lg rounded-2xl p-6 flex flex-col gap-4"
        >

            <h2 className="text-lg font-bold text-gray-800">
                Crear categoría
            </h2>

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
                <Label className={labelClass}>Descripción</Label>
                <Input
                    name="descripcion"
                    required
                    onChange={handleChange}
                    value={form.descripcion}
                    className={inputClass}
                />
            </div>

            <Button type="submit" className={buttonPrimaryClass}>
                Guardar categoría
            </Button>

        </form>
    )
}