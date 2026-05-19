import { FiTrash2 } from "react-icons/fi"

export default function CarritoItem({
    producto,
    onCantidadChange,
    onRemove,
    editable = true
}) {

    return (

        <div className="
            flex items-center justify-between
            bg-white
            p-4
            rounded-xl
            shadow-sm
            hover:shadow-md
            transition
        ">

            <div className="flex items-center gap-3">

                <img
                    src={producto.imagen}
                    alt={producto.nombre}
                    className="w-16 h-16 rounded-lg object-cover"
                />

                <div>

                    <h3 className="font-semibold text-gray-800">
                        {producto.nombre}
                    </h3>

                    <p className="text-sm text-gray-500">
                        ${producto.precio}
                    </p>

                    {
                        !editable && (
                            <p className="
                                text-sm text-gray-500
                            ">
                                Cantidad:
                                {" "}
                                {producto.cantidad}
                            </p>
                        )
                    }

                </div>

            </div>

            <div className="flex items-center gap-3">

                {
                    editable && (

                        <div className="flex items-center gap-2">

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
                                className="
                                    w-16 border rounded-lg
                                    px-2 py-1 text-sm
                                "
                            />

                        </div>

                    )
                }

                <div className="
                    w-20
                    text-right
                    font-bold
                ">
                    $
                    {(producto.precio * producto.cantidad)
                        .toFixed(2)}
                </div>

                {
                    editable && (
                        <button
                            onClick={() =>
                                onRemove(producto.id)
                            }
                            className="
                                text-red-500
                                hover:text-red-700
                            "
                        >
                            <FiTrash2 />
                        </button>
                    )
                }

            </div>

        </div>
    )
}