import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { MdFileUpload } from "react-icons/md"

import {
    inputClass,
    labelClass,
    buttonPrimaryClass
} from "@/utils/styles"

export default function CategoriaForm() {

    const [form, setForm] = useState({
        nombre: "",
        descripcion: "",
        imagen: null
    })

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    return (
        <div className="bg-white/80 backdrop-blur-xl border border-gray-200 shadow-lg rounded-2xl p-4">

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

                <div className="h-full w-full rounded-xl bg-emerald-50 flex items-center justify-center">

                    <label className="flex h-full w-full flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 cursor-pointer hover:bg-emerald-100/40 transition">

                        <MdFileUpload className="text-[60px] text-emerald-500" />

                        <p className="mt-2 text-sm text-gray-600">
                            Subir imagen
                        </p>

                        <input
                            type="file"
                            className="hidden"
                        />

                    </label>

                </div>

                <div className="flex flex-col justify-center gap-4">

                    <h2 className="text-lg font-bold text-gray-800">
                        Crear categoría
                    </h2>

                    <div>
                        <Label className={`${labelClass} pb-2`}>Nombre</Label>
                        <Input
                            name="nombre"
                            value={form.nombre}
                            onChange={handleChange}
                            className={inputClass}
                        />
                    </div>

                    <div>
                        <Label className={`${labelClass} pb-2`}>Descripción</Label>
                        <Input
                            name="descripcion"
                            value={form.descripcion}
                            onChange={handleChange}
                            className={inputClass}
                        />
                    </div>

                    <Button className={buttonPrimaryClass}>
                        Aceptar
                    </Button>

                </div>

            </div>
        </div>
    )
}