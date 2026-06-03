export default function PedidoEntregaForm({
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
                Tipo de entrega
            </h2>

            <div className="flex gap-4 justify-between">

                <label className="flex items-center gap-2">
                    <input
                        type="radio"
                        name="tipoEntrega"
                        value="retiro"
                        checked={form.tipoEntrega === "retiro"}
                        onChange={handleChange}
                    />
                    Retirar en local
                </label>

                <label className="flex items-center gap-2">
                    <input
                        type="radio"
                        name="tipoEntrega"
                        value="envio"
                        checked={form.tipoEntrega === "envio"}
                        onChange={handleChange}
                    />
                    Envío a domicilio
                </label>

            </div>

        </div>
    )
}