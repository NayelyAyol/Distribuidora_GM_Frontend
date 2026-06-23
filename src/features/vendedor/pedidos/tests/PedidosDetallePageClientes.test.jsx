import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, test, expect, vi, beforeEach } from "vitest"
import "@testing-library/jest-dom"

import PedidoDetallePage from "../pages/PedidoDetallePage"
import { toast } from "react-toastify"

const navigateMock = vi.fn()

vi.mock("react-router-dom", () => ({
    useNavigate: () => navigateMock,
    useParams: () => ({ id: "123" })
}))

vi.mock("socket.io-client", () => ({
    io: () => ({
        on: vi.fn(),
        off: vi.fn()
    })
}))

vi.mock("@/context/useAuthStore", () => {
    const store = (callback) => callback({
        user: {
            rol: "CLIENTE",
            nombre: "Maria"
        }
    })

    store.getState = () => ({
        user: {
            rol: "CLIENTE",
            nombre: "Maria"
        }
    })

    return { default: store }
})

vi.mock("../services/pedidosSeleccionadosService", () => ({
    obtenerDetallesPedido: vi.fn()
}))

import { obtenerDetallesPedido } from "../services/pedidosSeleccionadosService"

vi.mock("../../ventas/context/useVentaStore", () => {
    const store = () => ({
        setPedidoSeleccionado: vi.fn(),
        setFactura: vi.fn(),
        setMetodoPago: vi.fn(),
        setDatosFacturacion: vi.fn(),
        limpiarVenta: vi.fn(),
        setVentaId: vi.fn()
    })

    store.getState = () => ({
        venta: {}
    })

    return {
        default: store
    }
})

vi.mock("react-toastify", () => ({
    toast: {
        success: vi.fn(),
        error: vi.fn(),
        warning: vi.fn(),
        info: vi.fn()
    }
}))

vi.mock("@/components/ui/card", () => ({
    Card: ({ children }) => <div>{children}</div>
}))

vi.mock("@/components/ui/button", () => ({
    Button: ({ children, ...props }) => (
        <button {...props}>{children}</button>
    )
}))

describe("PedidoDetallePage cliente", () => {

    beforeEach(() => {
        vi.clearAllMocks()
    })

    test("carga y muestra correctamente el detalle del pedido", async () => {

        obtenerDetallesPedido.mockResolvedValue({
            pedido: {
                _id: "123",
                nombrePedido: "Pedido Cliente",
                estado: "EN_PROCESO",
                tipoPedido: "CARRITO",
                datosFacturacion: {
                    nombreCompleto: "Maria Lopez",
                    telefono: "0999999999"
                },
                articulos: []
            }
        })

        render(<PedidoDetallePage />)

        expect(
            await screen.findByText("Pedido - Pedido Cliente")
        ).toBeInTheDocument()
    })

    test("muestra informacion del cliente", async () => {

        obtenerDetallesPedido.mockResolvedValue({
            pedido: {
                _id: "123",
                nombrePedido: "Pedido Cliente",
                estado: "EN_PROCESO",
                tipoPedido: "CARRITO",
                datosFacturacion: {
                    nombreCompleto: "Maria Lopez",
                    telefono: "0999999999"
                },
                articulos: []
            }
        })

        render(<PedidoDetallePage />)

        expect(
            await screen.findByText("Maria Lopez")
        ).toBeInTheDocument()
    })

    test("muestra productos cotizados", async () => {

        obtenerDetallesPedido.mockResolvedValue({
            pedido: {
                _id: "123",
                nombrePedido: "Pedido Cliente",
                estado: "EN_PROCESO",
                tipoPedido: "CARRITO",
                articulos: [
                    {
                        id: "1",
                        nombreProducto: "Cuaderno",
                        cantidad: 2,
                        precioUnitario: 5
                    }
                ]
            }
        })

        render(<PedidoDetallePage />)

        expect(
            await screen.findByText("Cuaderno")
        ).toBeInTheDocument()
    })

    test("muestra error al cargar detalle del pedido", async () => {

        obtenerDetallesPedido.mockRejectedValue(
            new Error("Error servidor")
        )

        render(<PedidoDetallePage />)

        await waitFor(() => {

            expect(toast.error)
                .toHaveBeenCalledWith(
                    "No se pudo cargar el pedido"
                )

        })
    })

    test("regresa al listado de pedidos", async () => {

        obtenerDetallesPedido.mockResolvedValue({
            pedido: {
                nombrePedido: "Pedido prueba",
                estado: "EN_PROCESO",
                tipoPedido: "CARRITO"
            }
        })

        render(<PedidoDetallePage />)

        const boton =
            await screen.findByText("Volver")

        await userEvent.click(boton)

        expect(navigateMock)
            .toHaveBeenCalledWith(-1)
    })

    test("muestra boton continuar a pago para pedido foto", async () => {

        obtenerDetallesPedido.mockResolvedValue({
            pedido: {
                _id: "123",
                nombrePedido: "Pedido Foto",
                estado: "EN_PROCESO",
                tipoPedido: "FOTO_LISTA",
                metodoPago: null,
                articulos: []
            }
        })

        render(<PedidoDetallePage />)

        expect(
            await screen.findByText("Continuar a pago")
        ).toBeInTheDocument()
    })

})