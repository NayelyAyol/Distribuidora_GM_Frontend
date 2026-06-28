import { Input } from "@/components/ui/input"

export default function PedidoDatosForm({ form, handleChange, errors = {} }) {
    return (
        <div className="space-y-6">
            <div className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-800">
                    Datos del usuario para facturación
                </h2>

                <div className="grid gap-4">
                    <div className="space-y-1">
                    <Input
                        placeholder="Nombre completo (solo letras)"
                        name="nombreCompleto"
                        value={form.nombreCompleto}
                        onChange={handleChange}
                        maxLength={80}
                        className="h-12 rounded-xl"
                    />
                        {errors.nombreCompleto && <p className="text-red-500 text-sm font-medium">{errors.nombreCompleto}</p>}
                    </div>
                    <div className="space-y-1">
                    <Input
                        placeholder="Cédula (10 dígitos) o RUC (13 dígitos)"
                        name="identificacion"
                        value={form.identificacion}
                        onChange={handleChange}
                        maxLength={13}
                        className="h-12 rounded-xl"
                    />
                        {errors.identificacion && <p className="text-red-500 text-sm font-medium">{errors.identificacion}</p>}
                    </div>
                    <div className="space-y-y1">
                    <Input
                        type="email"
                        placeholder="correo@ejemplo.com"
                        name="correo"
                        value={form.correo}
                        onChange={handleChange}
                        maxLength={100}
                        className="h-12 rounded-xl"
                    />
                        {errors.correo && <p className="text-red-500 text-sm font-medium">{errors.correo}</p>}
                    </div>
                    <div className="space-y-1">
                    <Input
                        placeholder="Celular (09XXXXXXXX)"
                        name="telefono"
                        value={form.telefono}
                        onChange={handleChange}
                        maxLength={10}
                        className="h-12 rounded-xl"
                    />
                        {errors.telefono && <p className="text-red-500 text-sm font-medium">{errors.telefono}</p>}
                    </div>
                </div>
            </div>
        </div>
    )
}