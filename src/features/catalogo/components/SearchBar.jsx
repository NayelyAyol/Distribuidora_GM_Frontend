import { Input } from "@/components/ui/input"
import { FiSearch } from "react-icons/fi"

export default function SearchBar({
    search,
    setSearch,
    handleBuscar,
}) {

    const ejecutarBusqueda = () => {

        if (
            handleBuscar &&
            search.trim()
        ) {
            handleBuscar()
        }
    }

    return (

        <div className="flex items-center bg-white rounded-full w-full md:w-[320px] border border-gray-100 shadow-sm">

            <Input
                type="text"
                placeholder="Buscar productos..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => {

                    if (
                        e.key === "Enter" &&
                        search.trim()
                    ) {
                        ejecutarBusqueda()
                    }
                }}
                className="bg-transparent border-0 focus:ring-0 flex-1 px-4"
            />

            <button
                type="button"
                onClick={ejecutarBusqueda}
                className="rounded-full flex items-center justify-center h-12 px-6 bg-emerald-700/10 hover:bg-emerald-100 text-emerald-800 transition"
            >
                <FiSearch className="text-emerald-900 text-xl" />
            </button>

        </div>
    )
}