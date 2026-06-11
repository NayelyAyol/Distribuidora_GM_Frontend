import { useState, useEffect } from "react"
import { FiSearch } from "react-icons/fi"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import RecomendacionCard from "./RecomendacionCard"
import { inputClass } from "@/utils/styles"
import { toast } from "react-toastify"
import { obtenerMisQuejasSugerencias } from "@/features/cliente/quejasysugerencias/services/quejasSugerenciasService"

export default function RecomendacionList({
    placeholder = "Buscar recomendación..."
}) {

    const [data, setData] = useState([])

    const [filter, setFilter] = useState("CON_RESPUESTA")
    const [search, setSearch] = useState("")

    const filteredData = data.filter(item =>
        item.asunto?.toLowerCase()
            .includes(search.toLowerCase())
    )

    const cargarQuejas = async () => {

        try {

            const estado =
                filter === "SIN_RESPUESTA"
                    ? "PENDIENTE"
                    : "FINALIZADA"

            const response =
                await obtenerMisQuejasSugerencias(
                    estado
                )

            setData(
                response.quejasSugerencias || []
            )

        } catch (error) {

            toast.error(error.message)
        }
    }

    useEffect(() => {
        cargarQuejas()
    }, [filter])

    return (
        <div className="grid gap-4">

            <div className="
                flex flex-col
                md:flex-row
                md:items-center
                md:justify-between
                gap-3
            ">

                <div className="
                    flex items-center
                    bg-white
                    rounded-full
                    w-full
                    md:w-[300px]
                    border border-gray-100
                    shadow-sm
                ">

                    <Input
                        type="text"
                        placeholder={placeholder}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className={`
                            ${inputClass}
                            bg-transparent
                            border-0
                            focus:ring-0
                            flex-1
                            placeholder:text-sm
                        `}
                    />

                    <button
                        className="
                            rounded-full
                            flex items-center
                            justify-center
                            max-w-[120px]
                            h-12
                            px-6
                            bg-emerald-700/10
                            hover:bg-emerald-100
                            text-emerald-800
                            transition
                        "
                    >
                        <FiSearch className="text-emerald-900 text-xl" />
                    </button>

            </div>

        <div className="flex flex-wrap gap-2">

            <Button
                onClick={() => setFilter("SIN_RESPUESTA")}
                className={
                    filter === "SIN_RESPUESTA"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-gray-200 text-gray-600"
                }
            >
                Pendientes
            </Button>

            <Button
                onClick={() => setFilter("CON_RESPUESTA")}
                className={
                    filter === "CON_RESPUESTA"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-gray-200 text-gray-600"
                }
            >
                Finalizadas
            </Button>

        </div>

    </div>


            {filteredData.length > 0 ? (
                filteredData.map(item => (
                    <RecomendacionCard
                        key={item._id}
                        item={item}
                    />
                ))
            ) : (
                <div className="
                    text-center
                    py-10
                    text-gray-500
                ">
                    No se encontraron recomendaciones
                </div>
            )}

        </div>
    )
}