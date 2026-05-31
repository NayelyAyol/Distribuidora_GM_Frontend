import { FiEdit, FiSlash } from "react-icons/fi"
import BaseCard from "../../../shared/components/BaseCard"

export default function CategoriaCard({
    categoria,
    onDelete,
    onEdit,
    onSelect,
    esVendedor,
    esCliente
}) {

    const imageUrl =
        categoria?.imagen?.url ??
        (typeof categoria?.imagen === "string"
            ? categoria.imagen
            : "")

    return (
        <BaseCard
            image={imageUrl || "/images/categories/default.webp"}
            title={categoria.nombre}
            description={categoria.descripcion}
        >

            {(esVendedor || esCliente) ? (

                <div
                    onClick={() => onSelect(categoria)}
                    className="
                        text-emerald-700
                        font-medium
                        text-sm
                        cursor-pointer
                        justify-self-end
                    "
                >
                    Ver productos →
                </div>

            ) : (

            <div className="flex flex-wrap justify-between items-center w-full gap-2 mt-4">
                <button
                    onClick={() => onEdit(categoria)}
                    className="
                        flex items-center gap-1 text-emerald-600 hover:text-emerald-800
                        font-medium text-sm sm:text-base
                    "
                >
                    <FiEdit className="shrink-0" />
                    Editar
                </button>

                <button
                    onClick={() => onDelete(categoria)}
                    className={`
                        flex items-center gap-1 transition font-medium text-sm sm:text-base
                        ${categoria.estado
                            ? "text-red-500 hover:text-red-700"
                            : "text-emerald-600 hover:text-emerald-800"
                        }
                    `}
                >
                    <FiSlash className="shrink-0" />
                    {categoria.estado ? "Desactivar" : "Activar"}
                </button>
            </div>

            )}

        </BaseCard>
    )
}