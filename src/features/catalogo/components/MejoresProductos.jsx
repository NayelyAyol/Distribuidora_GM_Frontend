import { useEffect, useRef } from "react"
import {
    FiChevronLeft,
    FiChevronRight,
    FiStar,
} from "react-icons/fi"

import { MdAddShoppingCart } from "react-icons/md"
import { useNavigate } from "react-router-dom"
import useAuthStore from "@/context/useAuthStore"
import BaseCard from "../../shared/components/BaseCard"

export default function MejoresProductos({
    productos = [],
    showHeader = true,
    onSelectProducto
}) {

    const navigate = useNavigate()

    const trackRef = useRef(null)
    const cardRef = useRef(null)

    const animationState = useRef({
        position: 0,
        offset: 0,
        speed: 1,
        cardWidth: 0
    })

    useEffect(() => {

        const track = trackRef.current
        const card = cardRef.current

        if (!track || !card) return

        animationState.current.cardWidth =
            card.offsetWidth + 16

        let animationFrameId

        const limit = () => track.scrollWidth / 2

        const animate = () => {

            const state = animationState.current

            state.offset += state.speed

            if (state.offset >= state.cardWidth) {
                state.position += state.cardWidth
                state.offset = 0
            }

            const max = limit()

            if (state.position >= max) {
                state.position -= max
            }

            if (state.position < 0) {
                state.position += max
            }

            track.style.transform =
                `translateX(-${state.position + state.offset}px)`

            animationFrameId =
                requestAnimationFrame(animate)
        }

        animate()

        return () => {
            cancelAnimationFrame(animationFrameId)
        }

    }, [productos])

    const scrollLeft = () => {

        const state = animationState.current

        if (state.cardWidth > 0) {
            state.position -= state.cardWidth
        }
    }

    const scrollRight = () => {

        const state = animationState.current

        if (state.cardWidth > 0) {
            state.position += state.cardWidth
        }
    }

    const user = useAuthStore((state) => state.user)

    const basePath = user
        ? "/dashboard/producto"
        : "/producto"

    return (
        <section
            id="destacados"
            className="px-6 py-10"
        >

            {showHeader && (

                <div className="mb-6 text-center">

                    <h2 className="text-3xl font-bold">
                        Productos destacados
                    </h2>

                    <p className="text-emerald-900 mt-2">
                        Descubre algunos de los productos más populares
                    </p>

                </div>

            )}

            <div className="relative w-full flex items-center gap-4 sm:gap-9">

                <button
                    onClick={scrollLeft}
                    className="
                    z-20 bg-white/90 hover:bg-white
                    shadow-md rounded-full
                    p-2 sm:p-3
                    ml-1 sm:ml-2
                    transition-colors
                "
                >
                    <FiChevronLeft
                        className="
                        text-xl sm:text-2xl
                        text-gray-700
                    "
                    />
                </button>

                <div className="flex-1 overflow-hidden py-3">

                    <div
                        ref={trackRef}
                        className="
                        flex gap-4
                        will-change-transform
                        w-max shrink-0
                        pl-4
                    "
                    >

                        {[...productos, ...productos, ...productos, ...productos].map((p, index) => (

                            <div
                                key={`${p._id}-${index}`}
                                ref={index === 0 ? cardRef : null}
                            >

                                <BaseCard
                                    image={p.imagen}
                                    title={p.nombre}
                                    description={p.descripcion}
                                    price={p.precioVenta}
                                    onClick={() => {

                                        if (onSelectProducto) {
                                            onSelectProducto(p)
                                        }

                                        navigate(`${basePath}/${p._id}`)
                                    }}
                                    className="
                                    min-w-[160px]
                                    sm:min-w-[200px]
                                    md:min-w-[232px]
                                    max-w-[240px]
                                    flex-shrink-0
                                "
                                >

                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            console.log("Favorito", p)
                                        }}
                                        className="
                                        absolute
                                        top-3
                                        right-3
                                        z-10
                                    "
                                    >
                                        <FiStar
                                            className="
                                            text-yellow-500
                                            bg-white
                                            text-xl
                                        "
                                        />
                                    </button>

                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            console.log("Agregar carrito", p)
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

                            </div>

                        ))}

                    </div>

                </div>

                <button
                    onClick={scrollRight}
                    className="
                    z-20 bg-white/90 hover:bg-white
                    shadow-md rounded-full
                    p-2 sm:p-3
                    mr-1 sm:mr-2
                    transition-colors
                "
                >
                    <FiChevronRight
                        className="
                        text-xl sm:text-2xl
                        text-gray-700
                    "
                    />
                </button>

            </div>

        </section>
    )
}