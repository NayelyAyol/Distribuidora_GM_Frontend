import { useNavigate, useLocation } from "react-router-dom"
import { calcularFactura } from "@/utils/calcularFactura"

import {
    FiCheckCircle,
    FiPrinter,
    FiFileText
} from "react-icons/fi"

import {
    buttonPrimaryClass,
    buttonOutlineClass
} from "@/utils/styles"

import { Button } from "@/components/ui/button"

export default function VentaExitosaPage() {
    const handlePrint = () => {
        window.print()
    }
    const navigate = useNavigate()
    const location = useLocation()
    const venta = location.state?.venta

    console.log("Estructura completa de la venta:", venta);
    console.log("Estructura del primer artículo:", venta?.articulos?.[0]);

    if (!venta) {
        return (
            <div className="p-6 flex flex-col gap-4">
                <p className="text-red-600 font-semibold">
                    No se encontraron datos de la venta.
                </p>

                <Button onClick={() => navigate("/dashboard/ventas")}>
                    Volver a ventas
                </Button>
            </div>
        );
    }

    const { subtotal, iva, total } = calcularFactura(venta.articulos, null);

    return (
        <div className="p-6 flex flex-col gap-6">

            <div>
                <p className="text-gray-500">
                    Este módulo te permite visualizar la confirmación de la venta
                </p>
            </div>

            <div className="flex items-center justify-center min-h-[80vh]">

                <div className="w-full max-w-2xl bg-white/80 backdrop-blur-xl border border-gray-200 shadow-xl rounded-3xl p-10 flex flex-col items-center text-center gap-8 print-area">

                    <div className="w-24 h-24 rounded-full bg-emerald-100 flex items-center justify-center">
                        <FiCheckCircle size={60} className="text-emerald-700" />
                    </div>

                    <div className="flex flex-col gap-3">
                        <h1 className="text-4xl font-black text-gray-800">
                            ¡Venta realizada!
                        </h1>

                        <p className="text-gray-500 text-lg max-w-xl">
                            La factura fue procesada correctamente.
                        </p>
                    </div>

                    <div className="w-full bg-emerald-50 border border-emerald-100 rounded-2xl p-6 grid grid-cols-1 md:grid-cols-2 gap-6">

                        <div className="flex flex-col gap-2">
                            <p className="text-sm text-gray-500">Origen de venta</p>
                            <p className="text-xl font-bold text-emerald-800">
                                {venta.origen}
                            </p>
                        </div>

                        <div className="flex flex-col gap-2">
                            <p className="text-sm text-gray-500">Estado</p>
                            <p className="text-xl font-bold text-emerald-800">
                                {venta.estado}
                            </p>
                        </div>

                    </div>

                    <div className="w-full bg-white/60 border border-gray-200 rounded-2xl p-6 flex flex-col gap-2 text-left">

                        <p className="text-sm text-gray-500">
                            Dirección del local
                        </p>

                        <p className="text-lg font-semibold text-gray-800">
                            Cd La OE1-450 Calle 8 y cale, OE2A, Quito - Ecuador
                        </p>

                    </div>

                    <div className="w-full bg-white/60 border border-gray-200 rounded-2xl p-6 flex flex-col gap-3 text-left">

                        <p className="text-sm text-gray-500">
                            Productos vendidos
                        </p>

                        <div className="flex flex-col gap-2">

                            {venta.articulos.map((item, index) => (
                                <div key={index} className="flex justify-between text-gray-800 border-b border-gray-200 pb-2">
                                    <span>{item.producto.nombre || item.nombreProducto}</span> 
                                    <span>x{item.cantidad}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="w-full bg-emerald-50 border border-emerald-100 rounded-2xl p-6 flex flex-col gap-2 text-left">
                        <div className="flex justify-between text-gray-800">
                            <span>Subtotal</span>
                            <span>${(venta.resumenPago?.subtotal || venta.resumenPago?.subtotalProductos || 0).toFixed(2)}</span>                        </div>

                        <div className="flex justify-between text-gray-800">
                            <span>IVA</span>
                            <span>${(venta.resumenPago?.iva || venta.resumenPago?.ivaProductos || 0).toFixed(2)}</span>
                        </div>

                        <div className="flex justify-between text-emerald-800 font-bold text-lg">
                            <span>Total</span>
                            <span>${(venta.total || venta.resumenPago?.totalPagar || 0).toFixed(2)}</span>
                        </div>
                    </div>

                    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">

                        <Button
                            onClick={() => navigate("/dashboard/ventas")}
                            className={buttonPrimaryClass}
                        >
                            <FiFileText size={20} />
                            Volver a la factura
                        </Button>

                        <Button
                            onClick={handlePrint}
                            className={`${buttonOutlineClass} p-[22px]`}
                        >
                            <FiPrinter size={20} />
                            Imprimir factura
                        </Button>

                    </div>

                </div>

            </div>

        </div>
    )
}