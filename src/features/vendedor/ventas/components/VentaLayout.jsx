import IngresoProducto from "./IngresoProducto"
import FacturaPanel from "./Factura"

export default function VentaLayout({
    factura,
    agregarProducto,
    cambiarCantidad,
    eliminarProducto,
    limpiarFactura
}) {

    return (
        <div className="p-6 space-y-6">

            <div>
                <p className="text-gray-500">
                    Este módulo te permite escanear o ingresar productos para generar la venta
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <div>
                    <IngresoProducto onAdd={agregarProducto} />
                </div>
                <FacturaPanel
                    factura={factura}
                    cambiarCantidad={cambiarCantidad}
                    eliminarProducto={eliminarProducto}
                    limpiarFactura={limpiarFactura}
                />

            </div>
        </div>
    )
}