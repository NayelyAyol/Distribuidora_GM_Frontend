import { useState, useEffect } from "react"
import { FiSearch } from "react-icons/fi"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import RecomendacionCard from "./RecomendacionCard"
import { inputClass } from "@/utils/styles"
import { toast } from "react-toastify"
import useAuthStore from "@/context/useAuthStore"

export default function RecomendacionList({
    placeholder,
    recargar,
    onCargar,
    dataKey
}) {

    const [data, setData] = useState([])
    const [cargando, setCargando] = useState(false)
    const [page, setPage] = useState(1)
    const [totalPaginas, setTotalPaginas] = useState(1)

    const [filter, setFilter] = useState("SIN_RESPUESTA")
    const [search, setSearch] = useState("")
    const [tipoFilter, setTipoFilter] = useState("QUEJA")

    const user = useAuthStore((state) => state.user)
    const rol = user?.rol?.toUpperCase()
    const esVendedor = rol === "VENDEDOR"

    const cargar = async () => {
        setCargando(true)
        try {
            const estado = filter === "SIN_RESPUESTA" ? "PENDIENTE" : "FINALIZADA"
            const response = esVendedor
                ? await onCargar(estado, page)
                : await onCargar(estado, tipoFilter, page)

            setData(response[dataKey] || [])
            setTotalPaginas(response.totalPaginas || 1)
        } catch (error) {
            toast.error(error.message)
        } finally {
            setCargando(false)
        }
    }

    useEffect(() => {
        cargar()
    }, [filter, tipoFilter, page, recargar])

    useEffect(() => {
        setPage(1)
    }, [filter, tipoFilter, recargar])

    return (
        <div className="grid gap-4">

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

                <div className="flex flex-wrap gap-2">
                    <Button
                        onClick={() => setFilter("SIN_RESPUESTA")}
                        className={filter === "SIN_RESPUESTA" ? "bg-emerald-100 text-emerald-700" : "bg-gray-200 text-gray-600"}
                    >
                        Pendientes
                    </Button>
                    <Button
                        onClick={() => setFilter("CON_RESPUESTA")}
                        className={filter === "CON_RESPUESTA" ? "bg-emerald-100 text-emerald-700" : "bg-gray-200 text-gray-600"}
                    >
                        Atendidas
                    </Button>
                </div>

                {!esVendedor && (
                    <div className="flex flex-wrap gap-2 sm:justify-end">
                        {[["QUEJA", "Quejas"], ["SUGERENCIA", "Sugerencias"]].map(([val, label]) => (
                            <Button
                                key={val}
                                onClick={() => setTipoFilter(val)}
                                className={tipoFilter === val ? "bg-emerald-100 text-emerald-700" : "bg-gray-200 text-gray-600"}
                            >
                                {label}
                            </Button>
                        ))}
                    </div>
                )}

            </div>

            {cargando ? (
                <div className="text-center py-10 text-gray-500">
                    Cargando...
                </div>
            ) : data.length > 0 ? (
                <>
                    {data.map(item => <RecomendacionCard key={item._id} item={item} />)}

                    <div className="flex justify-center items-center gap-2 pt-2 flex-wrap">
                        {Array.from({ length: totalPaginas }, (_, index) => {
                            const numero = index + 1
                            const activa = numero === page
                            return (
                                <button
                                    key={numero}
                                    onClick={() => setPage(numero)}
                                    className={`min-w-[40px] h-[40px] px-3 rounded-xl border transition font-medium
                                        ${activa
                                            ? "bg-emerald-100 text-emerald-700 border-emerald-300"
                                            : "text-gray-600 hover:bg-gray-100 border-gray-200"
                                        }`}
                                >
                                    {numero}
                                </button>
                            )
                        })}
                    </div>
                </>
            ) : (
                <div className="text-center py-10 text-gray-500">
                    No se encontraron registros
                </div>
            )}
        </div>
    )
}