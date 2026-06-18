export const calcularFactura = (factura, tipoEntrega) => {
    const subtotal = factura.reduce((acc, p) => {
        const precio = Number(p.precioUnitario ?? p.precio ?? 0);
        const cantidad = Number(p.cantidad || 0);
        return acc + (precio * cantidad);
    }, 0);

    const iva = factura.reduce((acc, p) => {
        const precio = Number(p.precioUnitario ?? p.precio ?? 0);
        const cantidad = Number(p.cantidad || 0);
        const subtotalItem = precio * cantidad;
        const aplicaIva = p.tieneIva === true || p.tipoIVA === "15%";
        return acc + (aplicaIva ? subtotalItem * 0.15 : 0);
    }, 0);

    const envio = tipoEntrega === "ENVIO_DOMICILIO" ? 3.50 : 0;
    const total = subtotal + iva + envio;

    return { subtotal, iva, envio, total };
}