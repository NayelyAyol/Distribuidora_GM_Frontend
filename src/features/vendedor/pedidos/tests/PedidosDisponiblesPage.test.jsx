import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, test, expect, vi, beforeEach } from "vitest"
import "@testing-library/jest-dom/vitest"

import PedidosDisponiblesPage from "../pages/PedidosDisponiblesPage"

import {
    obtenerPedidosSeleccionados,
    tomarPedido
} from "../services/pedidosSeleccionadosService"

import { toast } from "react-toastify"

vi.mock("../services/pedidosSeleccionadosService", () => ({
    obtenerPedidosSeleccionados: vi.fn(),
    tomarPedido: vi.fn()
}))

vi.mock("react-toastify", () => ({
    toast: {
        success: vi.fn(),
        error: vi.fn()
    }
}))

vi.mock("@/components/ui/DataTable", () => ({
    default: ({ data, columns }) => (
        <div>
            {data.map((pedido) => (
                <div
                    key={pedido._id}
                    data-testid={`pedido-${pedido._id}`}
                >
                    <span>
                        {pedido.datosFacturacion?.nombreCompleto}
                    </span>

                    <button
                        onClick={() =>
                            columns[5].cell({
                                row: { original: pedido }
                            }).props.children.props.onToggle()
                        }
                    >
                        Tomar
                    </button>
                </div>
            ))}
        </div>
    )
}))

vi.mock("@/features/shared/components/StatusBadge", () => ({
    default: ({ onToggle, label }) => (
        <button onClick={onToggle}>
            {label}
        </button>
    )
}))

describe("PedidosDisponiblesPage", () => {

    const pedidoMock = {
        _id: "1",
        estado: "PENDIENTE",
        nombrePedido: "Pedido Prueba",
        tipoPedido: "NORMAL",
        tipoEntrega: "DOMICILIO",
        datosFacturacion: {
            nombreCompleto: "Juan Pérez"
        }
    }

    beforeEach(() => {
        vi.clearAllMocks()
    })

    test("renderiza pedidos obtenidos del servicio", async () => {

        obtenerPedidosSeleccionados.mockResolvedValue({
            pedidos: [pedidoMock],
            totalPaginas: 1
        })

        render(<PedidosDisponiblesPage />)

        expect(
            await screen.findByText(
                "Juan Pérez"
            )
        ).toBeInTheDocument()

        expect(
            obtenerPedidosSeleccionados
        ).toHaveBeenCalled()
    })
    test("abre modal al intentar tomar un pedido", async () => {

        obtenerPedidosSeleccionados.mockResolvedValue({
            pedidos: [pedidoMock],
            totalPaginas: 1
        })

        render(<PedidosDisponiblesPage />)

        const botonTomar =
            await screen.findByRole(
                "button",
                { name: /tomar/i }
            )

        await userEvent.click(
            botonTomar
        )

        expect(
            screen.getByText(/confirmar/i)
        ).toBeInTheDocument()

        expect(
            screen.getByRole(
                "button",
                { name: /aceptar/i }
            )
        ).toBeInTheDocument()

        expect(
            screen.getByRole(
                "button",
                { name: /cancelar/i }
            )
        ).toBeInTheDocument()
    })

    test("cierra modal al cancelar", async () => {

        obtenerPedidosSeleccionados.mockResolvedValue({
            pedidos: [pedidoMock],
            totalPaginas: 1
        })

        render(<PedidosDisponiblesPage />)

        const botonTomar =
            await screen.findByRole(
                "button",
                { name: /tomar/i }
            )

        await userEvent.click(
            botonTomar
        )

        await userEvent.click(
            screen.getByRole(
                "button",
                { name: /cancelar/i }
            )
        )

        expect(
            screen.queryByText(/confirmar/i)
        ).not.toBeInTheDocument()
    })

    test("toma pedido correctamente", async () => {

        obtenerPedidosSeleccionados.mockResolvedValue({
            pedidos: [pedidoMock],
            totalPaginas: 1
        })

        tomarPedido.mockResolvedValue({})

        render(<PedidosDisponiblesPage />)

        const botonTomar =
            await screen.findByRole(
                "button",
                { name: /tomar/i }
            )

        await userEvent.click(
            botonTomar
        )

        await userEvent.click(
            screen.getByRole(
                "button",
                { name: /aceptar/i }
            )
        )

        await waitFor(() => {

            expect(
                tomarPedido
            ).toHaveBeenCalledWith("1")

            expect(
                toast.success
            ).toHaveBeenCalledWith(
                "Pedido tomado correctamente"
            )
        })
    })

    test("muestra error al fallar tomar pedido", async () => {

        obtenerPedidosSeleccionados.mockResolvedValue({
            pedidos: [pedidoMock],
            totalPaginas: 1
        })

        tomarPedido.mockRejectedValue(
            new Error("Error backend")
        )

        render(<PedidosDisponiblesPage />)

        const botonTomar =
            await screen.findByRole(
                "button",
                { name: /tomar/i }
            )

        await userEvent.click(
            botonTomar
        )

        await userEvent.click(
            screen.getByRole(
                "button",
                { name: /aceptar/i }
            )
        )

        await waitFor(() => {

            expect(
                toast.error
            ).toHaveBeenCalledWith(
                "Error backend"
            )
        })
    })

    test("muestra error al cargar pedidos", async () => {

        obtenerPedidosSeleccionados.mockRejectedValue(
            new Error("Error al cargar pedidos")
        )

        render(<PedidosDisponiblesPage />)

        await waitFor(() => {

            expect(
                toast.error
            ).toHaveBeenCalledWith(
                "Error al cargar pedidos"
            )
        })
    })

})