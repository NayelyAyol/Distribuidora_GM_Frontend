import { FiEdit, FiSlash } from "react-icons/fi"

export default function CategoriaCard({
    categoria,
    onDelete,
    onEdit,
    onSelect,
    esVendedor
}) {

const imageUrl =
    categoria?.imagen?.url ??
    (typeof categoria?.imagen === "string" ? categoria.imagen : "")

console.log("CATEGORIA:", categoria)
console.log("IMAGEN:", categoria.imagen)

    return (
        <div className="bg-white rounded-xl p-4 shadow hover:shadow-lg transition">

            <img
                src={imageUrl || "/images/categories/default.webp"}
                alt={categoria.nombre}
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

            {esVendedor ? (
                <div
                    onClick={() => onSelect(categoria)}
                    className="mt-4 text-emerald-700 font-medium text-sm cursor-pointer justify-self-end"
                >
                    Ver productos →
                </div>
            ) : (
                <div className="flex justify-between mt-4">

                    <button
                        onClick={() => onEdit(categoria)}
                        className="flex items-center gap-1 text-emerald-600 hover:text-emerald-800"
                    >
                        <FiEdit /> Editar
                    </button>

                    <button
                        onClick={() => onDelete(categoria)}
                        className={`flex items-center gap-1 transition
                            ${categoria.estado
                                ? "text-red-500 hover:text-red-700"
                                : "text-emerald-600 hover:text-emerald-800"
                            }
    `}
                    >
                        <FiSlash />
                        {categoria.estado ? "Desactivar" : "Activar"}
                    </button>

                </div>
            )}

        </div>
    )
}