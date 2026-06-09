import { create } from "zustand";
import { persist } from "zustand/middleware";
import { toast } from "react-toastify";

const useVentaStore = create(
    persist(
        (set, get) => ({

            factura: [],
            pedidoSeleccionado: null,
            metodoPago: null,
            datosFacturacion: {},

            setPedidoSeleccionado: (pedido) =>
                set({
                    pedidoSeleccionado: pedido,
                    metodoPago: pedido?.metodoPago || null,
                    datosFacturacion: pedido?.datosFacturacion || {}
                }),

            agregarProducto: (producto) => {

                if (producto.stock <= 0) {

                    toast.warning(
                        "Producto sin stock",
                        {
                            toastId: `sin-stock-${producto.id}`
                        }
                    );

                    return;
                }

                const factura = get().factura;

                const existe = factura.find(
                    p => p.id === producto.id
                );

                if (existe) {

                    if (existe.cantidad >= existe.stock) {

                        toast.warning(
                            `Stock disponible: ${existe.stock}`,
                            {
                                toastId: `stock-${existe.id}`
                            }
                        );

                        return;
                    }

                    set({
                        factura: factura.map(p =>
                            p.id === producto.id
                                ? {
                                    ...p,
                                    cantidad: p.cantidad + 1
                                }
                                : p
                        )
                    });

                    return;
                }

                set({
                    factura: [
                        ...factura,
                        {
                            ...producto,
                            cantidad: 1
                        }
                    ]
                });
            },

            cambiarCantidad: (id, cantidad) =>
                set(state => ({
                    factura: state.factura.map(producto => {

                        if (producto.id !== id)
                            return producto;

                        return {
                            ...producto,
                            cantidad: Math.max(
                                1,
                                Math.min(
                                    cantidad,
                                    producto.stock
                                )
                            )
                        };

                    })
                })),

            eliminarProducto: (id) =>
                set((state) => ({
                    factura: state.factura.filter(
                        (p) => p.id !== id
                    ),
                })),

            limpiarVenta: () =>
                set({
                    factura: [],
                    pedidoSeleccionado: null,
                    metodoPago: null,
                    datosFacturacion: {},
                }),
            
            setFactura: (productos) =>
                set({
                    factura: productos
                }),

            setMetodoPago: (m) =>
                set({ metodoPago: m }),

            setDatosFacturacion: (d) =>
                set({ datosFacturacion: d }),

        }),
        {
            name: "venta-storage",
        }
    )
);

export default useVentaStore;