import { useState } from "react"
import { toast } from "react-toastify"
import DataTable from "@/components/ui/DataTable"
import { recomendacionColumns } from "../columns/recomendacionColumns"
import NotificationPage from "./NotificationPage"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { inputClass, buttonPrimaryClass, buttonOutlineClass } from "@/utils/styles"

export default function RecomendacionesPage() {

    const [tab, setTab] = useState("vendedor")
    const [filter, setFilter] = useState("PENDIENTE")

    const [selectedRec, setSelectedRec] = useState(null)
    const [respuesta, setRespuesta] = useState("")

    const [recomendacionesVendedor] = useState([
        { id: 1, descripcion: "Ofrecer combo promocional", vendedor: "Carlos Ruiz", fecha: "2025-04-28", respuesta: null },
        { id: 2, descripcion: "Mejorar tiempos de entrega", vendedor: "Ana García", fecha: "2025-05-10", respuesta: "En revisión" }
    ])

    const filteredData = filter === "PENDIENTE" 
        ? recomendacionesVendedor.filter(item => !item.respuesta)
        : recomendacionesVendedor.filter(item => item.respuesta)

    const handleOpenModal = (rec) => {
        setSelectedRec(rec)
        setRespuesta("")
    }

    const handleCloseModal = () => {
        setSelectedRec(null)
        setRespuesta("")
    }

    const handleResponder = () => {
        if (!respuesta.trim()) {
            toast.error("La respuesta no puede estar vacía")
            return
        }
        toast.success("Recomendación respondida")
        handleCloseModal()
    }

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
                                    Finalizadas
                                </Button>
                            </div>

                            <DataTable
                                data={filteredData}
                                columns={recomendacionColumns(
                                    handleOpenModal,
                                    null,
                                    async (rec, estado) => {
                                        toast.success(`Recomendación ${estado ? "atendida" : "pendiente"}`)
                                    }
                                )}
                            />
                        </>
                    ) : (
                        <NotificationPage />
                    )}
                </div>
            </div>

            {selectedRec && (
                <div className="fixed top-0 left-0 right-0 bottom-0 bg-white/30 backdrop-blur-sm flex items-center justify-center z-50">
                    <Card className="w-full max-w-md p-6 bg-emerald-50 backdrop-blur-xl border border-gray-200 shadow-xl rounded-2xl">
                        <h2 className="text-lg font-bold text-gray-800 mb-2">Responder</h2>
                        <p className="text-[15px] text-gray-500 mb-3">{selectedRec.descripcion}</p>
                        <textarea
                            value={respuesta}
                            onChange={(e) => setRespuesta(e.target.value)}
                            placeholder="Escribe tu respuesta..."
                            className={`${inputClass} h-28 resize-none`}
                            maxLength={100}
                        />
                        <div className="flex justify-end gap-3 mt-4">
                            <Button variant="ghost" className={`max-w-[100px] py-[22px] ${buttonOutlineClass}`} onClick={handleCloseModal}>
                                Cancelar
                            </Button>
                            <Button onClick={handleResponder} className={`max-w-[100px] ${buttonPrimaryClass}`}>
                                Aceptar
                            </Button>
                        </div>
                    </Card>
                </div>
            )}
        </div>
    )
}