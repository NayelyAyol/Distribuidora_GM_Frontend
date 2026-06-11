import IngresoProducto from "./IngresoProducto"
import FacturaPanel from "./Factura"
import SeleccionPedido from "./SeleccionPedido"

export default function VentaLayout({
    factura,
    modo,
    esEditable,
    agregarProducto,
    cambiarCantidad,
    eliminarProducto,
    limpiarFactura,
    pedidoSeleccionado,
    setPedidoSeleccionado,
    setMetodoPago,
    setDatosFacturacion,
    setFactura
}) {

    return (
        <div className="p-6 space-y-6">

            <div>
                <p className="text-gray-500">
                    Este módulo te permite ingresar productos para generar una venta
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <div className="space-y-6">
                        {/*<SeleccionPedido
                            pedidoSeleccionado={pedidoSeleccionado}
                            onSelect={setPedidoSeleccionado}
                            setMetodoPago={setMetodoPago}
                            setDatosFacturacion={setDatosFacturacion}
                            setFactura={setFactura}
                        />*/}
                    <IngresoProducto onAdd={agregarProducto} />
                </div>
                <FacturaPanel
                    factura={factura}
                    modo={modo}
                    esEditable={esEditable}
                    cambiarCantidad={cambiarCantidad}
                    eliminarProducto={eliminarProducto}
                    limpiarFactura={limpiarFactura}
                    pedidoSeleccionado={pedidoSeleccionado}
                    limpiarPedido={() => setPedidoSeleccionado(null)}
                />

            </div>
        </div>
    )
}