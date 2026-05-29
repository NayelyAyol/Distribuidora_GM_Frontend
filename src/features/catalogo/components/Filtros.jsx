import { FiGrid, FiLayers, FiRefreshCw } from "react-icons/fi"

export default function Filtros({
    categorias,
    categoriaActiva,
    setCategoriaActiva,
    marcas,
    marca,
    setMarca
}) {
    const hayFiltrosActivos = categoriaActiva !== null || marca !== ""

    const handleLimpiarTodo = () => {
        setCategoriaActiva(null)
        setMarca("")
    }

    return (
        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto items-center">
            
            <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-3 py-2 shadow-sm w-full sm:w-48 lg:w-auto">
                <FiLayers className="text-gray-400 text-lg flex-shrink-0" />
                <select
                    value={categoriaActiva || ""}
                    onChange={(e) => setCategoriaActiva(e.target.value || null)}
                    className="bg-transparent text-sm text-gray-700 focus:outline-none cursor-pointer w-full pr-4"
                >
                    <option value="">Todas las categorías</option>
                    {categorias.map((cat) => (
                        <option key={cat._id} value={cat._id}>
                            {cat.nombre}
                        </option>
                    ))}
                </select>
            </div>

            <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-3 py-2 shadow-sm w-full sm:w-48 lg:w-auto">
                <FiGrid className="text-gray-400 text-lg flex-shrink-0" />
                <select
                    value={marca}
                    onChange={(e) => setMarca(e.target.value)}
                    className="bg-transparent text-sm text-gray-700 focus:outline-none cursor-pointer w-full pr-4"
                >
                    <option value="">Todas las marcas</option>
                    {marcas.map((m) => (
                        <option key={m} value={m.toLowerCase()}>
                            {m.charAt(0).toUpperCase() + m.slice(1)}
                        </option>
                    ))}
                </select>
            </div>

            {hayFiltrosActivos && (
                <button
                    onClick={handleLimpiarTodo}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-emerald-900 bg-emerald-100 hover:bg-emerald-200 rounded-xl transition duration-200 w-full sm:w-auto justify-center"
                    title="Limpiar filtros seleccionados"
                >
                    <FiRefreshCw className="text-xs" />
                    <span>Limpiar</span>
                </button>
            )}

        </div>
    )
}