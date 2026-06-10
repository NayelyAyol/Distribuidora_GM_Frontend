import { useCallback } from "react"
import useEmblaCarousel from "embla-carousel-react"
import Autoplay from "embla-carousel-autoplay"
import { FiChevronLeft, FiChevronRight, FiStar } from "react-icons/fi"
import { MdAddShoppingCart } from "react-icons/md"
import { useNavigate } from "react-router-dom"
import useAuthStore from "@/context/useAuthStore"
import BaseCard from "../../shared/components/BaseCard"

export default function MejoresProductos({
    productos = [],
    showHeader = true,
    onSelectProducto,
    onAddCart
}) {
    const navigate = useNavigate()

    const listaExtendida = [...productos, ...productos, ...productos, ...productos, ...productos, ...productos];

    const [emblaRef, emblaApi] = useEmblaCarousel(
        { loop: true, align: 'start' }, 
        [Autoplay({ delay: 2000, stopOnInteraction: false })]
    )

    const scrollLeft = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi])
    const scrollRight = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi])

    const user = useAuthStore((state) => state.user)
    const basePath = user ? "/dashboard/producto" : "/producto"

    return (
        <section id="destacados" className="px-6 py-10">
            {showHeader && (
                <div className="mb-6 text-center">
                    <h2 className="text-3xl font-bold">Productos destacados</h2>
                    <p className="text-emerald-900 mt-2">Descubre algunos de los productos más populares</p>
                </div>
            )}

            <div className="relative w-full flex items-center gap-4 sm:gap-9">
                <button onClick={scrollLeft} className="z-20 bg-white/90 hover:bg-white shadow-md rounded-full p-2 sm:p-3 ml-1 sm:ml-2 transition-colors">
                    <FiChevronLeft className="text-xl sm:text-2xl text-gray-700" />
                </button>

                <div className="flex-1 overflow-hidden py-3" ref={emblaRef}>
                    <div className="flex gap-4">
                        {listaExtendida.map((p, index) => (
                            <div 
                                key={`${p._id}-${index}`} 
                                className="min-w-[160px] sm:min-w-[200px] md:min-w-[232px] max-w-[240px] flex-shrink-0"
                            >
                                <BaseCard
                                    image={p.imagen}
                                    title={p.nombre}
                                    description={p.descripcion}
                                    price={p.precioVenta}
                                    onClick={() => {
                                        if (onSelectProducto) onSelectProducto(p)
                                        navigate(`${basePath}/${p._id}`)
                                    }}
                                >
                                    <button onClick={(e) => { e.stopPropagation(); console.log("Favorito", p); }} className="absolute top-3 right-3 z-10">
                                        <FiStar className="text-yellow-500 bg-white text-xl" />
                                    </button>

                                    <button 
                                            onClick={(e) => { 
                                                e.stopPropagation(); 
                                                onAddCart({ productoId: p._id, cantidad: 1 }); 
                                            }} 
                                            className="w-[42px] h-[42px] bg-emerald-200 hover:bg-emerald-300 rounded-xl transition flex items-center justify-center"
                                        >
                                            <MdAddShoppingCart className="text-xl text-black" />
                                        </button>
                                </BaseCard>
                            </div>
                        ))}
                    </div>
                </div>

                <button onClick={scrollRight} className="z-20 bg-white/90 hover:bg-white shadow-md rounded-full p-2 sm:p-3 mr-1 sm:mr-2 transition-colors">
                    <FiChevronRight className="text-xl sm:text-2xl text-gray-700" />
                </button>
            </div>
        </section>
    )
}