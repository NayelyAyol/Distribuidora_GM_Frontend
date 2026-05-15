import { FiTrash2 } from "react-icons/fi"

export default function ProductoItemFactura({
    producto,
    onDelete,
    onCantidadChange
}) {

    return (
        <div className="flex justify-between items-center bg-white rounded-xl p-3 border shadow-sm">

            <div>
                <p className="font-semibold text-emerald-900">
                    {producto.nombre}
                </p>

                <div className="flex items-center gap-2 mt-1">
                    <input
                        type="number"
                        min="1"
                        value={producto.cantidad}
                        onChange={(e) =>
                            onCantidadChange(
                                producto.id,
                                Number(e.target.value)
                            )
                        }
                        className="w-16 border rounded-lg px-2 py-1 text-sm"
                    />

                    <p className="text-sm text-gray-500">
                        x ${producto.precio}
                    </p>
                </div>
            </div>

            <button
                onClick={() => onDelete(producto.id)}
                className="text-red-500 hover:text-red-700"
            >
                <FiTrash2 />
            </button>

        </div>
    )
}