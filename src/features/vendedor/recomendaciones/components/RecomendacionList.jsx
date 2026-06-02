import { useState } from "react"
import { FiSearch } from "react-icons/fi"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import RecomendacionCard from "./RecomendacionCard"
import { inputClass } from "@/utils/styles"

export default function RecomendacionList({
    placeholder = "Buscar recomendación..."
}) {

    const [data] = useState([
        {
            id: 1,
            text: "Agregar modo oscuro",
            respuesta: "Estamos evaluando su solicitud",
            fecha: "2026-05-10"
        },
        {
            id: 2,
            text: "El pedido llegó tarde",
            respuesta: null,
            fecha: "2026-05-12"
        },
        {
            id: 3,
            text: "Mejorar rendimiento",
            respuesta: "Se aplicará en la próxima actualización",
            fecha: "2026-05-15"
        }
    ])

    const [filter, setFilter] = useState("CON_RESPUESTA")
    const [search, setSearch] = useState("")

    const filteredData = data
        .filter(item =>
            filter === "CON_RESPUESTA"
                ? item.respuesta
                : !item.respuesta
        )
        .filter(item =>
            item.text
                .toLowerCase()
                .includes(search.toLowerCase())
        )

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
                        key={item.id}
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