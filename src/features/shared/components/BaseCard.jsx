export default function BaseCard({
    image,
    title,
    description,
    children
}) {

    return (
        <div className="h-full w-full bg-white rounded-xl p-4 shadow hover:shadow-lg transition flex flex-col">

            <img
                src={image}
                alt={title}
                className="w-full h-32 object-cover rounded-lg"
            />

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