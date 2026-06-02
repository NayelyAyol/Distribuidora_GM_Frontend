import { useNavigate, useLocation } from "react-router-dom"

import {
    FiCheckCircle,
    FiShoppingBag,
    FiShoppingCart,
    FiPrinter
} from "react-icons/fi"

import {
    buttonPrimaryClass,
    buttonOutlineClass
} from "@/utils/styles"

import { Button } from "@/components/ui/button"

export default function PedidoExitosoPage() {

    const handlePrint = () => {
        window.print()
    }

    const navigate = useNavigate()
    const location = useLocation()

    const esPedidoFoto = location.state?.esPedidoFoto || false
    
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

    const totalPedidoFoto = 50

    let subtotal = 0
    let iva = 0
    let total = 0

    if (esPedidoFoto) {

        total = totalPedidoFoto
        subtotal = total / 1.15
        iva = total - subtotal

    } else {

        subtotal = carrito.reduce(
            (acc, p) => acc + p.precio * p.cantidad,
            0
        )

        iva = subtotal * 0.15
        total = subtotal + iva

    }
    return (

        <div className="
        p-6
        flex flex-col gap-6
    ">

            <div>
                <p className="text-gray-500">
                    Este módulo te permite visualizar
                    la confirmación de tu pedido
                </p>
            </div>

            <div className="
            flex items-center
            justify-center
            min-h-[80vh]
        ">

                <div className="
                w-full
                max-w-2xl
                bg-white/80
                backdrop-blur-xl
                border border-gray-200
                shadow-xl
                rounded-3xl
                p-10
                flex flex-col
                items-center
                text-center
                print-area
                gap-8
            ">

                    <div className="
                    w-24 h-24
                    rounded-full
                    bg-emerald-100
                    flex items-center
                    justify-center
                ">

                        <FiCheckCircle
                            size={60}
                            className="text-emerald-700"
                        />

                    </div>

                    <div className="flex flex-col gap-3">

                        <h1 className="
                        text-4xl
                        font-black
                        text-gray-800
                    ">
                            ¡Pedido confirmado!
                        </h1>

                        <p className="
                        text-gray-500
                        text-lg
                        max-w-xl
                    ">
                            Tu compra se realizó correctamente.
                        </p>

                    </div>

                    <div className="
                    w-full
                    bg-emerald-50
                    border border-emerald-100
                    rounded-2xl
                    p-6
                    grid grid-cols-1 md:grid-cols-2
                    gap-6
                ">

                        <div className="
                        flex flex-col gap-2
                    ">

                            <p className="
                            text-sm
                            text-gray-500
                        ">
                                Número de pedido
                            </p>

                            <p className="
                            text-xl
                            font-bold
                            text-emerald-800
                        ">
                                #PED-2026-001
                            </p>

                        </div>

                        <div className="
                        flex flex-col gap-2
                    ">

                            <p className="
                            text-sm
                            text-gray-500
                        ">
                                Estado
                            </p>

                            <p className="
                            text-xl
                            font-bold
                            text-emerald-800
                        ">
                                Confirmado
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

                    {!esPedidoFoto && (
                        <div className="w-full bg-white/60 border border-gray-200 rounded-2xl p-6 flex flex-col gap-3 text-left">

                            <p className="text-sm text-gray-500">
                                Productos vendidos
                            </p>

                            <div className="flex flex-col gap-2">

                                <div className="flex justify-between text-gray-800 border-b border-gray-200 pb-2">
                                    <span>Producto A</span>
                                    <span>x2</span>
                                </div>

                                <div className="flex justify-between text-gray-800 border-b border-gray-200 pb-2">
                                    <span>Producto B</span>
                                    <span>x1</span>
                                </div>

                                <div className="flex justify-between text-gray-800">
                                    <span>Producto C</span>
                                    <span>x3</span>
                                </div>

                            </div>

                        </div>
                    )}

                    <div className="w-full bg-emerald-50 border border-emerald-100 rounded-2xl p-6 flex flex-col gap-2 text-left">

                        <div className="flex justify-between text-gray-800">
                            <span>Subtotal</span>
                            <span>${subtotal.toFixed(2)}</span>
                        </div>

                        <div className="flex justify-between text-gray-800">
                            <span>IVA</span>
                            <span>${iva.toFixed(2)}</span>
                        </div>

                        <div className="border-t border-emerald-200 pt-3 flex justify-between text-emerald-800 font-bold text-lg">
                            <span>Total</span>
                            <span>${total.toFixed(2)}</span>
                        </div>

                    </div>

                    <div className="
                    w-full
                    flex flex-col
                    gap-4
                ">

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Button
                                onClick={() =>
                                    navigate("/dashboard/mi-carrito")
                                }
                                className={buttonPrimaryClass}
                            >
                                <FiShoppingCart size={20} />
                                Volver al carrito
                            </Button>

                            <Button
                                onClick={() =>
                                    navigate("/dashboard/mis-pedidos")
                                }
                                className={buttonPrimaryClass}
                            >
                                <FiShoppingBag size={20} />
                                Ver mis pedidos
                            </Button>
                        </div>

                        <div className="flex justify-center">
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
        </div>
    )
}