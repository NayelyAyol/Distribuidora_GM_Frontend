import BaseCard from "../shared/components/BaseCard"
import { useNavigate } from "react-router-dom"

export default function ProductosRecomendados({ productos }) {

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
                        description={`$${p.precio}`}
                        onClick={() =>
                            navigate(`/dashboard/producto/${p._id}`)
                        }
                    />

                ))}

            </div>

        </div>
    )
}