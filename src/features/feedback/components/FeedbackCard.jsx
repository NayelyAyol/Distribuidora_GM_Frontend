export default function FeedbackCard({ item, role }) {
    return (
        <div className="p-5 rounded-2xl border border-gray-100 shadow-sm bg-emerald-700/5 hover:shadow-md transition">

            <p className="text-gray-800 text-base">
                {item.text}
            </p>

            <div className="flex justify-between items-center mt-4 text-sm text-gray-500">

                <span>{item.user}</span>

                {role === "vendedor" && (
                    <button className="text-emerald-600 hover:underline">
                        Ver detalle
                    </button>
                )}

            </div>

        </div>
    )
}