import { FiMinus, FiPlus } from "react-icons/fi"

export default function CantidadSelector({
    cantidad,
    setCantidad,
    min = 1,
    max = 999
}) {

    const disminuir = () => {
        setCantidad(prev => Math.max(min, prev - 1))
    }

    const aumentar = () => {
        setCantidad(prev => Math.min(max, prev + 1))
    }

    return (
        <div className="flex items-center gap-3 mt-4">

            <button
                onClick={disminuir}
                disabled={cantidad <= min}
                className="
                    p-2 rounded-lg
                    bg-gray-200 hover:bg-gray-300
                    disabled:opacity-40 disabled:cursor-not-allowed
                    transition
                "
            >
                <FiMinus />
            </button>

            <span className="w-10 text-center font-semibold">
                {cantidad}
            </span>

            <button
                onClick={aumentar}
                disabled={cantidad >= max}
                className="
                    p-2 rounded-lg
                    bg-gray-200 hover:bg-gray-300
                    disabled:opacity-40 disabled:cursor-not-allowed
                    transition
                "
            >
                <FiPlus />
            </button>

        </div>
    )
}