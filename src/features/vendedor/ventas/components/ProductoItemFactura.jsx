import { FiTrash2, FiPlus, FiMinus } from "react-icons/fi";
import { toast } from "react-toastify";

export default function ProductoItemFactura({
    producto,
    onDelete,
    onCantidadChange,
    esEditable=true
}) {

    const aumentarCantidad = () => {

        if (producto.cantidad >= producto.stock) {

            toast.warning(
                `Stock disponible: ${producto.stock}`,
                {
                    toastId: `stock-${producto.id}`
                }
            );

            return;
        }

        onCantidadChange(
            producto.id,
            producto.cantidad + 1
        );
    };

    const disminuirCantidad = () => {

        if (producto.cantidad <= 1) return;

        onCantidadChange(
            producto.id,
            producto.cantidad - 1
        );
    };
    const nombreMostrado = producto.nombre || producto.nombreProducto || "Sin nombre";
    const precioMostrado = producto.precio ?? producto.precioUnitario ?? 0;

    console.log("PRODUCTO FACTURA:", producto);
    return (

        <div
            className="
                flex justify-between
                items-center
                bg-white
                rounded-xl
                p-4
                border
                shadow-sm
            "
        >

            <div>

                <p className="font-semibold text-emerald-900 truncate max-w-[150px]"
                title={nombreMostrado}
                >
                    {nombreMostrado}
                </p>

                {(producto.stock !== undefined && producto.stock !== null) && (
                    <p className="text-sm text-gray-500">
                        Stock: {producto.stock}
                    </p>
                )}

                <p className="text-sm text-gray-500">
                    ${precioMostrado}
                </p>

            </div>

            <div className="flex items-center gap-4 flex-shrink-0">

            {esEditable && (
                <div
                    className="
                        flex
                        items-center
                        gap-2
                        border
                        rounded-lg
                        px-2
                        py-1
                    "
                >

                    <button
                        onClick={disminuirCantidad}
                        className="
                            p-1
                            rounded
                            hover:bg-gray-100
                        "
                    >
                        <FiMinus />
                    </button>

                    <span className="w-8 text-center">
                        {producto.cantidad}
                    </span>

                    <button
                        onClick={aumentarCantidad}
                        className="
                            p-1
                            rounded
                            hover:bg-gray-100
                        "
                    >
                        <FiPlus />
                    </button>

                </div>
                )}

            {esEditable && (
                <button
                    onClick={() => onDelete(producto.id)}
                    className="
                        text-red-500
                        hover:text-red-700
                    "
                >
                    <FiTrash2 />
                </button>
            )}
            </div>

        </div>

    );
}