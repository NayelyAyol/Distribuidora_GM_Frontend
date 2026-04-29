import { useState } from "react"
import { toast } from "react-toastify"
import { FiMessageCircle, FiTrash2 } from "react-icons/fi"

import RecomendacionTable from "../components/RecomendacionTable"
import NotificationPage from "./NotificationPage"
import { createColumnHelper } from "@tanstack/react-table"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { inputClass, buttonPrimaryClass, buttonOutlineClass } from "@/utils/styles"

const columnHelper = createColumnHelper()

export default function RecomendacionesPage() {

    const [tab, setTab] = useState("vendedor")

    const [selectedRec, setSelectedRec] = useState(null)
    const [respuesta, setRespuesta] = useState("")
    const [itemDelete, setItemDelete] = useState(null)


    const recomendacionesVendedor = [
        {
            id: 1,
            descripcion: "Ofrecer combo promocional",
            vendedor: "Carlos Ruiz",
            fecha: "2025-04-28",
            estado: false
        }
    ]

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

    const handleOpenDelete = (item) => {
        setItemDelete(item)
    }

    const handleCloseDelete = () => {
        setItemDelete(null)
    }

    const handleConfirmDelete = () => {
        toast.success(`Recomendación ${itemDelete.id} eliminada`)
        handleCloseDelete()
    }



    const extraColumns = [
        columnHelper.display({
            id: "acciones",
            header: "Acción",
            cell: ({ row }) => {
                const rec = row.original

                return (
                    <div className="flex justify-center gap-3">

                        <button
                            onClick={() => handleOpenModal(rec)}
                            className="text-emerald-700 hover:text-emerald-900"
                        >
                            <FiMessageCircle />
                        </button>

                        <button
                            onClick={() => handleOpenDelete(rec)}
                            className="text-red-600 hover:text-red-800"
                        >
                            <FiTrash2 />
                        </button>

                    </div>
                )
            }
        })
    ]

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
                        className={`px-6 py-3 text-sm font-medium ${tab === "vendedor"
                            ? "bg-emerald-100 text-emerald-800"
                            : "text-gray-600 hover:bg-gray-100"
                            }`}
                    >
                        Recomendaciones del vendedor
                    </button>

                    <button
                        onClick={() => setTab("ia")}
                        className={`px-6 py-3 text-sm font-medium ${tab === "ia"
                            ? "bg-emerald-100 text-emerald-800"
                            : "text-gray-600 hover:bg-gray-100"
                            }`}
                    >
                        Recomendaciones inteligentes
                    </button>
                </div>

                <div className="p-6">

                    {tab === "vendedor" ? (
                        <RecomendacionTable
                            data={recomendacionesVendedor}
                            extraColumns={extraColumns}
                            onToggleEstado={async (rec, estado) => {
                                toast.success(
                                    `Recomendación ${estado ? "atendida" : "no atendida"}`
                                )
                            }}
                        />
                    ) : (
                        <NotificationPage />
                    )}

                </div>

            </div>

            {selectedRec && (
                <div className="fixed top-0 left-0 right-0 bottom-0 bg-white/30 backdrop-blur-sm flex items-center justify-center z-50">

                    <Card className="w-full max-w-md p-6 bg-emerald-50 backdrop-blur-xl border border-gray-200 shadow-xl rounded-2xl">

                        <h2 className="text-lg font-bold text-gray-800 mb-2">
                            Responder
                        </h2>

                        <p className="text-[15px] text-gray-500 mb-3">
                            {selectedRec.descripcion}
                        </p>

                        <textarea
                            value={respuesta}
                            onChange={(e) => setRespuesta(e.target.value)}
                            placeholder="Escribe tu respuesta..."
                            className={`${inputClass} h-28 resize-none`}
                        />
                        <div className="flex justify-end gap-3 mt-4">

                            <Button
                                variant="ghost"
                                className={`max-w-[100px] py-[22px] ${buttonOutlineClass}`}
                                onClick={handleCloseModal}
                            >
                                Cancelar
                            </Button>

                            <Button
                                onClick={handleResponder}
                                className={`max-w-[100px] ${buttonPrimaryClass}`}
                            >
                                Guardar
                            </Button>

                        </div>

                    </Card>

                </div>
            )}

            {itemDelete && (
                <div className="fixed top-0 left-0 right-0 bottom-0 bg-white/30 backdrop-blur-sm flex items-center justify-center z-50">

                    <Card className="w-full max-w-md p-6 bg-emerald-50 backdrop-blur-xl border border-gray-200 shadow-xl rounded-2xl">

                        <h2 className="text-lg font-bold text-gray-800 mb-2">
                            Confirmar eliminación
                        </h2>

                        <p className="text-[15px] text-gray-500 mb-4">
                            ¿Está seguro que desea eliminar esta recomendación?
                        </p>


                        <div className="flex justify-end gap-3">

                            <Button
                                variant="ghost"
                                className={`max-w-[100px] py-[22px] ${buttonOutlineClass}`}
                                onClick={handleCloseDelete}
                            >
                                Cancelar
                            </Button>

                            <Button
                                onClick={handleConfirmDelete}
                                className={`max-w-[100px] ${buttonPrimaryClass}`}
                            >
                                Eliminar
                            </Button>

                        </div>

                    </Card>

                </div>
            )}

        </div>
    )
}