import { MdAddShoppingCart } from "react-icons/md"
import BaseCard from "../../../shared/components/BaseCard"

export default function ProductoCard({
    producto,
    onIncrease,
    onDecrease,
    esCliente,
    onAddCart,
    onEdit,
    esVendedor,
    onSelectProducto
}) {

    return (
        <BaseCard
            image={producto.imagen}
            title={producto.nombre}
            description={producto.descripcion}
            onEdit={() => onEdit(producto)}
            esVendedor={esVendedor}
            onClick={() => onSelectProducto?.(producto)} 
        >

            {esCliente ? (

                <button
                    onClick={(e) => {
                        e.stopPropagation()
                        onAddCart(producto)
                    }}
                    className="
                        w-[60px]
                        bg-emerald-200
                        hover:bg-emerald-300
                        text-white
                        rounded-lg
                        py-2
                        transition
                        flex
                        items-center
                        justify-center                
                        justify-self-end
                    "
                >
                    <MdAddShoppingCart className="text-xl text-black" />
                </button>

            ) : (

                <div className="flex items-center justify-between">

                    <div className="flex items-center gap-6 justify-center w-full">

                        <button
                            onClick={() => onDecrease(producto._id)}
                            className="
                                w-9 h-9 rounded-full
                                bg-red-100 text-red-600
                                flex items-center justify-center
                                hover:bg-red-200 transition
                            "
                        >
                            <FiMinus />
                        </button>

                        <span className="font-bold text-lg">
                            {producto.stock}
                        </span>

                        <button
                            onClick={() => onIncrease(producto._id)}
                            className="
                                w-9 h-9 rounded-full
                                bg-emerald-100 text-emerald-600
                                flex items-center justify-center
                                hover:bg-emerald-200 transition
                            "
                        >
                            <FiPlus />
                        </button>

                    </div>

                </div>

            )}

        </BaseCard>
    )
}