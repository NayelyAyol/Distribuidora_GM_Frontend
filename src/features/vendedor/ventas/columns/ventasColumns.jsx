import { createColumnHelper } from "@tanstack/react-table"
import StatusBadge from "@/features/shared/components/StatusBadge"
import { FiEye } from "react-icons/fi"

const columnHelper = createColumnHelper()

export const ventasColumns = (onVerDetalle) => [
    columnHelper.accessor("datosFacturacion.nombreCompleto", {
        header: "Cliente",
        cell: (info) => info.getValue() || "Sin nombre"
    }),
    columnHelper.accessor("origen", {
        header: "Origen",
        cell: (info) => info.getValue()
    }),
    columnHelper.accessor("estado", {
        header: "Estado Venta",
        cell: (info) => <span className="font-semibold">{info.getValue()}</span>
    }),
    columnHelper.accessor("estadoPago", {
        header: "Pago",
        cell: (info) => (
            <StatusBadge 
                isActivo={info.getValue() === "PAGADO"} 
                label={info.getValue()} 
            />
        )
    }),
    columnHelper.display({
        id: "acciones",
        header: "Acciones",
        cell: ({ row }) => (
            <div className="flex items-center justify-center gap-3">
                <button 
                    onClick={() => onVerDetalle(row.original)}
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
            </div>
        )
    })
]