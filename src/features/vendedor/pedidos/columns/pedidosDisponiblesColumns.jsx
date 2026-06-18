import { createColumnHelper } from "@tanstack/react-table"
import StatusBadge from "@/features/shared/components/StatusBadge"

const columnHelper = createColumnHelper()

export const pedidosDisponiblesColumns = (onToggle) => [

    columnHelper.accessor((row) => row, {
        id: "cliente",
        header: "Cliente",
        cell: (info) => {
            const pedido = info.getValue();
            return pedido.datosFacturacion?.nombreCompleto || "Sin nombre";
        }
    }),

    columnHelper.accessor("nombrePedido", {
        header: "Nombre del Pedido",
        cell: (info) => {
            return info.getValue() || "Sin nombre";
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

    columnHelper.accessor("tipoEntrega",
        {
            header: "Tipo de Entrega",
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
            const pedido = row.original

            const handleToggle = async (nuevoEstado) => {
                await onToggle(pedido, nuevoEstado)
            }


            return (
                <div className="flex justify-center">
                    <StatusBadge
                        isActivo={pedido.estado === "PENDIENTE"}
                        label={pedido.estado === "PENDIENTE" ? "Disponible" : "Tomado"}
                        onToggle={() => handleToggle(pedido.estado === "PENDIENTE" ? "TOMADO" : "PENDIENTE")}
                    />
                </div>
            );
        }
    })
]