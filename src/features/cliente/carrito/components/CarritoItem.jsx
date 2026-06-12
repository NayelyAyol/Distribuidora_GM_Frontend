import { useState, useEffect } from "react";
import { FiTrash2, FiPlus, FiMinus } from "react-icons/fi";
import { toast } from "react-toastify";

export default function CarritoItem({
    producto,
    onCantidadChange,
    onRemove,
    editable = true
}) {
    const [cantidadLocal, setCantidadLocal] = useState(producto.cantidad);

    const stockDisponible = producto.stockDisponible ?? 0;
    const limiteEfectivo = stockDisponible - 5;

    useEffect(() => {
        setCantidadLocal(producto.cantidad);
    }, [producto.cantidad]);

    const actualizarCantidad = async (nuevaCantidad) => {
        console.log("Datos del producto:", producto);
        let valor = nuevaCantidad;

        const stockMax = producto.stockDisponible ?? Infinity;

        if (valor >= stockMax) {
            valor = stockMax;
            toast.warning(`Stock máximo alcanzado: ${stockMax}`);
        }

        if (valor < 1) valor = 1;

        if (valor === cantidadLocal) return;

        setCantidadLocal(valor);

        try {
            await onCantidadChange(producto.producto, valor);
        } catch (error) {
            console.error(error);
            setCantidadLocal(cantidadLocal);
        }
    };

    return (
        <div className="flex items-center justify-between bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition">

            <div className="flex items-center gap-3">
                <img
                    src={producto.imagen?.url || "/images/categories/default.webp"}
                    alt={producto.nombreProducto}
                    className="w-16 h-16 rounded-lg object-cover"
                />
                <div>
                    <h3 className="font-semibold text-gray-800">{producto.nombreProducto}</h3>
                    <p className="text-sm text-gray-500">
                        ${producto.precioUnitario.toFixed(2)} c/u
                    </p>
                </div>
            </div>

            <div className="flex items-center gap-4">

                {editable && (
                    <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">

                        <button
                            onClick={() => actualizarCantidad(cantidadLocal - 1)}
                            disabled={cantidadLocal <= 1}
                            className="p-2 hover:bg-gray-100 text-gray-600 transition disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                            <FiMinus size={14} />
                        </button>

                        <span className="w-8 text-center text-sm font-medium">
                            {cantidadLocal}
                        </span>

                        <button
                            onClick={() => actualizarCantidad(cantidadLocal + 1)}
                            disabled={cantidadLocal >= limiteEfectivo}
                            className="p-2 hover:bg-gray-100 text-gray-600 transition disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                            <FiPlus size={14} />
                        </button>
                    </div>
                )}

                <div className="w-20 text-right font-bold text-gray-800">
                    ${(producto.precioUnitario * cantidadLocal).toFixed(2)}
                </div>

                {editable && (
                    <button
                        onClick={() => onRemove(producto.producto)}
                        className="text-red-500 hover:text-red-700 p-2"
                    >
                        <FiTrash2 />
                    </button>
                )}
            </div>
        </div>
    );
}