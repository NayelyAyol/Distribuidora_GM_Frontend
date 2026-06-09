export const calcularFactura = (factura, tipoEntrega) => {

    const subtotal = factura.reduce(
        (acc, p) => acc + p.precio * p.cantidad,
        0
    )

    const iva = subtotal * 0.15

    const envio =
        tipoEntrega === "ENVIO_DOMICILIO"
            ? 3.50
            : 0

    const total = subtotal + iva + envio

    return {
        subtotal,
        iva,
        envio,
        total
    }
}