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
import { useEffect, useState } from "react"

export default function PedidoExitosoPage() {


    const navigate = useNavigate()
    const location = useLocation()
    console.log("DEBUG: Contenido de location.state:", location.state);

    const checkout = location.state?.checkout;
    const pedido = location.state?.pedido;
    const esPedidoFoto = location.state?.esPedidoFoto;
    const metodoPago = location.state?.metodoPago || pedido?.metodoPago || "DESCONOCIDO";

    const tipoEntrega = pedido?.tipoEntrega;

    const subtotal = pedido?.resumenPago?.subtotalProductos || 0;
    const iva = pedido?.resumenPago?.ivaProductos || 0;
    const envio = pedido?.resumenPago?.costoEnvio || 0;
    const total = pedido?.resumenPago?.totalPagar || 0;

    const productos = pedido?.articulos || [];

    const handlePrint = () => {
        window.print()
    }
    useEffect(() => {
        // Si no tenemos el pedido completo, lo buscamos por ID
        if (!pedido && location.state?.pedidoId) {
            // Llama a tu API para obtener los detalles: getPedidoById(location.state.pedidoId)
        }
    }, [pedido, location.state]);

    const getMensaje = () => {
        if (esPedidoFoto) {
            return {
                titulo: "¡Pago registrado!",
                descripcion: metodoPago === "TRANSFERENCIA"
                    ? "Hemos recibido tu selección de pago. Por favor, realiza la transferencia"
                    : "Tu método de pago ha sido configurado correctamente. Procesaremos tu pedido de inmediato."
            };
        }
        return {
            titulo: "¡Pedido confirmado!",
            descripcion: "Tu compra se realizó correctamente y está siendo procesada."
        };
    };

    const resumen = pedido?.resumenPago;

    const { titulo, descripcion } = getMensaje();
console.log("DEBUG pedido en exitoso:", JSON.stringify(location.state?.pedido));
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
                            {titulo}
                        </h1>

                        <p className="
                        text-gray-500
                        text-lg
                        max-w-xl
                    ">
                            {descripcion}
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
                                Nombre de pedido
                            </p>

                            <p className="
                            text-xl
                            font-bold
                            text-emerald-800
                        ">
                                {pedido?.nombrePedido || "Sin nombre"}
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
                                {pedido?.estado || "PENDIENTE"}
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


                    <div className="w-full bg-white/60 border border-gray-200 rounded-2xl p-6 flex flex-col gap-4 text-left">
                        <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                            Productos vendidos
                        </p>

                        <div className="flex flex-col gap-3">
                            {productos?.length > 0 ? (
                                productos.map((item, index) => (
                                    <div
                                        key={item.producto || index}
                                        className="flex items-center justify-between bg-white border border-gray-100 rounded-xl px-4 py-3"
                                    >
                                        <span className="text-gray-800 font-medium">{item.nombreProducto}</span>
                                        <span className="text-sm text-white bg-emerald-600 rounded-full px-3 py-1 font-semibold">
                                            x{item.cantidad}
                                        </span>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-400 italic">No hay productos en este pedido</p>
                            )}
                        </div>
                    </div>


                    <div className="w-full bg-emerald-50 border border-emerald-100 rounded-2xl p-6 flex flex-col gap-2 text-left">

                        <div className="flex justify-between text-gray-800">
                            <span>Subtotal</span>
                            <span>${subtotal.toFixed(2)}</span>
                        </div>

                        <div className="flex justify-between text-gray-800">
                            <span>IVA</span>
                            <span>${iva.toFixed(2)}</span>
                        </div>

                        {envio > 0 && (

                            <div className="flex justify-between text-gray-800">

                                <span>
                                    Envío
                                </span>

                                <span>
                                    ${envio.toFixed(2)}
                                </span>

                            </div>

                        )}

                        <div className="border-t border-emerald-200 pt-3 flex justify-between text-emerald-800 font-bold text-lg">
                            <span>Total</span>
                            <span>${total.toFixed(2)}</span>
                        </div>

                    </div>

                    <div className="w-full flex flex-col gap-4">
                        <div className="flex gap-4 justify-center flex-wrap">
                            {!esPedidoFoto && (
                                <Button
                                    onClick={() => navigate("/dashboard/mi-carrito")}
                                    className={`${buttonPrimaryClass} flex-1 min-w-[160px]`}
                                >
                                    <FiShoppingCart size={20} />
                                    Volver al carrito
                                </Button>
                            )}
                            <Button
                                onClick={() => navigate("/dashboard/mis-pedidos")}
                                className={`${buttonPrimaryClass} flex-1 min-w-[160px]`}
                            >
                                <FiShoppingBag size={20} />
                                Ver mis pedidos
                            </Button>
                        </div>

                        <div className="flex justify-center">
                            <Button
                                onClick={handlePrint}
                                className={`${buttonOutlineClass} p-[22px] w-full`}
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