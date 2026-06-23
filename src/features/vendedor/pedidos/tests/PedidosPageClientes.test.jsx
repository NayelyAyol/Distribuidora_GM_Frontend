import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, test, expect, vi, beforeEach } from "vitest"
import "@testing-library/jest-dom"

import PedidosPage from "../pages/PedidosPage"

const navigateMock = vi.fn()

vi.mock("react-router-dom", () => ({
    useNavigate: () => navigateMock
}))

vi.mock("@/context/useAuthStore", () => {

    const store = (callback) =>
        callback({
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

    return {
        default: store
    }
})

vi.mock("../../../cliente/pedidos/services/pedidoService", () => ({
    obtenerMisPedidos: vi.fn(),
    cambiarEstadoPedido: vi.fn()
}))

import {
    obtenerMisPedidos,
} from "../../../cliente/pedidos/services/pedidoService"

vi.mock("react-toastify", () => ({
    toast: {
        success: vi.fn(),
        error: vi.fn()
    }
}))

vi.mock("@/components/ui/DataTable", () => ({
    default: ({ data }) => (
        <div>
            {data?.map((pedido) => (
                <p key={pedido._id}>
                    {pedido.nombrePedido}
                </p>
            ))}
        </div>
    )
}))

vi.mock("../columns/pedidosSeleccionadosColumns", () => ({
    pedidosSeleccionadosColumns: vi.fn(() => [])
}))

vi.mock("@/features/cliente/pedidos/columns/pedidosClientesColumns", () => ({
    pedidosClienteColumns: vi.fn(() => [])
}))

vi.mock("../../../shared/chat/components/ChatModal", () => ({
    default: () => <div />
}))

describe("Pedidos cliente", () => {

    beforeEach(() => {
        vi.clearAllMocks()
    })

    test("carga y muestra adecuadamente los pedidos del cliente", async () => {
        obtenerMisPedidos.mockResolvedValue({
            pedidos: [
                {
                    _id: "1",
                    nombrePedido: "Pedido Impresora",
                    estado: "PENDIENTE"
                }
            ],
            totalPaginas: 1
        })

        render(<PedidosPage />)

        expect(
            await screen.findByText("Pedido Impresora")
        ).toBeInTheDocument()
    })

    test("muestra boton nuevo pedido para cliente", async () => {
        obtenerMisPedidos.mockResolvedValue({
            pedidos: [],
            totalPaginas: 1
        })

        render(<PedidosPage />)

        expect(
            screen.getByText("Nuevo pedido")
        ).toBeInTheDocument()
    })

    test("muestra placeholder de busqueda para cliente", async () => {
        obtenerMisPedidos.mockResolvedValue({
            pedidos: [],
            totalPaginas: 1
        })

        render(<PedidosPage />)

        expect(
            screen.getByPlaceholderText(
                "Buscar por nombre del pedido..."
            )
        ).toBeInTheDocument()
    })

    test("permite buscar pedidos por nombre", async () => {
        obtenerMisPedidos.mockResolvedValue({
            pedidos: [],
            totalPaginas: 1
        })

        render(<PedidosPage />)

        const input = screen.getByPlaceholderText(
            "Buscar por nombre del pedido..."
        )

        await userEvent.type(input, "Laptop")

        await waitFor(() => {
            expect(obtenerMisPedidos)
                .toHaveBeenCalled()
        })
    })

    test("muestra filtro pendientes para cliente", async () => {
        obtenerMisPedidos.mockResolvedValue({
            pedidos: [],
            totalPaginas: 1
        })

        render(<PedidosPage />)

        expect(
            screen.getByText("Pendientes")
        ).toBeInTheDocument()
    })

    test("redirige al formulario de nuevo pedido", async () => {
        obtenerMisPedidos.mockResolvedValue({
            pedidos: [],
            totalPaginas: 1
        })

        render(<PedidosPage />)

        await userEvent.click(
            screen.getByText("Nuevo pedido")
        )

        expect(navigateMock).toHaveBeenCalledWith(
            "/dashboard/mis-pedidos/nuevo-pedido"
        )
    })
})