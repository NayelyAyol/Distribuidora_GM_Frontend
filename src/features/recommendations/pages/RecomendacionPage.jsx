import { useState, useEffect, useCallback, useMemo } from "react"
import { toast } from "react-toastify"
import DataTable from "@/components/ui/DataTable"
import { recomendacionColumns } from "../columns/recomendacionColumns"
import NotificationPage from "./NotificationPage"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { inputClass, buttonPrimaryClass, buttonOutlineClass } from "@/utils/styles"
import { obtenerRecomendacionesAdmin, responderRecomendacion, } from "../../recommendations/service/recomendacionService"
import { createPortal } from "react-dom";

export default function RecomendacionesPage() {

    const [tab, setTab] = useState("vendedor")
    const [filter, setFilter] = useState("PENDIENTE")
    const [data, setData] = useState([])
    const [selectedRec, setSelectedRec] = useState(null)
    const [respuesta, setRespuesta] = useState("")
    const [cargando, setCargando] = useState(false)
    const [page, setPage] = useState(1)
    const [totalPaginas, setTotalPaginas] = useState(1)

    const cargarRecomendaciones = useCallback(async () => {
        setCargando(true)
        try {
            const response = await obtenerRecomendacionesAdmin(filter, "", page)
            setData(response.recomendaciones || [])
            setTotalPaginas(response.totalPaginas || 1)
        } catch (error) {
            toast.error(error.message)
        } finally {
            setCargando(false)
        }
    }, [filter, page])

    useEffect(() => {
        if (tab === "vendedor") cargarRecomendaciones()
    }, [tab, cargarRecomendaciones])

    // Reinicia la página cuando cambia el filtro
    useEffect(() => {
        setPage(1)
    }, [filter])

    const handleOpenModal = (rec) => {
        setSelectedRec(rec)
        setRespuesta("")
    }

    const handleCloseModal = () => {
        setSelectedRec(null)
        setRespuesta("")
    }

    const handleResponder = async () => {
        if (!respuesta.trim()) return toast.error("La respuesta no puede estar vacía")
        try {
            await responderRecomendacion(selectedRec._id, respuesta)
            toast.success("Recomendación respondida")
            handleCloseModal()
            cargarRecomendaciones()
        } catch (error) {
            toast.error(error.message)
        }
    }

    const columns = useMemo(() =>
        recomendacionColumns(
            handleOpenModal,
            null,
            async (rec, estado) => {
                toast.success(`Recomendación ${estado ? "atendida" : "pendiente"}`)
            }
        ),
    [filter])

    return (
        <div className="p-6 space-y-6">
            <div>
                <p className="text-gray-500">
                    Este módulo te permite gestionar las recomendaciones del sistema y vendedores
                </p>
            </div>

            <div className="bg-white/60 backdrop-blur-xl rounded-2xl border border-white/20 overflow-hidden">
                <div className="flex border-b bg-white">
                    <button
                        onClick={() => setTab("vendedor")}
                        className={`px-6 py-3 text-sm font-medium ${tab === "vendedor" ? "bg-emerald-100 text-emerald-800" : "text-gray-600 hover:bg-gray-100"}`}
                    >
                        Vendedor
                    </button>
                    <button
                        onClick={() => setTab("ia")}
                        className={`px-6 py-3 text-sm font-medium ${tab === "ia" ? "bg-emerald-100 text-emerald-800" : "text-gray-600 hover:bg-gray-100"}`}
                    >
                        Inteligentes
                    </button>
                </div>

                <div className="p-6">
                    {tab === "vendedor" ? (
                        <>
                            <div className="flex gap-3 mb-6 justify-self-end pr-5">
                                <Button
                                    onClick={() => setFilter("PENDIENTE")}
                                    className={filter === "PENDIENTE" ? "bg-emerald-100 text-emerald-700" : "bg-gray-200 text-gray-600"}
                                >
                                    Pendientes
                                </Button>
                                <Button
                                    onClick={() => setFilter("FINALIZADA")}
                                    className={filter === "FINALIZADA" ? "bg-emerald-100 text-emerald-700" : "bg-gray-200 text-gray-600"}
                                >
                                    Atendidas
                                </Button>
                            </div>

                            {cargando ? (
                                <div className="p-6 text-center">Cargando recomendaciones...</div>
                            ) : (
                                <div className="flex flex-col">
                                    <DataTable
                                        data={data}
                                        columns={columns}
                                    />
                                    <div className="flex justify-center items-center gap-2 p-4 flex-wrap">
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
                                </div>
                            )}
                        </>
                    ) : (
                        <NotificationPage />
                    )}
                </div>
            </div>

            {selectedRec && createPortal(
                <div className="fixed top-0 left-0 right-0 bottom-0 bg-white/30 backdrop-blur-sm flex items-center justify-center z-50">
                    <Card className="w-full max-w-md p-6 bg-emerald-50 backdrop-blur-xl border border-gray-200 shadow-xl rounded-2xl">
                        <h2 className="text-lg font-bold text-gray-800 mb-2">
                            {selectedRec.estado === "FINALIZADA" ? "Detalle de recomendación" : "Responder"}
                        </h2>
                        <p className="text-[15px] text-gray-500 mb-3">{selectedRec.mensaje}</p>
                        {selectedRec.estado === "FINALIZADA" ? (
                            <div className="bg-white rounded-xl border border-emerald-200 p-4">
                                <p className="text-sm text-gray-600">{selectedRec.respuestaAdmin || "Sin respuesta registrada"}</p>
                            </div>
                        ) : (
                            <textarea
                                value={respuesta}
                                onChange={(e) => setRespuesta(e.target.value)}
                                placeholder="Escribe tu respuesta..."
                                className={`${inputClass} h-28 resize-none`}
                                maxLength={100}
                            />
                        )}
                        <div className="flex justify-end gap-3 mt-4">
                            <Button
                                variant="ghost"
                                className={`max-w-[100px] py-[22px] ${buttonOutlineClass}`}
                                onClick={handleCloseModal}
                            >
                                {selectedRec.estado === "FINALIZADA" ? "Cerrar" : "Cancelar"}
                            </Button>
                            {selectedRec.estado !== "FINALIZADA" && (
                                <Button
                                    onClick={handleResponder}
                                    className={`max-w-[100px] ${buttonPrimaryClass}`}
                                >
                                    Aceptar
                                </Button>
                            )}
                        </div>
                    </Card>
                </div>,
                document.body
            )}
        </div>
    )
}