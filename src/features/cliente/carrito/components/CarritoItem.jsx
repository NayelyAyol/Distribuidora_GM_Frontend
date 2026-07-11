import { useState, useEffect, useRef } from "react";
import { FiTrash2, FiPlus, FiMinus } from "react-icons/fi";
import { obtenerPrecioUnitario } from "@/utils/calcularFactura";

export default function CarritoItem({
    producto,
    onCantidadChange,
    onRemove,
    editable = true
}) {
    const [cantidadLocal, setCantidadLocal] = useState(producto.cantidad);
    const [stockLocal, setStockLocal] = useState(producto.stockDisponible ?? 0);

    const debounceRef = useRef(null);
    const requestIdRef = useRef(0);
    const stockRef = useRef(stockLocal);

    const sinStock = stockLocal <= 0;
    const enLimiteStock = cantidadLocal >= stockLocal;
    const precioUnitario = obtenerPrecioUnitario({ ...producto, cantidad: cantidadLocal });

    useEffect(() => {
        if (!debounceRef.current) {
            setCantidadLocal(producto.cantidad);
        }
        setStockLocal(producto.stockDisponible ?? 0);
        stockRef.current = producto.stockDisponible ?? 0;
    }, [producto.cantidad, producto.stockDisponible]);

    const enviarCambio = (valor) => {
        if (debounceRef.current) clearTimeout(debounceRef.current);

        debounceRef.current = setTimeout(async () => {
            debounceRef.current = null;
            const miRequestId = ++requestIdRef.current;
            try {
                await onCantidadChange(producto.producto, valor);
            } catch {
                if (miRequestId === requestIdRef.current) {
                    setCantidadLocal(producto.cantidad);
                }
            }
        }, 400);
    };

    const actualizarCantidad = (delta) => {
        setCantidadLocal((prev) => {
            let valor = prev + delta;
            if (valor < 1) valor = 1;
            if (delta > 0 && valor > stockRef.current) return prev;
            enviarCambio(valor);
            return valor;
        });
    };

    return (
        <div className="flex flex-col sm:flex-row sm:items-center bg-white p-3 sm:p-4 rounded-xl shadow-sm hover:shadow-md transition gap-3">

            <div className="flex items-center gap-3 min-w-0 flex-1">
                <img
                    src={producto.imagen?.url || "/images/categories/default.webp"}
                    alt={producto.nombreProducto}
                    className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg object-cover shrink-0"
                />
                <div className="min-w-0">
                    <h3 className="font-semibold text-gray-800 text-sm sm:text-base break-words">
                        {producto.nombreProducto}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-500">
                        ${precioUnitario.toFixed(2)} c/u
                    </p>
                    {sinStock ? (
                        <p className="text-xs text-red-500 mt-0.5 font-medium">
                            Sin stock disponible — elimínalo para continuar
                        </p>
                    ) : enLimiteStock && (
                        <p className="text-xs text-amber-500 mt-0.5">
                            Solo hay {stockLocal} disponibles
                        </p>
                    )}
                </div>
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-4">

                {editable && (
                    <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                        <button
                            aria-label="Disminuir"
                            onClick={() => actualizarCantidad(-1)}
                            disabled={cantidadLocal <= 1}
                            className="p-1.5 sm:p-2 hover:bg-gray-100 text-gray-600 transition disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                            <FiMinus size={13} />
                        </button>
                        <span className="w-7 sm:w-8 text-center text-sm font-medium">
                            {cantidadLocal}
                        </span>
                        <button
                            aria-label="Aumentar"
                            onClick={() => actualizarCantidad(1)}
                            disabled={enLimiteStock}
                            className="p-1.5 sm:p-2 hover:bg-gray-100 text-gray-600 transition disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                            <FiPlus size={13} />
                        </button>
                    </div>
                )}

                <div className="w-16 sm:w-20 text-right font-bold text-gray-800 text-sm sm:text-base shrink-0">
                    ${(precioUnitario * cantidadLocal).toFixed(2)}
                </div>

                {editable && (
                    <button
                        aria-label="Eliminar"
                        onClick={() => onRemove(producto.producto)}
                        className="text-red-500 hover:text-red-700 p-1.5 sm:p-2 shrink-0"
                    >
                        <FiTrash2 size={16} />
                    </button>
                )}
            </div>
        </div>
    )
}