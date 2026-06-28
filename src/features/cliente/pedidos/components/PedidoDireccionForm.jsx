import { Input } from "@/components/ui/input"

export default function PedidoDireccionForm({ form, handleChange, errors ={}}) {
    return (
        <div className="bg-white/60 backdrop-blur-xl rounded-3xl border border-white/20 p-6 space-y-6">
            <h2 className="text-lg font-semibold text-gray-800">Dirección de entrega</h2>

            <div>
                <label className="text-green-900 font-medium">Costo de envío: $3.50</label>
            </div>

            <div className="space-y-1">
            <Input
                placeholder="Ej: Av. Amazonas y Colón, edificio X"
                name="direccion"
                value={form.direccion}
                onChange={handleChange}
                maxLength={80}
                className="h-12 rounded-xl"
            />
            {errors.direccion && <p className="text-red-500 text-sm font-medium">{errors.direccion}</p>}
            </div>
            <div className="space-y-1">
            <Input
                placeholder="Ej: Frente al parque, casa azul"
                name="referencia"
                value={form.referencia}
                onChange={handleChange}
                maxLength={80}
                className="h-12 rounded-xl"
            />
            {errors.referencia && <p className="text-red-500 text-sm font-medium">{errors.referencia}</p>}
            </div>
        </div>
    )
}