import { useEffect, useState } from "react"
import { FiSearch } from "react-icons/fi"

import { Input } from "@/components/ui/input"
import { inputClass } from "@/utils/styles"

import { obtenerMisPedidos } from "../../../cliente/pedidos/services/pedidoService"

export default function SeleccionPedido({
    pedidoSeleccionado,
    onSelect,
    setMetodoPago,
    setDatosFacturacion,
    setFactura
}) {

    const [pedidos, setPedidos] = useState([])
    const [loading, setLoading] = useState(true)
    const [busqueda, setBusqueda] = useState("")

    useEffect(() => {

        const cargarPedidos = async () => {

            try {

                const params = {
                    estado: "EN_PROCESO"
                }

                if (busqueda.trim()) {
                    params.buscar = busqueda.trim()
                }

                const query = new URLSearchParams(params).toString()

                const data = await obtenerMisPedidos(query)

                setPedidos(data.pedidos || [])

            } catch (error) {

                console.error(error)

            } finally {

                setLoading(false)

            }
        }

        const delay = setTimeout(() => {
            cargarPedidos()
        }, 400)

        return () => clearTimeout(delay)

    }, [busqueda])

    return (
        <div className="
            bg-white/60
            backdrop-blur-xl
            rounded-2xl
            border
            border-white/20
            p-6
            shadow-lg
            space-y-4
        ">

            <h2 className="font-bold text-emerald-900">
                Seleccionar pedido
            </h2>

            <div className="flex items-center bg-white rounded-full border border-gray-100 shadow-sm">

                <Input
                    type="text"
                    placeholder="Buscar pedido por nombre del cliente..."
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    className={`${inputClass} bg-transparent border-0 focus:ring-0 flex-1 placeholder:text-sm`}
                />

                <button
                    className="
                        rounded-full
                        flex
                        items-center
                        justify-center
                        h-12
                        w-12
                        px-2
                        bg-emerald-700/10
                        hover:bg-emerald-100
                        text-emerald-800
                        transition
                    "
                >
                    <FiSearch className="text-emerald-900 text-xl" />
                </button>

            </div>

            {
                loading
                    ? (
                        <p className="text-sm text-gray-500">
                            Cargando pedidos...
                        </p>
                    )
                    : (
                        <div className="max-h-28 overflow-y-auto custom-scroll space-y-3 pr-2">

                            {
                                pedidos.length === 0 && (
                                    <p className="text-center text-gray-500 py-4">
                                        No se encontraron pedidos
                                    </p>
                                )
                            }

                            {
                                pedidos.map((pedido) => (

                                    <button
                                        key={pedido._id}
                                        onClick={() => {

                                            onSelect(pedido)

                                            setFactura([])

                                            if (
                                                pedido.tipoPedido === "CARRITO" ||
                                                pedido.tipoPedido === "FOTO_LISTA"
                                            ) {

                                                setMetodoPago(
                                                    pedido.metodoPago || ""
                                                )

                                                setDatosFacturacion(
                                                    pedido.datosFacturacion || {}
                                                )

                                                if (pedido.tipoPedido === "CARRITO") {

                                                    const productosFactura =
                                                        pedido.articulos.map(item => ({
                                                            id: item.producto,
                                                            nombre: item.nombreProducto,
                                                            precio: item.precioUnitario,
                                                            cantidad: item.cantidad,
                                                            stock: 9999
                                                        }))

                                                    setFactura(productosFactura)
                                                }
                                            }
                                        }}
                                        className={`
                                            w-full
                                            text-left
                                            p-4
                                            rounded-xl
                                            border
                                            transition
                                            ${
                                                pedidoSeleccionado?._id === pedido._id
                                                    ? "border-emerald-500 bg-emerald-50"
                                                    : "border-gray-200 hover:bg-gray-50"
                                            }
                                        `}
                                    >

                                        <p className="font-semibold text-gray-800">
                                            {pedido.nombrePedido}
                                        </p>

                                        <p className="text-xs text-gray-500">
                                            Cliente: {pedido.datosFacturacion?.nombreCompleto}
                                        </p>

                                        <p className="text-xs text-gray-400">
                                            Tipo: {pedido.tipoPedido}
                                        </p>

                                        <p className="text-xs text-gray-400">
                                            Estado: {pedido.estado}
                                        </p>

                                    </button>

                                ))
                            }

                        </div>
                    )
            }

        </div>
    )
}