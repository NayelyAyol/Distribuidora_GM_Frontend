import { FiStar } from "react-icons/fi"

export default function PanelProducto({ producto, cantidad, setCantidad }) {

    return (
        <div>

            <img
                src={producto.imagen}
                className="w-full h-[250px] object-cover rounded-xl"
            />

            <h2 className="text-2xl font-bold mt-3">
                {producto.nombre}
            </h2>

            <p className="text-gray-500">
                {producto.descripcion}
            </p>

            <div className="flex items-center gap-2 mt-2">
                <FiStar className="text-yellow-400" />
                <span>4.5</span>
            </div>

            <div className="mt-4 flex items-center gap-3">
                <button
                    onClick={() => setCantidad(Math.max(1, cantidad - 1))}
                    className="px-3 py-1 bg-gray-200 rounded"
                >
                    -
                </button>

                <span>{cantidad}</span>

                <button
                    onClick={() => setCantidad(cantidad + 1)}
                    className="px-3 py-1 bg-gray-200 rounded"
                >
                    +
                </button>
            </div>

            <button className="mt-4 w-full bg-black text-white py-2 rounded-xl">
                Agregar al carrito
            </button>

        </div>
    )
}