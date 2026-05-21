import { useState } from "react"
import { FiX } from "react-icons/fi"
import PanelProducto from "./PanelProducto"
import ProductosRecomendados from "./ProductosRecomendados"

export default function VistaPreviaProducto({ producto, onClose, productos }) {

    const [cantidad, setCantidad] = useState(1)

    const recomendados = productos.filter(p =>
        p.categoriaId === producto.categoriaId && p._id !== producto._id
    )

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

            <div className="bg-white w-[95%] max-w-5xl rounded-2xl p-4 relative flex flex-col lg:flex-row gap-6">

                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-500"
                >
                    <FiX size={22} />
                </button>

                <div className="lg:w-2/3">
                    <PanelProducto
                        producto={producto}
                        cantidad={cantidad}
                        setCantidad={setCantidad}
                    />
                </div>

                <div className="lg:w-1/3 border-t lg:border-t-0 lg:border-l pt-4 lg:pt-0 lg:pl-4">
                    <ProductosRecomendados productos={recomendados} />
                </div>

            </div>
        </div>
    )
}