import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useNavigate, useParams } from "react-router-dom"

export default function PedidoDetallePage() {

    const navigate = useNavigate()
    const { id } = useParams()

    const pedido = {
        id,
        cliente: "Juan Pérez",
        fecha: "2026-05-10",
        estado: "EN_PROCESO",
        direccion: "Quito - Ecuador",
        observacion: "Entregar en horario de la tarde",

        productos: [
            {
                id: 1,
                nombre: "Laptop",
                cantidad: 1,
                precio: 850
            },
            {
                id: 2,
                nombre: "Mouse Gamer",
                cantidad: 2,
                precio: 25
            }
        ]
    }

    const total = pedido.productos.reduce(
        (acc, item) => acc + item.precio * item.cantidad,
        0
    )

    return (
        <div className="p-6 space-y-6">

            <div className="flex items-center justify-between">

                <div>
                    <h1 className="text-2xl font-bold text-gray-800">
                        Pedido #{pedido.id}
                    </h1>

                    <p className="text-gray-500">
                        Información detallada del pedido
                    </p>
                </div>

                <Button
                    onClick={() => navigate(-1)}
                    className="bg-gray-200 text-gray-700 hover:bg-emerald-100"
                >
                    Volver
                </Button>

            </div>

            <Card className="p-6 rounded-2xl shadow-sm">

                <div className="grid md:grid-cols-2 gap-4">

                    <div>
                        <p className="text-sm text-gray-500">
                            Cliente
                        </p>

                        <p className="font-medium">
                            {pedido.cliente}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">
                            Fecha
                        </p>

                        <p className="font-medium">
                            {pedido.fecha}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">
                            Estado
                        </p>

                        <p className="font-medium">
                            {pedido.estado}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">
                            Dirección
                        </p>

                        <p className="font-medium">
                            {pedido.direccion}
                        </p>
                    </div>

                </div>

                <div className="mt-5">
                    <p className="text-sm text-gray-500 mb-1">
                        Observación
                    </p>

                    <p className="text-gray-700">
                        {pedido.observacion}
                    </p>
                </div>

            </Card>

            <Card className="p-6 rounded-2xl shadow-sm">

                <h2 className="text-lg font-semibold mb-4">
                    Productos solicitados
                </h2>

                <div className="space-y-4">

                    {pedido.productos.map((producto) => (

                        <div
                            key={producto.id}
                            className="flex items-center justify-between border rounded-xl p-4"
                        >

                            <div>
                                <p className="font-medium text-gray-800">
                                    {producto.nombre}
                                </p>

                                <p className="text-sm text-gray-500">
                                    Cantidad: {producto.cantidad}
                                </p>
                            </div>

                            <div className="font-semibold text-emerald-700">
                                $
                                {(producto.precio * producto.cantidad).toFixed(2)}
                            </div>

                        </div>
                    ))}

                </div>

                <div className="flex justify-end mt-6">

                    <div className="text-xl font-bold text-emerald-700">
                        Total: ${total.toFixed(2)}
                    </div>

                </div>

            </Card>

        </div>
    )
}