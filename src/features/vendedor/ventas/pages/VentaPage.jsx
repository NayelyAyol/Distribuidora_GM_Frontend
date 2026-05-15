import { useState } from "react"
import VentaLayout from "../components/VentaLayout"

export default function VentaPage() {

    const [factura, setFactura] = useState([])

    const agregarProducto = (producto) => {
        setFactura(prev => {
            const existe = prev.find(p => p.id === producto.id)

            if (existe) {
                return prev.map(p =>
                    p.id === producto.id
                        ? { ...p, cantidad: p.cantidad + 1 }
                        : p
                )
            }

            return [...prev, { ...producto, cantidad: 1 }]
        })
    }

    const cambiarCantidad = (id, nuevaCantidad) => {

        if (nuevaCantidad < 1) return

        setFactura(prev =>
            prev.map(p =>
                p.id === id
                    ? { ...p, cantidad: nuevaCantidad }
                    : p
            )
        )
    }

    const eliminarProducto = (id) => {
        setFactura(prev => prev.filter(p => p.id !== id))
    }

    const limpiarFactura = () => setFactura([])

    return (
        <VentaLayout
            factura={factura}
            agregarProducto={agregarProducto}
            cambiarCantidad={cambiarCantidad}
            eliminarProducto={eliminarProducto}
            limpiarFactura={limpiarFactura}
        />
    )
}