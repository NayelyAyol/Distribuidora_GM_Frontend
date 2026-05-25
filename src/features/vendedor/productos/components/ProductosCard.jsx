import { MdAddShoppingCart } from "react-icons/md"
import BaseCard from "../../../shared/components/BaseCard"
import {
    FiMinus,
    FiPlus,
    FiSlash
} from "react-icons/fi"

export default function ProductoCard({
    producto,
    onIncrease,
    onDecrease,
    esCliente,
    onAddCart,
    onEdit,
    esVendedor,
    onSelectProducto,
    onToggleEstado
}) {

    return (

        <div className="relative">
            {esVendedor && (
                <button
                    onClick={(e) => {
                        e.stopPropagation()
                        onToggleEstado(producto)
                    }}
                    className={`absolute top-6 left-5 z-10 w-10 h-10 rounded-full flex items-center justify-center transition shadow-sm
                        ${producto.estado
                            ? "bg-emerald-100 text-emerald-600 hover:bg-emerald-200"
                            : "bg-red-100 text-red-600 hover:bg-red-200"
                        }
                    `}
                >

                    <FiSlash className="text-lg" />

                </button>

            )}

            <BaseCard
                image={producto.imagen?.url}
                title={producto.nombre}
                description={producto.descripcion}
                price={esCliente ? producto.precioVenta : null}
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

                    <div className="flex flex-col items-center gap-4 w-full">

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

                            <span className="font-bold text-lg min-w-[30px] text-center">
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

        </div>
    )
}