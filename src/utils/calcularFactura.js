const redondear = (valor = 0) => Number(Number(valor || 0).toFixed(2));

export const obtenerPorcentajeIva = (producto) => {
    if (typeof producto.porcentajeIva === "number") {
        return producto.porcentajeIva;
    }
    if (producto.tieneIva === true || producto.tipoIVA === "15%") {
        return 0.15;
    }
    return 0;
};

export const obtenerPrecioUnitario = (producto) => {
    const cantidad = Number(producto.cantidad || 0);
    const precioNormal = Number(producto.precioUnitario ?? producto.precio ?? 0);
    const precioMayorista = Number(producto.precioMayorista || 0);
    const cantidadMinima = Number(producto.cantidadMinimaMayorista || 0);

    if (precioMayorista > 0 && cantidadMinima > 0 && cantidad >= cantidadMinima) {
        return precioMayorista;
    }
    return precioNormal;
};

/**
 * @param {Array} factura - artículos de la factura
 * @param {String} tipoEntrega - "domicilio" | "ENVIO_DOMICILIO" | undefined
 * @param {Number} costoEnvioBackend - si ya existe un pedido, pasar resumenPago.costoEnvio
 *        para usar el valor real en vez de asumir 3.50
 */
export const calcularFactura = (factura = [], tipoEntrega, costoEnvioBackend = null) => {
    let subtotal = 0;
    let iva = 0;

    factura.forEach((p) => {
        const cantidad = Number(p.cantidad || 0);
        const precio = obtenerPrecioUnitario(p);
        const porcentajeIva = obtenerPorcentajeIva(p);
        const subtotalItem = precio * cantidad;

        subtotal += subtotalItem;
        iva += subtotalItem * porcentajeIva;
    });

    const esDomicilio = tipoEntrega === "ENVIO_DOMICILIO" || tipoEntrega === "domicilio";
    const envio = costoEnvioBackend != null
        ? Number(costoEnvioBackend)
        : (esDomicilio ? 3.50 : 0);

    subtotal = redondear(subtotal);
    iva = redondear(iva);
    const total = redondear(subtotal + iva + envio);

    return { subtotal, iva, envio, total };
};