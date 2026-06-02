import { createColumnHelper } from "@tanstack/react-table"
import StatusBadge from "@/features/shared/components/StatusBadge"
import { FiEye, FiMessageCircle } from "react-icons/fi"

const columnHelper = createColumnHelper()

export const pedidosSeleccionadosColumns = (
    onRevisar,
    onChat,
    mostrarAcciones = true
) => {

    const columnas = [
        columnHelper.accessor("cliente", { header: "Cliente" }),
        columnHelper.accessor("cedula", { header: "Cédula" }),
        columnHelper.accessor("fecha", { header: "Fecha" }),

        columnHelper.accessor("estado", {
            header: "Estado",
            cell: ({ row }) => {
                const pedido = row.original

                if (pedido.estado === "CANCELADO") {
                    return (
                        <span className="
                            px-3 py-1
                            rounded-full
                            text-xs font-medium
                            bg-red-100
                            text-red-700
                        ">
                            Cancelado
                        </span>
                    )
                }

                return (
                    <StatusBadge
                        estado={pedido.estado === "FINALIZADO"}
                        labelActivo="Finalizado"
                        labelInactivo="Pendiente"
                    />
                )
            }
        })
    ]

    if (mostrarAcciones) {
        columnas.push(
            columnHelper.display({
                id: "acciones",
                header: "Acciones",
                cell: ({ row }) => {
                    const pedido = row.original

                    return (
                        <div className="flex items-center justify-center gap-2">
                            <button
                                onClick={() => onRevisar(pedido)}
                                className="
                                    px-3 py-1.5
                                    text-emerald-700
                                    hover:text-emerald-900
                                "
                            >
                                <FiEye />
                            </button>

                            <button
                                onClick={() => onChat(pedido)}
                                className="
                                    text-emerald-700
                                    hover:text-emerald-900
                                "
                            >
                                <FiMessageCircle />
                            </button>
                        </div>
                    )
                }
            })
        )
    }

    return columnas
}