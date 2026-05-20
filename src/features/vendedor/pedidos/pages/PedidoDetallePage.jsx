import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

import {
    FiArrowLeft,
    FiMapPin,
    FiPhone,
    FiCreditCard
} from "react-icons/fi"

import { useNavigate, useParams } from "react-router-dom"

import useAuthStore from "@/context/useAuthStore"

export default function PedidoDetallePage() {

    const navigate = useNavigate()

    const { id } = useParams()

    const user = useAuthStore((state) => state.user)

    const esCliente =
        user?.rol?.toUpperCase() === "CLIENTE"

    const pedido = {

        id,

        tipo: "LISTA",

        cliente: "Juan Pérez",

        fecha: "2026-05-10",

        estado: "EN_PROCESO",

        direccion: "Quito - Ecuador",

        referencia: "Frente al parque central",

        telefono: "0999999999",

        metodoPago: "Transferencia",

        observacion:
            "Entregar en horario de la tarde",

        imagen:
            "https://placehold.co/900x1200/png",

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

    const esPedidoLista =
        pedido.tipo === "LISTA"

    const esPedidoCarrito =
        pedido.tipo === "CARRITO"

    const total = pedido.productos.reduce(
        (acc, item) =>
            acc + item.precio * item.cantidad,
        0
    )

    return (

        <div className="p-6 space-y-6">

            <p className="text-gray-500">
                Este módulo te permite visualizar el detalle
                del pedido realizado
            </p>

            <div className="
                flex flex-col gap-4
                md:flex-row
                md:items-center
                md:justify-between
            ">

                <div>

                    <h1 className="
                        text-2xl
                        font-bold
                        text-gray-800
                    ">
                        Pedido #{pedido.id}
                    </h1>

                    <p className="text-gray-500">
                        Información detallada del pedido
                    </p>

                </div>

                <Button
                    onClick={() => navigate(-1)}
                    className="
                        bg-gray-200
                        text-gray-700
                        hover:bg-emerald-100
                    "
                >

                    <FiArrowLeft />

                    Volver

                </Button>

            </div>

            <Card className="
                p-6
                rounded-3xl
                border border-white/20
                shadow-sm
                bg-white/60
                backdrop-blur-xl
            ">

                <div className="
                    grid md:grid-cols-2
                    xl:grid-cols-4
                    gap-6
                ">

                    <div>

                        <p className="
                            text-sm
                            text-gray-500
                        ">
                            Cliente
                        </p>

                        <p className="font-medium">
                            {pedido.cliente}
                        </p>

                    </div>

                    <div>

                        <p className="
                            text-sm
                            text-gray-500
                        ">
                            Fecha
                        </p>

                        <p className="font-medium">
                            {pedido.fecha}
                        </p>

                    </div>

                    <div>

                        <p className="
                            text-sm
                            text-gray-500
                        ">
                            Estado
                        </p>

                        <p className="font-medium text-emerald-700">
                            {pedido.estado}
                        </p>

                    </div>

                    <div>

                        <p className="
                            text-sm
                            text-gray-500
                        ">
                            Método de pago
                        </p>

                        <div className="
                            flex items-center gap-2
                            font-medium
                        ">

                            <FiCreditCard />

                            {pedido.metodoPago}

                        </div>

                    </div>

                </div>

            </Card>

            <Card className="
                p-6
                rounded-3xl
                border border-white/20
                shadow-sm
                bg-white/60
                backdrop-blur-xl
                space-y-5
            ">

                <div>

                    <h2 className="
                        text-lg
                        font-semibold
                        text-gray-800
                    ">
                        Dirección de entrega
                    </h2>

                    <p className="text-sm text-gray-500">
                        Información de entrega del pedido
                    </p>

                </div>

                <div className="grid md:grid-cols-2 gap-5">

                    <div className="flex gap-3">

                        <div className="
                            w-11 h-11
                            rounded-xl
                            bg-emerald-100
                            flex items-center justify-center
                            shrink-0
                        ">

                            <FiMapPin className="text-emerald-700" />

                        </div>

                        <div>

                            <p className="
                                text-sm
                                text-gray-500
                            ">
                                Dirección
                            </p>

                            <p className="font-medium text-gray-800">
                                {pedido.direccion}
                            </p>

                            <p className="text-sm text-gray-500">
                                {pedido.referencia}
                            </p>

                        </div>

                    </div>

                    <div className="flex gap-3">

                        <div className="
                            w-11 h-11
                            rounded-xl
                            bg-emerald-100
                            flex items-center justify-center
                            shrink-0
                        ">

                            <FiPhone className="text-emerald-700" />

                        </div>

                        <div>

                            <p className="
                                text-sm
                                text-gray-500
                            ">
                                Teléfono
                            </p>

                            <p className="font-medium text-gray-800">
                                {pedido.telefono}
                            </p>

                        </div>

                    </div>

                </div>

            </Card>

            {
                esPedidoLista && (

                    <Card className="
                        p-6
                        rounded-3xl
                        border border-white/20
                        shadow-sm
                        bg-white/60
                        backdrop-blur-xl
                        space-y-6
                    ">

                        <div>

                            <h2 className="
                                text-lg
                                font-semibold
                                text-gray-800
                            ">
                                Lista enviada por el cliente
                            </h2>

                            <p className="text-sm text-gray-500">
                                Fotografía subida para preparar el pedido
                            </p>

                        </div>

                        <div className="
                            rounded-3xl
                            overflow-hidden
                            border border-gray-200
                            bg-gray-50
                        ">

                            <img
                                src={pedido.imagen}
                                alt="Lista de útiles"
                                className="
                                    w-full
                                    max-h-[650px]
                                    object-contain
                                "
                            />

                        </div>

                    </Card>

                )
            }

            {
                esPedidoCarrito && (

                    <Card className="
                        p-6
                        rounded-3xl
                        border border-white/20
                        shadow-sm
                        bg-white/60
                        backdrop-blur-xl
                    ">

                        <div className="mb-5">

                            <h2 className="
                                text-lg
                                font-semibold
                                text-gray-800
                            ">
                                Productos solicitados
                            </h2>

                            <p className="text-sm text-gray-500">
                                Productos agregados al carrito
                            </p>

                        </div>

                        <div className="space-y-4">

                            {
                                pedido.productos.map((producto) => (

                                    <div
                                        key={producto.id}
                                        className="
                                            flex items-center
                                            justify-between
                                            border border-gray-100
                                            rounded-2xl
                                            p-4
                                            bg-white
                                        "
                                    >

                                        <div>

                                            <p className="
                                                font-medium
                                                text-gray-800
                                            ">
                                                {producto.nombre}
                                            </p>

                                            <p className="
                                                text-sm
                                                text-gray-500
                                            ">
                                                Cantidad: {producto.cantidad}
                                            </p>

                                        </div>

                                        <div className="
                                            font-semibold
                                            text-emerald-700
                                        ">
                                            $
                                            {
                                                (
                                                    producto.precio *
                                                    producto.cantidad
                                                ).toFixed(2)
                                            }
                                        </div>

                                    </div>

                                ))
                            }

                        </div>

                        <div className="
                            flex justify-end
                            mt-6
                        ">

                            <div className="
                                text-xl
                                font-bold
                                text-emerald-700
                            ">
                                Total: ${total.toFixed(2)}
                            </div>

                        </div>

                    </Card>

                )
            }

            <Card className="
                p-6
                rounded-3xl
                border border-white/20
                shadow-sm
                bg-white/60
                backdrop-blur-xl
            ">

                <div>

                    <h2 className="
                        text-lg
                        font-semibold
                        text-gray-800
                        mb-2
                    ">
                        Observaciones
                    </h2>

                    <p className="text-gray-600 leading-relaxed">
                        {pedido.observacion}
                    </p>

                </div>

            </Card>

            {
                !esCliente && (

                    <Card className="
                        p-6
                        rounded-3xl
                        border border-white/20
                        shadow-sm
                        bg-white/60
                        backdrop-blur-xl
                    ">

                        <div className="
                            flex flex-wrap gap-4
                            justify-end
                        ">

                            <Button
                                className="
                                    bg-amber-100
                                    text-amber-700
                                    hover:bg-amber-200
                                "
                            >
                                Marcar en proceso
                            </Button>

                            <Button
                                className="
                                    bg-emerald-600
                                    hover:bg-emerald-700
                                "
                            >
                                Finalizar pedido
                            </Button>

                        </div>

                    </Card>

                )
            }

        </div>

    )
}