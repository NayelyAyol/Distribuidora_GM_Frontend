import { Input } from "@/components/ui/input"

export default function PedidoDatosForm({
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
                        Datos del usuario para facturación
                    </h2>

                </div>

                <div className="grid gap-4">

                    <Input
                        placeholder="Nombre completo"
                        name="nombreCompleto"
                        value={form.nombreCompleto}
                        onChange={handleChange}
                        maxLength={50}
                        className="
                            h-12
                            rounded-xl
                        "
                    />

                    <Input
                        id="identificacion"
                        placeholder="Cédula o RUC"
                        name="identificacion"
                        value={form.identificacion}
                        onChange={handleChange}
                        maxLength={13}
                        className="
                            h-12
                            rounded-xl
                        "
                    />

                    <Input
                        type="email"
                        id="correo"
                        placeholder="Correo"
                        name="correo"
                        value={form.correo}
                        onChange={handleChange}
                        maxLength={100}
                        className="
                            h-12
                            rounded-xl
                        "
                    />

                    <Input
                        id="telefono"
                        placeholder="Teléfono de respaldo"
                        name="telefono"
                        value={form.telefono}
                        onChange={handleChange}
                        maxLength={10}
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