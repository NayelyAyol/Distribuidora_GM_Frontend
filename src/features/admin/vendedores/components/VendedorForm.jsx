import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { MdVisibility, MdVisibilityOff } from "react-icons/md"

import {
    inputClass,
    labelClass,
    buttonPrimaryClass
} from "@/utils/styles"

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

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value })

    return (
        <form className="grid grid-cols-1 md:grid-cols-2 gap-5">

            <div>
                <Label className={labelClass}>Nombre</Label>
                <Input name="nombre" onChange={handleChange} className={inputClass} />
            </div>

            <div>
                <Label className={labelClass}>Apellido</Label>
                <Input name="apellido" onChange={handleChange} className={inputClass} />
            </div>

            <div>
                <Label className={labelClass}>Cédula</Label>
                <Input name="cedula" onChange={handleChange} className={inputClass} />
            </div>

            <div>
                <Label className={labelClass}>Fecha nacimiento</Label>
                <Input type="date" name="fecha_nacimiento" onChange={handleChange} className={inputClass} />
            </div>

            <div>
                <Label className={labelClass}>Teléfono</Label>
                <Input name="telefono" onChange={handleChange} className={inputClass} />
            </div>

            <div>
                <Label className={labelClass}>Dirección</Label>
                <Input name="direccion" onChange={handleChange} className={inputClass} />
            </div>

            <div className="md:col-span-2">
                <Label className={labelClass}>Email</Label>
                <Input name="email" onChange={handleChange} className={inputClass} />
            </div>

            <div className="relative">
                <Label className={labelClass}>Contraseña</Label>
                <Input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    onChange={handleChange}
                    className={inputClass + " pr-10"}
                />

                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2/3 -translate-y-1/2 text-emerald-900 hover:text-black transition-colors"
                >
                    {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
                </button>
            </div>

            <div className="relative">
                <Label className={labelClass}>Confirmar contraseña</Label>
                <Input
                    name="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    onChange={handleChange}
                    className={inputClass + " pr-10"}
                />
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2/3 -translate-y-1/2 text-emerald-900 hover:text-black transition-colors"
                >
                    {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
                </button>
            </div>

            <div className="md:col-span-2">
                <Button className={buttonPrimaryClass}>
                    Crear Vendedor
                </Button>
            </div>

        </form>
    )
}