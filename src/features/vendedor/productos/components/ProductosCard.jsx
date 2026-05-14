import { FiPlus, FiMinus } from "react-icons/fi"
import BaseCard from "../../../shared/components/BaseCard"

export default function ProductoCard({
    producto,
    onIncrease,
    onDecrease,
    esCliente,
    onAddCart
}) {

    return (
        <BaseCard
            image={producto.imagen}
            title={producto.nombre}
            description={producto.descripcion}
        >

            {esCliente ? (

                <button
                    onClick={() => onAddCart(producto)}
                    className="
                        w-full
                        bg-emerald-600
                        hover:bg-emerald-700
                        text-white
                        rounded-lg
                        py-2
                        font-medium
                        transition
                    "
                >
                    Agregar al carrito
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