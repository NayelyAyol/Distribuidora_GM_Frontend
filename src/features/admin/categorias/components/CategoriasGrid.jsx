import CategoriaCard from "./CategoriaCard"

export default function CategoriasGrid({ data }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

            {data.map((cat) => (
                <CategoriaCard key={cat.id} categoria={cat} />
            ))}

        </div>
    )
}