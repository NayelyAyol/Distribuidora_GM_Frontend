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
        columnHelper.accessor("cliente", 
            { header: "Cliente",
                cell: (info) => {
                    const perfil = info.getValue()?.perfilId;
                    return perfil ? `${perfil.nombre} ${perfil.apellido}` : "Sin nombre";
                }
            }),
        
        columnHelper.accessor("tipoPedido", 
            { 
                header: "Tipo de Pedido",
                cell: (info) => {
                    const tipo = info.getValue();
                    return tipo || "N/A";
                }
            }),
        columnHelper.accessor("createdAt", { 
            header: "Fecha",
            cell: (info) => {
                const fecha = info.getValue();
                return fecha ? new Date(fecha).toLocaleDateString('es-EC') : "N/A";
            }
        }),

        columnHelper.accessor("estado", {
            header: "Estado",
            cell: ({ row }) => {
                const pedido = row.original;

                const labels = {
                    EN_PROCESO: "En Proceso",
                    FINALIZADO: "Finalizado",
                    CANCELADO: "Cancelado"
                };

                const isActivo = pedido.estado === "FINALIZADO";

                if (pedido.estado === "CANCELADO") {
                    return (
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
                            Cancelado
                        </span>
                    );
                }

                return (
                    <StatusBadge
                        isActivo={isActivo}
                        label={labels[pedido.estado] || pedido.estado}
                    />
                );
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