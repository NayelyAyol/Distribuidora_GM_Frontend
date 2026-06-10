import CarritoItem from "../components/CarritoItem"

export default function CarritoList({
    editable = true,
    carrito,
    onCantidadChange,
    onRemove,
    onVaciar
}) {

    return (
            <div className="flex flex-col gap-4">
                        <div className="flex justify-between items-center mb-2">
                            <h2 className="text-xl font-bold text-gray-800">Productos</h2>
                            {carrito.length > 0 && (
                                <button 
                                    onClick={onVaciar}
                                    className="
                                        bg-white 
                                        border border-gray-200 
                                        hover:bg-emerald-50 
                                        text-emerald-900 
                                        font-semibold 
                                        text-sm 
                                        px-4 py-2 
                                        rounded-xl 
                                        shadow-xs 
                                        transition-all 
                                        duration-200
                                        flex items-center gap-2
                                    "
                                    >
                                    Vaciar carrito
                                </button>
                            )}
                        </div>

            {carrito.map((producto) => (
                <CarritoItem
                    key={producto.producto}
                    producto={producto}
                    onCantidadChange={onCantidadChange}
                    onRemove={onRemove}
                    editable={editable}
                />
            ))}

        </div>
    )
}