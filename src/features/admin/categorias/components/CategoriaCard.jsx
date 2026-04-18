import { FiEdit, FiTrash } from "react-icons/fi"

export default function CategoriaCard({ categoria }) {
    return (
        <div className="bg-white rounded-xl p-4 shadow hover:shadow-lg transition">

            <img
                src={categoria.imagen || "/images/categories/default.webp"}
                className="w-full h-32 object-cover rounded-lg"
            />

            <div className="mt-3">
                <h3 className="font-bold text-gray-800">
                    {categoria.nombre}
                </h3>

                <p className="text-sm text-gray-500">
                    {categoria.descripcion}
                </p>
            </div>

            <div className="flex justify-between mt-4">

                <button className="flex items-center gap-1 text-emerald-600 hover:text-emerald-800">
                    <FiEdit /> Editar
                </button>

                <button className="flex items-center gap-1 text-red-500 hover:text-red-700">
                    <FiTrash /> Eliminar
                </button>

            </div>
        </div>
    )
}