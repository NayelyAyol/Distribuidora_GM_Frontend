import { Input } from "@/components/ui/input"

export default function PedidoDatosForm({ form, handleChange }) {
    return (
        <div className="space-y-6">
            <div className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-800">
                    Datos del usuario para facturación
                </h2>

                <div className="grid gap-4">
                    <Input
                        placeholder="Nombre completo (solo letras)"
                        name="nombreCompleto"
                        value={form.nombreCompleto}
                        onChange={handleChange}
                        maxLength={80}
                        className="h-12 rounded-xl"
                    />
                    <Input
                        placeholder="Cédula (10 dígitos) o RUC (13 dígitos)"
                        name="identificacion"
                        value={form.identificacion}
                        onChange={handleChange}
                        maxLength={13}
                        className="h-12 rounded-xl"
                    />
                    <Input
                        type="email"
                        placeholder="correo@ejemplo.com"
                        name="correo"
                        value={form.correo}
                        onChange={handleChange}
                        maxLength={100}
                        className="h-12 rounded-xl"
                    />
                    <Input
                        placeholder="Celular (09XXXXXXXX)"
                        name="telefono"
                        value={form.telefono}
                        onChange={handleChange}
                        maxLength={10}
                        className="h-12 rounded-xl"
                    />
                </div>
            </div>
        </div>
    )
}