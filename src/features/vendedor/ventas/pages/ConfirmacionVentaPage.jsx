import { useNavigate, useLocation } from "react-router-dom" // Importamos useLocation

import {
    FiArrowLeft,
    FiCheckCircle
} from "react-icons/fi"

import {
    buttonPrimaryClass,
    buttonOutlineClass
} from "@/utils/styles"

import { Button } from "@/components/ui/button"
import { ventaDirecta, ventaDesdePedido } from "../services/ventaService"
import { toast } from "react-toastify"
import { calcularFactura } from "@/utils/calcularFactura"
import useVentaStore from "../context/useVentaStore"

export default function ConfirmacionVentaPage() {

    const navigate = useNavigate()
    const location = useLocation()

    const {
        factura,
        pedidoSeleccionado,
        metodoPago,
        datosFacturacion,
        limpiarVenta
    } = useVentaStore();


    const handleConfirmarVenta = async () => {
        try {
            const productosSinStock = factura.filter(p => p.cantidad > p.stock);
            if (productosSinStock.length > 0) {
                toast.error(`Stock insuficiente para ${productosSinStock[0].nombre}`);
                return;
            }

            const datosVenta = {
                metodoPago,
                datosFacturacion,
                articulos: factura.map(p => ({
                    producto: p.id,
                    cantidad: p.cantidad
                }))
            };

            let response;
            if (pedidoSeleccionado?._id) {
                response = await ventaDesdePedido(pedidoSeleccionado._id, datosVenta);
            } else {
                response = await ventaDirecta(datosVenta);
            }

            limpiarVenta(); 

            navigate("/dashboard/ventas/cobro/confirmacion-venta/venta-exitosa", {
                state: { venta: response.venta }
            });

        } catch (error) {
            console.error("ERROR API:", error.response?.data || error.message);
            toast.error("Error al procesar la venta. Inténtalo de nuevo.");
        }
    }

    const { subtotal, iva, envio, total } = calcularFactura(
        factura,
        pedidoSeleccionado?.tipoEntrega
    )

    return (
        <div className="
            p-6
            flex flex-col gap-6
        ">
            <div className="flex flex-col gap-4">
                <div>
                    <p className="text-gray-500">
                        Este módulo te permite
                        confirmar la venta realizada
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
                        Volver al cobro
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
                                Confirmación de venta
                            </h2>
                        </div>

                        <div className="
                            flex flex-col gap-3
                        ">
                            <div>
                                <p className="
                                    text-sm
                                    text-gray-500
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
                                    text-sm
                                    text-gray-500
                                ">
                                    Nombre del pedido
                                </p>
                                <p className="
                                    font-semibold
                                    text-gray-800
                                ">
                                    {pedidoSeleccionado?.nombrePedido}
                                </p>
                            </div>

                            <div>
                                <p className="
                                    text-sm
                                    text-gray-500
                                ">
                                    Cliente
                                </p>
                                <p className="
                                    font-semibold
                                    text-gray-800
                                ">
                                    {datosFacturacion?.nombreCompleto}
                                </p>
                    
                            </div>
                        </div>
                    </div>

                    <div className="
                        bg-white/80
                        backdrop-blur-xl
                        border border-gray-200
                        shadow-lg
                        rounded-2xl
                        p-6
                        flex flex-col gap-4
                    ">
                        <h3 className="
                            text-lg
                            font-bold
                            text-gray-800
                        ">
                            Productos facturados
                        </h3>

                        {factura.map((producto, index) => (
                            <div
                                key={producto.id || index}
                                className="
                                    flex items-center
                                    justify-between
                                    border-b
                                    pb-3
                                "
                            >
                                <div>
                                    <p className="
                                        font-semibold
                                        text-gray-800
                                    ">
                                        {producto.nombre}
                                    </p>
                                    <p className="
                                        text-sm
                                        text-gray-500
                                    ">
                                        Cantidad:
                                        {" "}
                                        {producto.cantidad}
                                    </p>
                                </div>

                                <p className="
                                    font-bold
                                    text-emerald-700
                                ">
                                    $
                                    {(
                                        producto.precio * producto.cantidad
                                    ).toFixed(2)}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="
                    flex flex-col gap-4
                ">
                    <div className="
                        bg-white/80
                        backdrop-blur-xl
                        border border-gray-200
                        shadow-lg
                        rounded-2xl
                        p-6
                        flex flex-col gap-3
                    ">
                        <h3 className="
                            text-lg
                            font-bold
                            text-gray-800
                        ">
                            Total cobrado
                        </h3>

                        <div className="
                            flex justify-between
                            text-sm text-gray-500
                        ">
                            <span>Productos</span>
                            <span>{factura.length}</span>
                        </div>

                        <div className="
                            flex justify-between
                            text-sm text-gray-500
                        ">
                            <span>Método de pago</span>
                            <span>{metodoPago}</span>
                        </div>

                        <div className="border-t pt-4">
                            <div className="
                                flex justify-between
                                items-center
                            ">
                                <span className="
                                    text-lg
                                    font-bold
                                    text-gray-800
                                ">
                                    Total
                                </span>
                                <span className="
                                    text-3xl
                                    font-black
                                    text-emerald-700
                                ">
                                    ${total.toFixed(2)}
                                </span>
                            </div>
                        </div>
                    </div>

                    <Button
                        onClick={handleConfirmarVenta}
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