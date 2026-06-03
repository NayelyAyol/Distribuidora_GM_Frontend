import { Input } from "@/components/ui/input"

export default function PedidoFacturacionForm({
    form,
    handleChange
}) {

    return (
        <div
            className="
                bg-white/60
                backdrop-blur-xl
                rounded-3xl
                border border-white/20
                p-6
                space-y-6
            "
        >

            <h2 className="text-lg font-semibold text-gray-800">
                Datos de facturación
            </h2>

            <Input
                placeholder="Nombre completo"
                name="nombre"
                value={form.nombre}
                onChange={handleChange}
                className="h-12 rounded-xl"
            />

            <Input
                placeholder="Cédula"
                name="cedula"
                value={form.cedula}
                onChange={handleChange}
                className="h-12 rounded-xl"
            />

            <Input
                placeholder="Correo electrónico"
                name="correo"
                value={form.correo}
                onChange={handleChange}
                className="h-12 rounded-xl"
            />

            <Input
                placeholder="Teléfono"
                name="telefono"
                value={form.telefono}
                onChange={handleChange}
                className="h-12 rounded-xl"
            />

        </div>
    )
}