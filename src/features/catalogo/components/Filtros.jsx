import { Button } from "@/components/ui/button"

export default function Filtros({
    categorias,
    categoriaActiva,
    setCategoriaActiva
}) {
    return (
        <div className="flex flex-wrap gap-2">

            <Button
                onClick={() => setCategoriaActiva(null)}
                className={`px-6 py-3 text-sm font-medium transition
                ${!categoriaActiva
                    ? "bg-emerald-100 text-emerald-700"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
            >
                Todos
            </Button>

            {categorias.map((cat) => (
                <Button
                    key={cat._id}
                    onClick={() => setCategoriaActiva(cat._id)}
                    className={`px-6 py-3 text-sm font-medium transition
                    ${categoriaActiva === cat._id
                        ? "bg-emerald-100 text-emerald-700"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                >
                    {cat.nombre}
                </Button>
            ))}

        </div>
    )
}