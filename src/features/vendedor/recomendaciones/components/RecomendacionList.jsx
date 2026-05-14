import { useState } from "react"
import { Button } from "@/components/ui/button"
import RecomendacionCard from "./RecomendacionCard"

export default function RecomendacionList() {

    const [data] = useState([
        {
            id: 1,
            text: "Agregar modo oscuro",
            user: "Cliente 1",
            respuesta: "Estamos evaluando su solicitud"
        },
        {
            id: 2,
            text: "Mejorar rendimiento",
            user: "Cliente 2",
            respuesta: null
        },
        {
            id: 3,
            text: "Cambio de colores",
            user: "Cliente 3",
            respuesta: "Se aplicará en la próxima actualización"
        }
    ])

    const [filter, setFilter] = useState("CON_RESPUESTA")

    const filteredData =
        filter === "CON_RESPUESTA"
            ? data.filter(item => item.respuesta)
            : data.filter(item => !item.respuesta)

    return (
        <div className="grid gap-4">

            <div className="flex gap-2 mb-4">

                <Button
                    onClick={() => setFilter("SIN_RESPUESTA")}
                    className={filter === "SIN_RESPUESTA"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-gray-200 text-gray-600"}
                >
                    Pendientes
                </Button>

                <Button
                    onClick={() => setFilter("CON_RESPUESTA")}
                    className={filter === "CON_RESPUESTA"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-gray-200 text-gray-600"}
                >
                    Finalizadas
                </Button>

            </div>

            {filteredData.map(item => (
                <RecomendacionCard
                    key={item.id}
                    item={item}
                />
            ))}

        </div>
    )
}