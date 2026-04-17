import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { MdVisibility, MdVisibilityOff } from "react-icons/md"

import {
    inputClass,
    labelClass,
    buttonPrimaryClass
} from "@/utils/styles"

import useVendedorForm from "../hooks/useVendedorForm"

export default function VendedorForm({ onSuccess }) {

    const {
        form,
        loading,
        showPassword,
        showConfirmPassword,
        setShowPassword,
        setShowConfirmPassword,
        handleChange,
        handleSubmit
    } = useVendedorForm(onSuccess)

    return (
        <form className="grid grid-cols-1 md:grid-cols-2 gap-5" onSubmit={handleSubmit}>

            <div>
                <Label className={labelClass}>Nombre</Label>
                <Input name="nombre" value={form.nombre} onChange={handleChange} required className={inputClass} />
            </div>

            <div>
                <Label className={labelClass}>Apellido</Label>
                <Input name="apellido" value={form.apellido} onChange={handleChange} required className={inputClass} />
            </div>

            <div>
                <Label className={labelClass}>Cédula</Label>
                <Input name="cedula" value={form.cedula} onChange={handleChange} required className={inputClass} />
            </div>

            <div>
                <Label className={labelClass}>Fecha nacimiento</Label>
                <Input type="date" name="fecha_nacimiento" value={form.fecha_nacimiento} onChange={handleChange} required className={inputClass} />
            </div>

            <div>
                <Label className={labelClass}>Teléfono</Label>
                <Input name="telefono" value={form.telefono} onChange={handleChange} required className={inputClass} />
            </div>

            <div>
                <Label className={labelClass}>Dirección</Label>
                <Input name="direccion" value={form.direccion} onChange={handleChange} required className={inputClass} />
            </div>

            <div className="md:col-span-2">
                <Label className={labelClass}>Email</Label>
                <Input type="email" name="email" value={form.email} onChange={handleChange} required className={inputClass} />
            </div>

            <div className="relative">
                <Label className={labelClass}>Contraseña</Label>

                <Input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={form.password}
                    onChange={handleChange}
                    required
                    className={inputClass + " pr-10"}
                />

                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-7 text-emerald-900"
                >
                    {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
                </button>
            </div>

            <div className="relative">
                <Label className={labelClass}>Confirmar contraseña</Label>

                <Input
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={form.confirmPassword}
                    onChange={handleChange}
                    required
                    className={inputClass + " pr-10"}
                />

                <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-7 text-emerald-900"
                >
                    {showConfirmPassword ? <MdVisibilityOff /> : <MdVisibility />}
                </button>
            </div>

            <div className="md:col-span-2">
                <Button type="submit" disabled={loading} className={buttonPrimaryClass}>
                    {loading ? "Creando..." : "Crear Vendedor"}
                </Button>
            </div>

        </form>
    )
}