import { createColumnHelper } from "@tanstack/react-table"
import StatusBadge from "@/features/shared/components/StatusBadge"
import { FiEye, FiMessageCircle, FiXCircle } from "react-icons/fi"
import { MdPayment } from "react-icons/md"

const columnHelper = createColumnHelper()

export const pedidosClienteColumns = (onRevisar, onChat, onPago, onCancelar) => [

    columnHelper.accessor("nombrePedido", {
        header: "Nombre del Pedido",
        cell: ({ row }) => row.original.nombrePedido || "Sin nombre"
    }),

    columnHelper.accessor("fecha", {
        header: "Fecha",
        cell: ({ row }) => new Date(row.original.createdAt).toLocaleDateString()
    }),

    columnHelper.accessor("tipoPedido",
        {
            header: "Tipo de Pedido",
            cell: (info) => {
                const tipo = info.getValue();
                return tipo || "N/A";
            }
        }),

    columnHelper.accessor("estado", {
        header: "Estado",
        cell: ({ row }) => {
            const pedido = row.original

            const labels = {
                PENDIENTE: "Pendiente",
                EN_PROCESO: "En Proceso",
                FINALIZADO: "Finalizado",
                CANCELADO: "Cancelado"
            };

            return (
                <StatusBadge
                    isActivo={pedido.estado === "FINALIZADO"}
                    label={labels[pedido.estado] || pedido.estado}
                />
            );
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
                        title="Revisar pedido"
                    >
                        <FiEye className="text-lg" />
                    </button>

                    {(pedido.estado === "EN_PROCESO" || pedido.estado === "FINALIZADO") && (
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
                    )}
                    
                    {pedido.estado === "PENDIENTE" && (
                        <button
                            onClick={() => onCancelar(pedido)}
                            className="
                                text-red-600
                                hover:text-red-800
                                p-1.5
                                rounded-full
                                hover:bg-red-100
                                transition
                                flex items-center justify-center
                            "
                            title="Cancelar pedido"
                        >
                            <FiXCircle className="text-lg" />
                        </button>
                    )}

                    {/*{pedido.estado === "FINALIZADO" &&
                        
                        (
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
                            */}
                </div>
            )
        }
    })
]