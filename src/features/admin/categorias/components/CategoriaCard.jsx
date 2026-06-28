import { FiEdit, FiSlash, FiCheckCircle } from "react-icons/fi"
import BaseCard from "../../../shared/components/BaseCard"

export default function CategoriaCard({
    categoria,
    onDelete,
    onEdit,
    onSelect,
    esVendedor,
    esCliente
}) {
    const imageUrl = categoria?.imagen?.url ?? (typeof categoria?.imagen === "string" ? categoria.imagen : "");
    const isActive = categoria.estado;

    return (
        <BaseCard
            image={imageUrl || "/images/categories/default.webp"}
            title={categoria.nombre}
            description={categoria.descripcion}
            className={!isActive ? "opacity-70 grayscale" : ""}
        >
        {(esVendedor || esCliente) ? (
            <div className="w-full flex justify-end border-t pt-3">
                <div
                    onClick={() => onSelect(categoria)}
                    className="text-emerald-700 font-bold text-sm cursor-pointer hover:underline"
                >
                    Ver productos →
                </div>
            </div>
        ) : (
                <div className="flex flex-wrap justify-between items-center w-full gap-4 mt-4 border-t pt-3">
                    <button
                        aria-label="Editar"
                        onClick={() => onEdit(categoria)}
                        className="flex items-center gap-1 text-emerald-600 hover:text-emerald-800 font-medium text-sm transition-colors"
                    >
                        <FiEdit className="shrink-0" />
                        Editar
                    </button>

                    <button
                        aria-label="Activar o Desactivar"
                        onClick={() => onDelete(categoria)}
                        className={`flex items-center gap-1 font-medium text-sm transition-colors ${
                            isActive ? "text-red-500 hover:text-red-700" : "text-emerald-600 hover:text-emerald-800"
                        }`}
                    >
                        {isActive ? <FiSlash className="shrink-0" /> : <FiCheckCircle className="shrink-0" />}
                        {isActive ? "Desactivar" : "Activar"}
                    </button>
                </div>
            )}
        </BaseCard>
    )
}