import { Input } from "@/components/ui/input"

export default function PedidoDireccionForm({
    form,
    handleChange
}) {

    return (

        <div className="space-y-6">

            <div className="space-y-4">

                <div>

                    <h2 className="
                        text-lg
                        font-semibold
                        text-gray-800
                    ">
                        Dirección de entrega
                    </h2>

                </div>

                <div className="grid gap-4">

                    <Input
                        placeholder="Dirección"
                        name="direccion"
                        value={form.direccion}
                        onChange={handleChange}
                        className="
                            h-12
                            rounded-xl
                        "
                    />

                    <Input
                        placeholder="Referencia"
                        name="referencia"
                        value={form.referencia}
                        onChange={handleChange}
                        className="
                            h-12
                            rounded-xl
                        "
                    />

                    <Input
                        placeholder="Teléfono"
                        name="telefono"
                        value={form.telefono}
                        onChange={handleChange}
                        className="
                            h-12
                            rounded-xl
                        "
                    />

                </div>

            </div>

        </div>
    )
}