import useVentaStore from "../context/useVentaStore";
import VentaLayout from "../components/VentaLayout";
import { useEffect } from "react";

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

useEffect(() => {
    if (!pedidoSeleccionado) return;

    if (factura.length === 0) {
        setFactura(
            pedidoSeleccionado.articulos || []
        );
    }

}, [pedidoSeleccionado]);

    return (
        <VentaLayout
            pedidoSeleccionado={pedidoSeleccionado}
            setPedidoSeleccionado={setPedidoSeleccionado}
            factura={factura}
            modo="VENTA_DIRECTA"
            agregarProducto={agregarProducto}
            cambiarCantidad={cambiarCantidad}
            eliminarProducto={eliminarProducto}
            limpiarFactura={limpiarVenta}
            setMetodoPago={setMetodoPago}
            setDatosFacturacion={setDatosFacturacion}
            setFactura={setFactura}
            esEditable={true}
        />
    );
}