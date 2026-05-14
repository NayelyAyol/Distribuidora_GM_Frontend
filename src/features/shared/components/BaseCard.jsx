import { FiEdit2 } from "react-icons/fi"

export default function BaseCard({
    image,
    title,
    description,
    children,
    onEdit,
    rol
}) {

    return (
        <div className="relative h-full w-full bg-white rounded-xl p-4 shadow hover:shadow-lg transition flex flex-col">

            <div className="relative w-full h-32">
                
                <img
                    src={image}
                    alt={title}
                    className="w-full h-32 object-cover rounded-lg"
                />

                {onEdit && rol === "vendedor" && (
                    <button
                        onClick={onEdit}
                        className="
                            absolute
                            top-2
                            right-2
                            w-9 h-9
                            bg-white
                            rounded-full
                            shadow-md
                            flex items-center justify-center
                            hover:scale-105
                            transition
                        "
                    >
                        <FiEdit2 className="text-gray-700 text-sm" />
                    </button>
                )}
            </div>

            <div className="mt-3">
                <h3 className="font-bold text-gray-800">
                    {title}
                </h3>

                <p className="text-sm text-gray-500">
                    {description}
                </p>
            </div>

            <div className="mt-4">
                {children}
            </div>

        </div>
    )
}