import CategoriaCard from "./CategoriaCard"

export default function CategoriasGrid({
    data,
    onDelete,
    onEdit,
    onSelect,
    esVendedor
}) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

            {(Array.isArray(data) ? data : []).map((cat) => (
                <CategoriaCard
                    key={cat._id}
                    categoria={cat}
                    onDelete={onDelete}
                    onEdit={onEdit}
                    onSelect={onSelect}
                    esVendedor={esVendedor}
                />
            ))}

        </div>
    )
}