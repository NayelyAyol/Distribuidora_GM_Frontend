import { createColumnHelper } from "@tanstack/react-table"
import StatusBadge from "@/features/shared/components/StatusBadge"
import { FiEye, FiXCircle } from "react-icons/fi"

const columnHelper = createColumnHelper()

export const ventasColumns = (onVerDetalle, onCancelar) => [
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
        cell: ({ row }) => {
            const venta = row.original;
            const puedeCancelar = venta.estado !== 'FINALIZADO' && venta.estado !== 'CANCELADO';
            return (
                <div className="flex items-center justify-center gap-3">
                    <button
                        onClick={() => onVerDetalle(venta)}
                        className="text-emerald-700 hover:text-emerald-900 p-1.5 rounded-full hover:bg-emerald-200 transition flex items-center justify-center"
                        title="Ver detalle"
                    >
                        <FiEye className="text-lg" />
                    </button>
                    {puedeCancelar && (
                        <button
                            onClick={() => onCancelar(venta)}
                            className="text-red-500 hover:text-red-700 p-1.5 rounded-full hover:bg-red-100 transition flex items-center justify-center"
                            title="Cancelar venta"
                        >
                            <FiXCircle className="text-lg" />
                        </button>
                    )}
                </div>
            );
        }
    })
]