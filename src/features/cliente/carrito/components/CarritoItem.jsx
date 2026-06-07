import { useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import { toast } from "react-toastify";

export default function CarritoItem({
    producto,
    onCantidadChange,
    onRemove,
    editable = true
}) {

    const [cantidadLocal, setCantidadLocal] = useState(producto.cantidad);

    const handleCantidadChange = async (e) => {

        const valorTexto = e.target.value;

        if (valorTexto === "") {
            setCantidadLocal("");
            return;
        }

        let valor = Number(valorTexto);

        if (valor < 1) {

            toast.warning(
                "La cantidad mínima es 1",
                {
                    toastId: "cantidad-minima"
                }
            );

            valor = 1;
        }

        if (valor > producto.stock) {

            toast.warning(
                `Stock disponible: ${producto.stock}`,
                {
                    toastId: "stock-maximo"
                }
            );

            valor = producto.stock;
        }

        setCantidadLocal(valor);

        try {
            await onCantidadChange(
                producto.producto,
                valor
            );
        } catch (error) {
            console.error(error);
        }
    };

    return (

        <div
            className="
                flex items-center justify-between
                bg-white
                p-4
                rounded-xl
                shadow-sm
                hover:shadow-md
                transition
            "
        >

            <div className="flex items-center gap-3">

                <img
                    src={
                        producto.imagen?.url ||
                        "/images/categories/default.webp"
                    }
                    alt={producto.nombreProducto}
                    className="
                        w-16 h-16
                        rounded-lg
                        object-cover
                    "
                />

                <div>

                    <h3 className="font-semibold text-gray-800">
                        {producto.nombreProducto}
                    </h3>

                    <p className="text-sm text-gray-500">
                        ${producto.precioUnitario.toFixed(2)} c/u
                    </p>

                    {
                        !editable && (
                            <p className="text-sm text-gray-500">
                                Cantidad: {producto.cantidad}
                            </p>
                        )
                    }

                </div>

            </div>

            <div className="flex items-center gap-3">

                {
                    editable && (

                        <input
                            type="number"
                            min="1"
                            max={producto.stock}
                            value={cantidadLocal}
                            onChange={handleCantidadChange}
                            className="
                                w-20
                                border
                                rounded-lg
                                px-2
                                py-1
                                text-sm
                            "
                        />

                    )
                }

                <div
                    className="
                        w-20
                        text-right
                        font-bold
                    "
                >
                    $
                    {(
                        producto.precioUnitario *
                        cantidadLocal
                    ).toFixed(2)}
                </div>

                {
                    editable && (
                        <button
                            onClick={() =>
                                onRemove(producto.producto)
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
    );
}