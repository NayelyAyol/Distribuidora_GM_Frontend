import { useNavigate } from "react-router-dom"

export default function CarritoResumen({ carrito }) {
    const navigate = useNavigate()

    // Si carrito es null, retornamos un mensaje o vacío
    if (!carrito) return null;

    // Usamos los valores directamente desde el objeto que viene del backend
    const subtotal = carrito.subtotalGeneral || 0;
    const iva = carrito.ivaGeneral || 0;
    const total = carrito.totalGeneral || 0;

    return (
        <div className="bg-white rounded-xl shadow-sm p-6 flex flex-col gap-4">
            <h2 className="text-xl font-bold text-center">Resumen de compra</h2>

            <div className="flex justify-between">
                <span>Subtotal:</span>
                <span className="font-bold text-emerald-800">${subtotal.toFixed(2)}</span>
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
                className="bg-emerald-100 hover:bg-emerald-200 text-emerald-700 py-3 rounded-lg font-medium transition"
                onClick={() => navigate("/dashboard/mi-carrito/pago")}
            >
                Pagar
            </button>
        </div>
    )
}