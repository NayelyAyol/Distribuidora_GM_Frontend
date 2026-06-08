import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { validarCompra } from "../services/carritoService"
import { toast } from "react-toastify"

export default function CarritoResumen({ carrito, tipoEntrega, setTipoEntrega }) {
    const navigate = useNavigate()
    const [cargando, setCargando] = useState(false);
    // Si carrito es null, retornamos un mensaje o vacío
    if (!carrito) return null;

    // Usamos los valores directamente desde el objeto que viene del backend
    const iva = carrito.ivaGeneral || 0;
    const total = carrito.totalGeneral || 0;

    const continuarPago = async () => {
        setCargando(true); // Bloqueamos el botón para evitar clics duplicados

        try {
            // Paso 6: Validar compra antes de avanzar
            const respuesta = await validarCompra();

            if (respuesta.puedeComprar) {
                // Si todo está bien, navegamos al flujo de pago
                navigate("/dashboard/mi-carrito/pago", {
                    state: { tipoEntrega,
                        carrito:carrito
                    }
                });
            } else {
                // Si hay problemas, mostramos el error y NO navegamos
                // Opción profesional: Mostrar un mensaje compuesto
                const mensajeError = respuesta.productosConProblemas
                    .map(p => `${p.nombreProducto}: ${p.motivo}`)
                    .join('\n');

                toast.error(`Stock insuficiente:\n${mensajeError}`, {
                    duration: 6000,
                    style: { whiteSpace: 'pre-wrap' } // Para que se vean los saltos de línea
                });

                console.error("Productos con problemas:", respuesta.productosConProblemas);
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

                <p className="font-medium mb-3">
                    Tipo de entrega
                </p>

                <div className="grid grid-cols-2 gap-3">

                    <label className="flex items-center gap-2">

                        <input
                            type="radio"
                            name="entrega"
                            value="local"
                            checked={tipoEntrega === "local"}
                            onChange={(e) =>
                                setTipoEntrega(e.target.value)
                            }
                        />

                        Local

                    </label>

                    <label className="flex items-center gap-2">

                        <input
                            type="radio"
                            name="entrega"
                            value="domicilio"
                            checked={tipoEntrega === "domicilio"}
                            onChange={(e) =>
                                setTipoEntrega(e.target.value)
                            }
                        />

                        A domicilio

                    </label>

                </div>
            </div>

            <div className="flex justify-between">
                <span>Subtotal:</span>
                <span className="font-bold text-emerald-800">${carrito.subtotalGeneral.toFixed(2)}</span>
            </div>

            <div className="flex justify-between">
                <span>IVA (15%):</span>
                <span className="font-bold text-emerald-800">${iva.toFixed(2)}</span>
            </div>

            <div className="flex justify-between">
                <span>Total:</span>
                <span className="font-bold text-emerald-800">${total.toFixed(2)}</span>
            </div>

            <button
                disabled={cargando} // Deshabilitamos si está validando
                onClick={continuarPago}
                className={`w-full py-3 rounded-lg font-medium transition ${cargando ? "bg-gray-300 cursor-not-allowed" : "bg-emerald-600 text-white hover:bg-emerald-700"
                    }`}
            >
                {cargando ? "Validando..." : "Pagar"}
            </button>
        </div>
    )
}