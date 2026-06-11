import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { FiArrowLeft, FiCheckCircle } from "react-icons/fi";
import CarritoList from "../components/CarritoList";
import ResumenPago from "../../../shared/pagos/components/ResumenPago";

import {
    buttonPrimaryClass,
    buttonOutlineClass
} from "@/utils/styles";

import { Button } from "@/components/ui/button";
import { crearPedidoCarrito, pagarCarritoTarjeta } from "../../carrito/services/carritoService";
import { definirPagoPedido } from "../../pedidos/services/pedidoService";

export default function ConfirmacionPedidoPage() {

    const navigate = useNavigate();
    const location = useLocation();

    const [loading, setLoading] = useState(false);

    const carrito = location.state?.carrito || null;

    const metodoPago =
        location.state?.metodoPago || "";
    
        const resumenDatos = location.state?.resumenDatos || null;

    const tipoEntrega =
        location.state?.tipoEntrega || "local";

    const datosPedido =
        location.state?.datosPedido || {};

    const esPedidoFoto =
        location.state?.esPedidoFoto || false;

    const rutaExito =
        location.pathname.includes("/mis-pedidos")
            ? "/dashboard/mis-pedidos/pago/confirmar-pago/pedido-exitoso"
            : "/dashboard/mi-carrito/pago/confirmar-pago/pedido-exitoso";



    const pedidoId = location.state?.pedidoId;

    const handleConfirmar = async () => {
        console.log("DEBUG: ID que llega a confirmación:", pedidoId); 
    
    if (!pedidoId) {
        toast.error("Error: ID de pedido no encontrado. Por favor, reinicia el proceso.");
        return;
    }
    setLoading(true);
    try {
        let respuesta;
        const pedidoId = location.state?.pedidoId;
        
        const payloadBase = {
            metodoPago: metodoPago.toUpperCase(),
        };

        if (esPedidoFoto) {
            const payload = {
                ...payloadBase,
                paymentMethodId: location.state?.paymentMethodId || null
            };

            respuesta = await definirPagoPedido(pedidoId, payload);

            toast.success("Método de pago registrado correctamente");
            
            navigate(rutaExito, {
                state: {
                    pedido:respuesta.data.pedido,
                    esPedidoFoto: true,
                }
            });

        } else {
            const payload = {
                ...datosPedido,
                tipoEntrega: tipoEntrega === "domicilio" ? "ENVIO_DOMICILIO" : "RETIRO_LOCAL",
                metodoPago: metodoPago.toUpperCase(),
                observaciones: datosPedido.observaciones || "",
                carrito: carrito
            };

                        console.log("Payload enviado:", payload);

            if (tipoEntrega === "domicilio") {
                payload.ciudad = datosPedido.ciudad;
                payload.direccion = datosPedido.direccion;
                payload.referencia = datosPedido.referencia;
            }

            if (metodoPago === "TARJETA") {
                payload.paymentMethodId = location.state?.paymentMethodId;
                respuesta = await pagarCarritoTarjeta(payload);
            } else {
                respuesta = await crearPedidoCarrito(payload);
            }

            toast.success("Pedido creado correctamente");

            navigate(rutaExito, {
                state: {
                    esPedidoFoto: false,
                    pedido: respuesta.pedido
                }
            });
        }
    } catch (error) {
        console.error("Error en confirmación:", error);
        toast.error(error.message || "Error al procesar la confirmación");
    } finally {
        setLoading(false);
    }
};

    return (

        <div className="p-6 flex flex-col gap-6">

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

            <div
                className="
                    grid grid-cols-1 lg:grid-cols-3
                    gap-6
                    items-start
                "
            >

                <div
                    className="
                        lg:col-span-2
                        flex flex-col gap-6
                    "
                >

                    <div
                        className="
                            bg-white/80
                            backdrop-blur-xl
                            border border-gray-200
                            shadow-lg
                            rounded-2xl
                            p-6
                            flex flex-col gap-4
                        "
                    >

                        <div
                            className="
                                flex items-center gap-3
                            "
                        >

                            <FiCheckCircle
                                size={26}
                                className="
                                    text-emerald-700
                                "
                            />

                            <h2
                                className="
                                    text-xl
                                    font-bold
                                    text-gray-800
                                "
                            >
                                Confirmación del pedido
                            </h2>

                        </div>

                        <div
                            className="
                                flex flex-col gap-3
                            "
                        >

                            <div>

                                <p className="text-sm text-gray-500">
                                    Método de pago
                                </p>

                                <p className="font-semibold text-gray-800">
                                    {metodoPago}
                                </p>

                            </div>

                            <div>

                                <p className="text-sm text-gray-500">
                                    Nombre
                                </p>

                                <p className="font-semibold text-gray-800">
                                    {datosPedido.nombreCompleto}
                                </p>

                            </div>

                            <div>

                                <p className="text-sm text-gray-500">
                                    Correo
                                </p>

                                <p className="font-semibold text-gray-800">
                                    {datosPedido.correo}
                                </p>

                            </div>

                            {tipoEntrega === "domicilio" && (

                                <div>

                                    <p className="text-sm text-gray-500">
                                        Dirección
                                    </p>

                                    <p className="font-semibold text-gray-800">
                                        {datosPedido.direccion}
                                    </p>

                                </div>

                            )}

                        </div>

                    </div>

                    {!esPedidoFoto && carrito && (

                        <div
                            className="
                                flex flex-col gap-4
                            "
                        >

                            <h3
                                className="
                                    text-lg
                                    font-bold
                                    text-gray-800
                                "
                            >
                                Productos del pedido
                            </h3>

                            <CarritoList
                                carrito={carrito.articulos || []}
                                editable={false}
                            />

                        </div>

                    )}

                </div>

                <div className="flex flex-col gap-4">

                    <ResumenPago
                        carrito={carrito}
                        esPedidoFoto={esPedidoFoto}
                        tipoEntrega={tipoEntrega}
                        resumenDatos={resumenDatos}
                    />

                    <Button
                        onClick={handleConfirmar}
                        disabled={loading}
                        className={buttonPrimaryClass}
                    >
                        {
                            loading
                                ? "Procesando..."
                                : "Confirmar"
                        }
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

    );
}