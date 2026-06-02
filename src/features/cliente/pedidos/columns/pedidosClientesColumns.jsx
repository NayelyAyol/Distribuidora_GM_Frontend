import { createColumnHelper } from "@tanstack/react-table"
import StatusBadge from "@/features/shared/components/StatusBadge"
import { FiEye, FiMessageCircle } from "react-icons/fi" 
import { MdPayment } from "react-icons/md"

const columnHelper = createColumnHelper()

export const pedidosClienteColumns = (onRevisar, onChat, onPago) => [

    columnHelper.accessor("fecha", {
        header: "Fecha"
    }),

    columnHelper.accessor("nombre", {
        header: "Nombre",
        cell: ({ row }) => row.original.nombre
    }),

    columnHelper.accessor("estado", {
        header: "Estado",
        cell: ({ row }) => {
            const pedido = row.original

            return (
                <StatusBadge
                    estado={pedido.estado === "FINALIZADO"}
                    labelActivo="Finalizado"
                    labelInactivo="Pendiente"
                />
            )
        }
    }),

    columnHelper.display({
        id: "acciones",
        header: "Acción",
        cell: ({ row }) => {
            const pedido = row.original

            return (
                <div className="flex items-center justify-center gap-3">
                    
                    <button
                        onClick={() => onRevisar(pedido)}
                        className="
                            text-emerald-700 
                            hover:text-emerald-900 
                            p-1.5 
                            rounded-full 
                            hover:bg-emerald-200 
                            transition 
                            flex items-center justify-center
                        "
                        title = "Revisar pedido"
                    >
                        <FiEye className="text-lg" />
                    </button>

                    <button
                        onClick={() => onChat(pedido)}
                        className="
                            text-emerald-700 
                            hover:text-emerald-900 
                            p-1.5 
                            rounded-full 
                            hover:bg-emerald-200 
                            transition 
                            flex items-center justify-center
                        "
                        title="Chat"
                    >
                        <FiMessageCircle className="text-lg" />
                    </button>

                    {pedido.estado === "FINALIZADO" && (
                    <button
                        onClick={() => onPago(pedido)}
                        className="
                            text-emerald-700 
                            hover:text-emerald-900 
                            p-1.5 
                            rounded-full 
                            hover:bg-emerald-200 
                            transition 
                            flex items-center justify-center
                        "
                        title="Realizar pago"
                    >
                        <MdPayment className="text-lg" />
                    </button>
                    )}
                </div>
            )
        }
    })
]