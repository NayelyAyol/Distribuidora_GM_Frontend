import { createColumnHelper } from "@tanstack/react-table"
import StatusBadge from "@/features/shared/components/StatusBadge"
import { FiEye, FiMessageCircle } from "react-icons/fi" // <-- Importamos el nuevo icono

const columnHelper = createColumnHelper()

export const pedidosClienteColumns = (onRevisar, onChat) => [

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
                // Envolvemos en un flex para organizar ambos botones alineados
                <div className="flex items-center justify-center gap-3">
                    
                    {/* Botón Ver original */}
                    <button
                        onClick={() => onRevisar(pedido)}
                        className="
                            px-3 py-1.5 rounded-lg
                            bg-emerald-100
                            hover:bg-emerald-200
                            text-emerald-700
                            text-sm
                            flex items-center gap-2
                            transition
                        "
                    >
                        <FiEye />
                        Ver
                    </button>

                    {/* Botón Chat igual al de vendedores */}
                    <button
                        onClick={() => onChat(pedido)}
                        className="
                            text-emerald-700 
                            hover:text-emerald-900 
                            p-1.5 
                            rounded-full 
                            hover:bg-emerald-50 
                            transition 
                            flex items-center justify-center
                        "
                        title="Abrir chat"
                    >
                        <FiMessageCircle className="text-lg" />
                    </button>

                </div>
            )
        }
    })
]