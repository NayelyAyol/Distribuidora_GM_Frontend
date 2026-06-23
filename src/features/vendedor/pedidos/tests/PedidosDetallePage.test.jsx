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
            rol: "VENDEDOR",
            nombre: "Juan"
        }
    })

    store.getState = () => ({
        user: {
            rol: "VENDEDOR",
            nombre: "Juan"
        }
    })

    return { default: store }
})

vi.mock("../services/pedidosSeleccionadosService", () => ({
    obtenerDetallesPedido: vi.fn()
}))

import { obtenerDetallesPedido } from "../services/pedidosSeleccionadosService"

vi.mock("../../ventas/services/ventaService", () => ({
    ventaDesdePedido: vi.fn()
}))

import { ventaDesdePedido } from "../../ventas/services/ventaService"

vi.mock("@/features/cliente/pedidos/services/pedidoService", () => ({
    armarPedidoFoto: vi.fn()
}))

import { armarPedidoFoto } from "@/features/cliente/pedidos/services/pedidoService"

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


vi.mock("../../ventas/components/IngresoProducto", () => ({
    default: ({onAdd}) => (
        <button
            onClick={() =>
                onAdd({
                    id:"1",
                    nombre:"Cuaderno",
                    precio:5
                })
            }
        >
            Agregar Producto
        </button>
    )
}))

vi.mock("../../ventas/components/Factura", () => ({
    default: () => <div>Factura Panel</div>
}))

vi.mock("@/components/ui/card", () => ({
    Card: ({ children }) => <div>{children}</div>
}))

vi.mock("@/components/ui/button", () => ({
    Button: ({ children, ...props }) => (
        <button {...props}>{children}</button>
    )
}))


describe("PedidoDetallePage vendedor", () => {

    beforeEach(() => {
        vi.clearAllMocks()
    })


    test("carga y muestra correctamente el detalle del pedido", async () => {

        obtenerDetallesPedido.mockResolvedValue({
            pedido: {
                _id: "123",
                nombrePedido: "Pedido Laptop",
                estado: "EN_PROCESO",
                tipoPedido: "CARRITO",
                metodoPago: "EFECTIVO",
                datosFacturacion: {
                    nombreCompleto: "Carlos Perez",
                    telefono: "0999999999"
                },
                articulos: []
            }
        })

        render(<PedidoDetallePage />)

        expect(
            await screen.findByText("Pedido - Pedido Laptop")
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

        const boton = await screen.findByText("Volver")

        await userEvent.click(boton)

        expect(navigateMock)
            .toHaveBeenCalledWith(-1)

    })


    test("inicia venta correctamente", async () => {

        obtenerDetallesPedido.mockResolvedValue({
            pedido: {
                _id: "123",
                nombrePedido: "Pedido venta",
                estado: "EN_PROCESO",
                tipoPedido: "CARRITO",
                metodoPago: "EFECTIVO",
                articulos: [
                    {
                        producto: "1",
                        nombreProducto: "Producto",
                        cantidad: 1,
                        precioUnitario: 10
                    }
                ]
            }
        })


        ventaDesdePedido.mockResolvedValue({
            venta: {
                id: "venta1",
                metodoPago: "EFECTIVO",
                articulos: [
                    {
                        producto: "1",
                        nombreProducto: "Producto",
                        cantidad: 1,
                        precioUnitario: 10
                    }
                ]
            }
        })


        render(<PedidoDetallePage />)


        const boton =
            await screen.findByText("Iniciar Venta")


        await userEvent.click(boton)


        await waitFor(() => {

            expect(ventaDesdePedido)
                .toHaveBeenCalled()

        })

    })


test("arma pedido tipo FOTO_LISTA correctamente", async () => {

    obtenerDetallesPedido.mockResolvedValue({
        pedido:{
            _id:"123",
            nombrePedido:"Pedido foto",
            estado:"EN_PROCESO",
            tipoPedido:"FOTO_LISTA",
            metodoPago:null,
            articulos:[]
        }
    })

    armarPedidoFoto.mockResolvedValue({
        msg:"Pedido armado"
    })

    render(<PedidoDetallePage />)

    const agregar =
        await screen.findByText("Agregar Producto")

    await userEvent.click(agregar)

    const boton =
        await screen.findByText("Armar Pedido")

    await userEvent.click(boton)

    await waitFor(()=>{

        expect(armarPedidoFoto)
        .toHaveBeenCalledWith(
            "123",
            [
                {
                    producto:"1",
                    cantidad:1
                }
            ]
        )

    })

})

})