import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { validarCompra } from "../services/carritoService"
import { toast } from "react-toastify"

export default function CarritoResumen({ carrito, tipoEntrega, setTipoEntrega, disabledPago = false }) {
    const navigate = useNavigate()
    const [cargando, setCargando] = useState(false);

    if (!carrito) return null;

    const iva = carrito.ivaGeneral || 0;
    const subtotal = carrito.subtotalGeneral || 0;
    const totalBase = carrito.totalGeneral || 0;
    const carritoVacio = !carrito.articulos || carrito.articulos.length === 0;

    const costoEnvio = tipoEntrega === "domicilio" ? 3.50 : 0;
    const totalFinal = totalBase + costoEnvio;

    const botonBloqueado = cargando || carritoVacio || disabledPago;

    const continuarPago = async () => {
        setCargando(true);
        try {
            const respuesta = await validarCompra();

            if (respuesta.puedeComprar) {
                navigate("/dashboard/mi-carrito/pago", {
                    state: {
                        checkout: {
                            carrito,
                            tipoEntrega,
                            esPedidoFoto: false,
                            pedido: null
                        }
                    }
                });
            } else {
                const mensajeError = respuesta.productosConProblemas
                    .map(p => `${p.nombreProducto}: ${p.motivo}`)
                    .join('\n');
                toast.error(`Stock insuficiente:\n${mensajeError}`, {
                    duration: 6000,
                    style: { whiteSpace: 'pre-wrap' }
                });
            }
        } catch (error) {
            toast.error(error.message || "Error al validar la compra");
        } finally {
            setCargando(false);
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-sm p-6 flex flex-col gap-4">
            <h2 className="text-xl font-bold text-center">Resumen de compra</h2>

            <div className="border-t border-b py-4">
                <p className="font-medium mb-3">Tipo de entrega</p>
                <div className="grid grid-cols-2 gap-3">
                    <label className="flex items-center gap-2">
                        <input
                            type="radio"
                            name="entrega"
                            value="local"
                            checked={tipoEntrega === "local"}
                            onChange={(e) => setTipoEntrega(e.target.value)}
                        />
                        Local
                    </label>
                    <label className="flex items-center gap-2">
                        <input
                            type="radio"
                            name="entrega"
                            value="domicilio"
                            checked={tipoEntrega === "domicilio"}
                            onChange={(e) => setTipoEntrega(e.target.value)}
                        />
                        A domicilio
                    </label>
                </div>
            </div>

            <div className="flex justify-between">
                <span>Subtotal:</span>
                <span className="font-bold text-emerald-800">${subtotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between">
                <span>IVA (15%):</span>
                <span className="font-bold text-emerald-800">${iva.toFixed(2)}</span>
            </div>

            {tipoEntrega === "domicilio" && (
                <div className="flex justify-between text-gray-600">
                    <span>Comisión de envío:</span>
                    <span className="font-bold text-emerald-800">${costoEnvio.toFixed(2)}</span>
                </div>
            )}

            <div className="flex justify-between border-t pt-3">
                <span>Total:</span>
                <span className="font-bold text-emerald-800">${totalFinal.toFixed(2)}</span>
            </div>

            {disabledPago && !carritoVacio && (
                <p className="text-xs text-red-500 text-center -mt-1">
                    Hay productos sin stock suficiente. Ajusta las cantidades para continuar.
                </p>
            )}

            <button
                disabled={botonBloqueado}
                onClick={continuarPago}
                className={`w-full py-3 rounded-lg font-medium transition ${
                    botonBloqueado ? "bg-gray-300 cursor-not-allowed" : "bg-emerald-600 text-white hover:bg-emerald-700"
                }`}
            >
                {cargando ? "Validando..." : "Pagar"}
            </button>
        </div>
    );
}