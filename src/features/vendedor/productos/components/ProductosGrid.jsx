import ProductoCard from "./ProductosCard"

export default function ProductosGrid({
    productos,
    onAddCart,
    onIncrease,
    onDecrease,
    onEdit,
    esVendedor,
    esCliente,
    onSelectProducto,
    onToggleEstado
}) {

    return (

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

            {productos.map((producto) => (

                <ProductoCard
                    key={producto._id}
                    producto={producto}
                    onAddCart={onAddCart}
                    onIncrease={onIncrease}
                    onDecrease={onDecrease}
                    onEdit={onEdit}
                    esVendedor={esVendedor}
                    esCliente={esCliente}
                    onSelectProducto={onSelectProducto}
                    onToggleEstado={onToggleEstado}
                />

            ))}

        </div>
    )
}