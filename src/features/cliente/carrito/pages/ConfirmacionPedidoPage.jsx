import { useNavigate } from "react-router-dom"
import { FiArrowLeft } from "react-icons/fi"
import { FiCheckCircle } from "react-icons/fi"

import CarritoList from "../components/CarritoList"

import ResumenPago
from "../../../shared/pagos/components/ResumenPago"

import {
    buttonPrimaryClass,
    buttonOutlineClass
} from "@/utils/styles"

import { Button } from "@/components/ui/button"

export default function ConfirmacionPedidoPage() {

    const navigate = useNavigate()

    const metodoPago = "Tarjeta"

    const carrito = [
        {
            id: 1,
            nombre: "Producto A",
            precio: 10,
            cantidad: 2,
            imagen: "https://placehold.co/100x100"
        },
        {
            id: 2,
            nombre: "Producto B",
            precio: 20,
            cantidad: 1,
            imagen: "https://placehold.co/100x100"
        }
    ]

    return (

        <div className="
            p-6
            flex flex-col gap-6
        ">

            <div className="flex flex-col gap-4">

                <div>
                    <p className="text-gray-500">
                        Este módulo te permite revisar
                        la información antes de
                        confirmar tu pedido
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
                        Volver al método de pago
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


                    <div className="
                        bg-white/80
                        backdrop-blur-xl
                        border border-gray-200
                        shadow-lg
                        rounded-2xl
                        p-6
                        flex flex-col gap-4
                    ">

                        <div className="
                            flex items-center gap-3
                        ">

                            <FiCheckCircle
                                size={26}
                                className="
                                    text-emerald-700
                                "
                            />

                            <h2 className="
                                text-xl
                                font-bold
                                text-gray-800
                            ">
                                Confirmación del pedido
                            </h2>

                        </div>

                        <div className="
                            flex flex-col gap-3
                        ">

                            <div>

                                <p className="
                                    text-sm text-gray-500
                                ">
                                    Método de pago
                                </p>

                                <p className="
                                    font-semibold
                                    text-gray-800
                                ">
                                    {metodoPago}
                                </p>

                            </div>

                            <div>

                                <p className="
                                    text-sm text-gray-500
                                ">
                                    Dirección de entrega
                                </p>

                                <p className="
                                    font-semibold
                                    text-gray-800
                                ">
                                    Av. Siempre Viva 123
                                </p>

                            </div>

                        </div>

                    </div>

                    <div className="
                        flex flex-col gap-4
                    ">

                        <h3 className="
                            text-lg
                            font-bold
                            text-gray-800
                        ">
                            Productos del pedido
                        </h3>

                        <CarritoList
                            carrito={carrito}
                            editable={false}
                        />

                    </div>

                </div>

                <div className="
                    flex flex-col gap-4
                ">

                    <ResumenPago carrito={carrito} />

                    <Button
                        onClick={() =>
                            navigate("/dashboard/mi-carrito/pago/confirmar-pago/pedido-exitoso")
                        }
                        className={buttonPrimaryClass}
                    >
                        Confirmar
                    </Button>

                    <Button
                        onClick={() => navigate(-1)}
                        className={`${buttonOutlineClass} p-[22px]`}
                    >
                        Cancelar
                    </Button>

                </div>

            </div>

        </div>
    )
}