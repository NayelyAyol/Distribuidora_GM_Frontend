import StatusBadge from "@/features/shared/components/StatusBadge"
import { createColumnHelper } from "@tanstack/react-table"
import { FiMessageCircle } from "react-icons/fi"

const columnHelper = createColumnHelper()

export const recomendacionColumns = (onResponder, onToggleEstado) => [

    columnHelper.accessor("descripcion", {
        header: "Descripción"
    }),

    columnHelper.accessor("vendedor", {
        header: "Vendedor"
    }),

    columnHelper.accessor("fecha", {
        header: "Fecha"
    }),

    columnHelper.accessor("estado", {
        header: "Estado",
        cell: ({ row }) => {

            const rec = row.original
            const isActivo = rec.estado === "FINALIZADA";
            const label = isActivo ? "Finalizada" : "Pendiente";

            const handleToggle = async () => {
                const nuevoEstado = isActivo ? "PENDIENTE" : "FINALIZADA";
                await onToggleEstado(rec, nuevoEstado);
            };

            return (
                <StatusBadge
                    label={label}
                    isActivo={isActivo}
                    onToggle={handleToggle}
                />
            )
        }
    }),

    columnHelper.display({
        id: "acciones",
        header: "Acciones",
        cell: ({ row }) => {

            const rec = row.original

            return (
                <div className="flex justify-center gap-3">

                    <button
                        onClick={() => onResponder(rec)}
                        className="text-emerald-700 hover:text-emerald-900"
                    >
                        <FiMessageCircle />
                    </button>

                </div>
            )
        }
    })
]