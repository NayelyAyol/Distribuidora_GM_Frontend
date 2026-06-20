import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { MdAddShoppingCart } from "react-icons/md"
import BaseCard from "../shared/components/BaseCard"
import { obtenerRecomendacionesIA } from "../producto/services/recoIAService"
import useAuthStore from "@/context/useAuthStore"
import { agregarAlCarrito } from "@/features/cliente/carrito/services/carritoService"
import { toast } from "react-toastify"

export default function ProductosRecomendados({ productoId }) {
    const navigate = useNavigate()
    const user = useAuthStore((state) => state.user)
    const basePath = user ? "/dashboard/producto" : "/producto"

    const [recomendaciones, setRecomendaciones] = useState([])
    const [titulo, setTitulo] = useState("Productos que te pueden interesar")
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!productoId) return

        const cargar = async () => {
            setLoading(true)
            try {
                const data = await obtenerRecomendacionesIA(productoId)
                setRecomendaciones(data?.recomendaciones || [])
                setTitulo(data?.titulo || "Productos que te pueden interesar")
            } catch (error) {
                console.error("Error al cargar recomendaciones IA:", error)
                setRecomendaciones([])
            } finally {
                setLoading(false)
            }
        }

        cargar()
    }, [productoId])

    const handleAddCart = async (e, producto) => {
        e.stopPropagation()
        if (!user) {
            navigate("/registro")
            return
        }
        try {
            const { agregarAlCarrito } = await import(
                "@/features/cliente/carrito/services/carritoService"
            )
            const respuesta = await agregarAlCarrito(producto._id, 1)
            toast.success(respuesta.msg || "Producto agregado al carrito")
        } catch (error) {
            toast.error(error.message || "Error al agregar al carrito")
        }
    }

    if (loading) {
        return (
            <div className="flex flex-col gap-3">
                <h3 className="font-bold text-lg text-gray-950">
                    Productos que te pueden interesar
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {[...Array(4)].map((_, i) => (
                        <div
                            key={i}
                            className="h-52 bg-gray-100 rounded-xl animate-pulse"
                        />
                    ))}
                </div>
            </div>
        )
    }

    if (recomendaciones.length === 0) {
    return (
        <div className="flex flex-col gap-3">
            <h3 className="font-bold text-lg text-gray-950">
                Productos que te pueden interesar
            </h3>
            <div className="flex items-center justify-center py-10 text-gray-400 text-sm">
                Por el momento no tenemos recomendaciones para ti
            </div>
        </div>
    )
}

    return (
        <div className="flex flex-col gap-3">
            <h3 className="font-bold text-lg text-gray-950">{titulo}</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {recomendaciones.map((p) => (
                    <div key={p._id} className="flex flex-col gap-1">
                        <BaseCard
                            image={p.imagen}
                            title={p.nombre}
                            description={p.descripcion}
                            price={p.precioVenta}
                            onClick={() => navigate(`${basePath}/${p._id}`)}
                        >
                            <button
                                onClick={(e) => handleAddCart(e, p)}
                                className="
                                    w-[42px] h-[42px]
                                    bg-emerald-200 hover:bg-emerald-300
                                    rounded-xl transition
                                    flex items-center justify-center
                                "
                            >
                                <MdAddShoppingCart className="text-xl text-black" />
                            </button>
                        </BaseCard>

                        {p.motivo && (
                            <p className="text-xs text-gray-400 italic px-1">
                                {p.motivo}
                            </p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}