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

                <div className="flex justify-between">

                    <button
                        onClick={() => onEdit(categoria)}
                        className="
                            flex items-center gap-1
                            text-emerald-600
                            hover:text-emerald-800
                        "
                    >
                        <FiEdit />
                        Editar
                    </button>

                    <button
                        onClick={() => onDelete(categoria)}
                        className={`
                            flex items-center gap-1 transition
                            ${categoria.estado
                                ? "text-red-500 hover:text-red-700"
                                : "text-emerald-600 hover:text-emerald-800"
                            }
                        `}
                    >
                        <FiSlash />

                        {categoria.estado
                            ? "Desactivar"
                            : "Activar"}
                    </button>

                </div>

            )}

        </BaseCard>
    )
}