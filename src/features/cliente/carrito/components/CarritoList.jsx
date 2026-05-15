import CarritoItem from "../components/CarritoItem"

export default function CarritoList({
    carrito,
    onCantidadChange,
    onRemove
}) {

    return (
        <div className="flex flex-col gap-4">

            {carrito.map((producto) => (
                <CarritoItem
                    key={producto.id}
                    producto={producto}
                    onCantidadChange={onCantidadChange}
                    onRemove={onRemove}
                />
            ))}

        </div>
    )
}