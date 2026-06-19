export default function PedidoObservacionesForm({ form, handleChange }) {
    return (
        <div className="space-y-4">
            <div>
                <h2 className="text-lg font-semibold text-gray-800">Observaciones</h2>
                <p className="text-sm text-gray-500">Información adicional del pedido</p>
            </div>

            <textarea
                name="observaciones"
                value={form.observaciones}
                onChange={handleChange}
                placeholder="Ejemplo: Necesito entrega urgente..."
                maxLength={300}
                className="w-full rounded-2xl border border-gray-200 p-4 resize-none outline-none focus:ring-2 h-[150px] focus:ring-emerald-200"
            />
            <p className="text-xs text-gray-400 text-right mt-1">{form.observaciones.length}/300</p>
        </div>
    )
}