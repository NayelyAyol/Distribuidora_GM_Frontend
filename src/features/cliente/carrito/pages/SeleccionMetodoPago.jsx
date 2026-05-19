import { useState } from "react"
import MetodoPagoSelector from "../../../shared/pagos/components/MetodoPagoSelector"
import ResumenPago from "../../../shared/pagos/components/ResumenPago"
import TransferenciaForm from "../../../shared/pagos/components/TransferenciaForm"
import TarjetaForm from "../../../shared/pagos/components/TarjetaForm"
import { useNavigate } from "react-router-dom"
import { FiArrowLeft } from "react-icons/fi"
import {buttonPrimaryClass} from "@/utils/styles"
import { Button } from "@/components/ui/button";

export default function SeleccionMetodoPagoPage() {

    const navigate = useNavigate()

    const [metodoSeleccionado, setMetodoSeleccionado]
        = useState("")

    const carrito = [
        {
            id: 1,
            nombre: "Producto A",
            precio: 10,
            cantidad: 2
        },
        {
            id: 2,
            nombre: "Producto B",
            precio: 20,
            cantidad: 1
        }
    ]

    return (

        <div className="p-6 flex flex-col gap-6">

            <div className="flex flex-col gap-4">

                <div>
                    <p className="text-gray-500">
                        Este módulo te permite seleccionar
                        tu método de pago
                    </p>
                </div>

                <button
                    onClick={() => navigate(-1)}
                    className="
                        w-fit
                        flex items-center gap-2
                        text-gray-600
                        hover:text-emerald-700
                        transition
                        font-medium
                    "
                >

                    <FiArrowLeft size={20} />

                    <span>
                        Volver al carrito
                    </span>

                </button>

            </div>

            <div className="
                grid grid-cols-1 lg:grid-cols-3
                gap-6
                items-start
            ">

                <div className="
                    lg:col-span-2
                    flex flex-col gap-6
                ">

                    <MetodoPagoSelector
                        metodoSeleccionado={
                            metodoSeleccionado
                        }
                        setMetodoSeleccionado={
                            setMetodoSeleccionado
                        }
                    />

                    {
                        metodoSeleccionado === "transferencia"
                        && <TransferenciaForm />
                    }

                    {
                        metodoSeleccionado === "tarjeta"
                        && <TarjetaForm />
                    }

                </div>

                <div className="flex flex-col gap-4">

                    <ResumenPago carrito={carrito} />

                    {
                        metodoSeleccionado && (

                            <Button
                                className={buttonPrimaryClass}
                                onClick={()=> navigate("/dashboard/mi-carrito/pago/confirmar-pago")}
                            >
                                Continuar
                            </Button>

                        )
                    }

                </div>

            </div>

        </div>
    )
}