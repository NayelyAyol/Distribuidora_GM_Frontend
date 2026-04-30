export default function ProductoDetailPage() {

    return (
        <div className="p-6 flex flex-col gap-6">

            <h1 className="text-xl font-bold text-emerald-900">
                Detalle del producto
            </h1>

            <div className="bg-white p-4 rounded-xl shadow">
                <p>Nombre: Coca Cola</p>
                <p>Stock actual: 10</p>
            </div>

            <div className="bg-white p-4 rounded-xl shadow flex gap-3 items-center">

                <input
                    type="number"
                    min="0"
                    className="border p-2 rounded w-40"
                    placeholder="Nuevo stock"
                />

                <button className="bg-emerald-600 text-white px-4 py-2 rounded">
                    Actualizar
                </button>

            </div>

            {/* ESCÁNER */}
            <div className="bg-white p-4 rounded-xl shadow">
                <button className="bg-black text-white px-4 py-2 rounded">
                    Escanear producto 📷
                </button>
            </div>

            {/* HISTORIAL */}
            <div className="bg-white p-4 rounded-xl shadow">
                <h2 className="font-bold mb-2">Historial</h2>

                <p>- Stock actualizado a 10</p>
                <p>- Stock reducido a 5</p>
            </div>

        </div>
    )
}