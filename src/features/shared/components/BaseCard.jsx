import { FiEdit2 } from "react-icons/fi"

export default function BaseCard({
    image,
    title,
    description,
    price,
    children,
    onEdit,
    esVendedor,
    onClick,
    className =""   
}) {

    const getImagen = () => {
        if(!image){
            return "/images/categories/default.webp"
        }

        if (typeof image === "string") {
            return image
        }

        if (
            typeof image === "object" &&
            image.url
        ) {
            return image.url
        }
        return "/images/categories/default.webp"
    }
    return (
        <div
            onClick={onClick}  
            className={`relative h-full w-full bg-white rounded-xl p-4 shadow hover:shadow-lg transition flex flex-col cursor-pointer ${className}`}
        >

            <div className="relative w-full h-32">

                <img
                    src={getImagen()}
                    alt={title}
                    className="w-full h-32 object-cover rounded-lg"
                />

                {onEdit && esVendedor && (
                    <button
                        onClick={(e) => {
                            e.stopPropagation()
                            onEdit()
                        }}
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

            <div className="mt-3 flex-1 flex flex-col">
                <h3 className="font-bold text-gray-800">
                    {title}
                </h3>

                <p className="text-sm text-gray-500">
                    {description}
                </p>
            </div>

            <div className="mt-auto pt-4 flex items-center justify-between">

                {price && (
                    <p className="
                        text-lg
                        font-bold
                        text-emerald-700
                    ">
                        ${price}
                    </p>
                )}

                {children}

            </div>

        </div>
    )
}