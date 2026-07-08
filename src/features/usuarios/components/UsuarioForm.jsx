import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { MdVisibility, MdVisibilityOff } from "react-icons/md"
import { inputClass, labelClass, buttonPrimaryClass } from "@/utils/styles"
import useUsuarioForm from "../hooks/useUsuarioForm"

export default function UsuarioForm({ onSuccess }) {

    const {
        form,
        errors,
        loading,
        showPassword,
        showConfirmPassword,
        setShowPassword,
        setShowConfirmPassword,
        handleChange,
        handleSubmit
    } = useUsuarioForm(onSuccess)

    return (
        <form className="grid grid-cols-1 md:grid-cols-2 gap-5" onSubmit={handleSubmit} noValidate>

            <div>
                <Label className={`${labelClass} pb-2`}>Nombre</Label>
                <Input
                    name="nombre"
                    value={form.nombre}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="Ej: Juan"
                    maxLength={15}
                />
                {errors.nombre && <p className="text-red-500 text-sm font-medium mt-1">{errors.nombre}</p>}
            </div>

            <div>
                <Label className={`${labelClass} pb-2`}>Apellido</Label>
                <Input
                    name="apellido"
                    value={form.apellido}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="Ej: Pérez"
                    maxLength={20}
                />
                {errors.apellido && <p className="text-red-500 text-sm font-medium mt-1">{errors.apellido}</p>}
            </div>

            <div>
                <Label className={`${labelClass} pb-2`}>Cédula</Label>
                <Input
                    name="cedula"
                    value={form.cedula}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="10 dígitos"
                    maxLength={10}
                />
                {errors.cedula && <p className="text-red-500 text-sm font-medium mt-1">{errors.cedula}</p>}
            </div>

            <div>
                <Label className={`${labelClass} pb-2`}>Fecha de nacimiento</Label>
                <Input
                    type="date"
                    name="fecha_nacimiento"
                    value={form.fecha_nacimiento}
                    onChange={handleChange}
                    className={inputClass}
                />
                {errors.fecha_nacimiento && <p className="text-red-500 text-sm font-medium mt-1">{errors.fecha_nacimiento}</p>}
            </div>

            <div>
                <Label className={`${labelClass} pb-2`}>Teléfono</Label>
                <Input
                    name="telefono"
                    value={form.telefono}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="10 dígitos"
                    maxLength={10}
                />
                {errors.telefono && <p className="text-red-500 text-sm font-medium mt-1">{errors.telefono}</p>}
            </div>

            <div>
                <Label className={`${labelClass} pb-2`}>Dirección</Label>
                <Input
                    name="direccion"
                    value={form.direccion}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="Ej: Av. Amazonas 123"
                    maxLength={30}
                />
                {errors.direccion && <p className="text-red-500 text-sm font-medium mt-1">{errors.direccion}</p>}
            </div>

            <div className="md:col-span-2">
                <Label className={`${labelClass} pb-2`}>Email</Label>
                <Input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="correo@ejemplo.com"
                    onKeyDown={(e) => { if (e.key === " ") e.preventDefault() }}
                    maxLength={100}
                />
                {errors.email && <p className="text-red-500 text-sm font-medium mt-1">{errors.email}</p>}
            </div>

            <div className="relative">
                <Label className={`${labelClass} pb-2`}>Contraseña</Label>
                <Input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={form.password}
                    onChange={handleChange}
                    className={inputClass + " pr-10"}
                    placeholder="8-16 caracteres"
                    maxLength={16}
                />
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-9 text-emerald-900"
                >
                    {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
                </button>
                {errors.password && <p className="text-red-500 text-sm font-medium mt-1">{errors.password}</p>}
            </div>

            <div className="relative">
                <Label className={`${labelClass} pb-2`}>Confirmar contraseña</Label>
                <Input
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={form.confirmPassword}
                    onChange={handleChange}
                    className={inputClass + " pr-10"}
                    placeholder="Repite tu contraseña"
                    maxLength={16}
                />
                <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-9 text-emerald-900"
                >
                    {showConfirmPassword ? <MdVisibilityOff /> : <MdVisibility />}
                </button>
                {errors.confirmPassword && <p className="text-red-500 text-sm font-medium mt-1">{errors.confirmPassword}</p>}
            </div>

            <div className="md:col-span-2">
                <Button type="submit" disabled={loading} className={buttonPrimaryClass}>
                    {loading ? "Creando..." : "Aceptar"}
                </Button>
            </div>

        </form>
    )
}