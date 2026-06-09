import useVentaStore from "../context/useVentaStore";
import VentaLayout from "../components/VentaLayout";

export default function VentaPage() {

    const {
        factura,
        agregarProducto,
        cambiarCantidad,
        eliminarProducto,
        pedidoSeleccionado,
        setPedidoSeleccionado,
        limpiarVenta,
        setMetodoPago,
        setDatosFacturacion,
        setFactura
    } = useVentaStore();

    return (
        <VentaLayout
            pedidoSeleccionado={pedidoSeleccionado}
            setPedidoSeleccionado={setPedidoSeleccionado}
            factura={factura}
            agregarProducto={agregarProducto}
            cambiarCantidad={cambiarCantidad}
            eliminarProducto={eliminarProducto}
            limpiarFactura={limpiarVenta}
            setMetodoPago={setMetodoPago}
            setDatosFacturacion={setDatosFacturacion}
            setFactura={setFactura}
        />
    );
}