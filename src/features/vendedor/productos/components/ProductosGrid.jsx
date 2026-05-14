import ProductoCard from "./ProductosCard"

export default function ProductosGrid({
    productos,
    onIncrease,
    onDecrease
}) {

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

            {productos.map((producto) => (
                <ProductoCard
                    key={producto._id}
                    producto={producto}
                    onIncrease={onIncrease}
                    onDecrease={onDecrease}
                />
            ))}

        </div>
    )
}