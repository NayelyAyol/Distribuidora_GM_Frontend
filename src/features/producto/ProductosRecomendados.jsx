import { useNavigate } from "react-router-dom"
import { MdAddShoppingCart } from "react-icons/md"

import BaseCard from "../shared/components/BaseCard"

export default function ProductosRecomendados({
    productos,
    onAddCart
}) {

    const navigate = useNavigate()

    return (
        <div>

            <h3 className="font-bold mb-3">
                Recomendados
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">

                {productos.map((p) => (

                    <BaseCard
                        key={p._id}
                        image={p.imagen}
                        title={p.nombre}
                        description={p.descripcion}
                        price={p.precioVenta}
                        onClick={() =>
                            navigate(`/dashboard/producto/${p._id}`)
                        }
                    >

                        <button
                            onClick={(e) => {
                                e.stopPropagation()
                                onAddCart?.(p)
                            }}
                            className="
                                w-[42px]
                                h-[42px]
                                bg-emerald-200
                                hover:bg-emerald-300
                                rounded-xl
                                transition
                                flex
                                items-center
                                justify-center
                            "
                        >
                            <MdAddShoppingCart
                                className="
                                    text-xl
                                    text-black
                                "
                            />
                        </button>

                    </BaseCard>

                ))}

            </div>

        </div>
    )
}