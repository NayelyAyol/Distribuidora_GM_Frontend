import { useEffect, useRef } from "react"
import { FiChevronLeft, FiChevronRight, FiStar } from "react-icons/fi"

export default function MejoresProductos({ productos }) {
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

        animationState.current.cardWidth = card.offsetWidth + 16

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

            track.style.transform = `translateX(-${state.position + state.offset}px)`

            animationFrameId = requestAnimationFrame(animate)
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

    return (
        <div className="relative w-full flex items-center gap-4 sm:gap-9">
            <button
                onClick={scrollLeft}
                className="z-20 bg-white/90 hover:bg-white shadow-md rounded-full p-2 sm:p-3 ml-1 sm:ml-2 transition-colors"
            >
                <FiChevronLeft className="text-xl sm:text-2xl text-gray-700" />
            </button>

            <div className="flex-1 overflow-hidden py-3">
                <div
                    ref={trackRef}
                    className="flex gap-4 will-change-transform w-max shrink-0 pl-4"
                >
                    {[...productos, ...productos].map((p, index) => (
                        <div
                            key={index}
                            ref={index === 0 ? cardRef : null}
                            className="
                                min-w-[160px]
                                sm:min-w-[200px]
                                md:min-w-[232px]
                                max-w-[240px]
                                flex-shrink-0
                                bg-white
                                rounded-2xl
                                shadow-sm
                                border border-gray-100
                                p-3
                                hover:shadow-md
                                transition
                            "
                        >
                            <img
                                src={p.imagen}
                                alt={p.nombre}
                                className="w-full h-[110px] sm:h-[130px] md:h-[140px] object-cover rounded-xl"
                            />

                            <h3 className="mt-2 font-semibold text-gray-800 text-sm sm:text-base">
                                {p.nombre}
                            </h3>

                            <p className="text-xs sm:text-sm text-gray-500 line-clamp-2">
                                {p.descripcion}
                            </p>

                            <div className="mt-2 flex justify-end">
                                <FiStar className="text-yellow-400" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <button
                onClick={scrollRight}
                className="z-20 bg-white/90 hover:bg-white shadow-md rounded-full p-2 sm:p-3 mr-1 sm:mr-2 transition-colors"
            >
                <FiChevronRight className="text-xl sm:text-2xl text-gray-700" />
            </button>
        </div>
    )
}