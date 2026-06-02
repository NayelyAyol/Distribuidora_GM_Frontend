import { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { FiArrowLeft } from "react-icons/fi"
import MetodoPagoSelector from "../../../shared/pagos/components/MetodoPagoSelector"
import ResumenPago from "../../../shared/pagos/components/ResumenPago"
import TarjetaForm from "../../../shared/pagos/components/TarjetaForm"
import TransferenciaForm from "../../../shared/pagos/components/TransferenciaForm"
import { buttonPrimaryClass } from "@/utils/styles"
import { Button } from "@/components/ui/button"

export default function CobroPage() {
    const navigate = useNavigate()
    const location = useLocation()

    const factura = location.state?.factura || []
    const [metodoSeleccionado, setMetodoSeleccionado] = useState("")

    return (
        <div className="p-6 flex flex-col gap-6">
            <div className="flex flex-col gap-4">
                <button
                    onClick={() => navigate(-1)}
                    className="w-fit flex items-center gap-2 text-gray-600 hover:text-emerald-700 transition font-medium"
                >
                    <FiArrowLeft size={20} />
                    <span>Volver a Pedidos</span>
                </button>
                <h1 className="text-2xl font-bold">Proceso de Pago</h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                <div className="lg:col-span-2 flex flex-col gap-6">
                    <MetodoPagoSelector
                        metodoSeleccionado={metodoSeleccionado}
                        setMetodoSeleccionado={setMetodoSeleccionado}
                    />

                    {metodoSeleccionado === "transferencia" && <TransferenciaForm />}
                    {metodoSeleccionado === "tarjeta" && <TarjetaForm />}
                </div>

                <div className="flex flex-col gap-4">
                    <ResumenPago productos={factura} />

                    {metodoSeleccionado && (
                        <Button
                            onClick={() => navigate("/dashboard/ventas/cobro/confirmacion-venta", {
                                state: { factura, metodoPago: metodoSeleccionado }
                            })}
                            className={buttonPrimaryClass}
                        >
                            Continuar a Confirmación
                        </Button>
                    )}
                </div>
            </div>
        </div>
    )
}