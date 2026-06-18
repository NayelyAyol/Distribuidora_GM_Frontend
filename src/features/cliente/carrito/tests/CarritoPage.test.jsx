import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, test, expect, vi, beforeEach } from "vitest"
import "@testing-library/jest-dom/vitest"

import CarritoPage from "../pages/CarritoPage"

import {
    obtenerCarrito,
    vaciarCarrito
} from "../services/carritoService"

import { toast } from "react-toastify"

vi.mock("../services/carritoService", () => ({
    obtenerCarrito: vi.fn(),
    actualizarCantidadCarrito: vi.fn(),
    eliminarDelCarrito: vi.fn(),
    vaciarCarrito: vi.fn()
}))

vi.mock("react-toastify", () => ({
    toast: {
        success: vi.fn(),
        error: vi.fn()
    }
}))

vi.mock("../components/CarritoList", () => ({
    default: ({ carrito, onVaciar }) => (
        <div>
            <p>Productos: {carrito.length}</p>

            <button onClick={onVaciar}>
                Abrir Modal
            </button>
        </div>
    )
}))

vi.mock("../components/CarritoResumen", () => ({
    default: () => (
        <div>
            Resumen Compra
        </div>
    )
}))

describe("CarritoPage", () => {

    beforeEach(() => {
        vi.clearAllMocks()
    })

    const carritoMock = {
        carrito: {
            articulos: [
                {
                    producto: "1",
                    nombreProducto: "Laptop",
                    cantidad: 2,
                    precioUnitario: 100
                }
            ]
        }
    }

    test("muestra cargando inicialmente", () => {

        obtenerCarrito.mockImplementation(
            () => new Promise(() => {})
        )

        render(<CarritoPage />)

        expect(
            screen.getByText(/cargando carrito/i)
        ).toBeInTheDocument()
    })

    test("carga productos correctamente", async () => {

        obtenerCarrito.mockResolvedValue(
            carritoMock
        )

        render(<CarritoPage />)

        await waitFor(() => {

            expect(
                screen.getByText(
                    /productos: 1/i
                )
            ).toBeInTheDocument()
        })
    })

    test("muestra error cuando falla obtener carrito", async () => {

        obtenerCarrito.mockRejectedValue(
            new Error("Error carrito")
        )

        render(<CarritoPage />)

        await waitFor(() => {

            expect(toast.error)
                .toHaveBeenCalledWith(
                    "Error carrito"
                )
        })
    })

    test("abre modal para vaciar carrito", async () => {

        const user = userEvent.setup()

        obtenerCarrito.mockResolvedValue(
            carritoMock
        )

        render(<CarritoPage />)

        await waitFor(() => {

            expect(
                screen.getByText(
                    /productos: 1/i
                )
            ).toBeInTheDocument()
        })

        await user.click(
            screen.getByRole("button", {
                name: /abrir modal/i
            })
        )

        expect(
            screen.getByText(
                /vaciar carrito/i
            )
        ).toBeInTheDocument()
    })

    test("vacía carrito correctamente", async () => {

        const user = userEvent.setup()

        obtenerCarrito.mockResolvedValue(
            carritoMock
        )

        vaciarCarrito.mockResolvedValue({})

        render(<CarritoPage />)

        await waitFor(() => {

            expect(
                screen.getByText(
                    /productos: 1/i
                )
            ).toBeInTheDocument()
        })

        await user.click(
            screen.getByRole("button", {
                name: /abrir modal/i
            })
        )

        await user.click(
            screen.getByRole("button", {
                name: /^aceptar$/i
            })
        )

        await waitFor(() => {

            expect(vaciarCarrito)
                .toHaveBeenCalledTimes(1)

            expect(toast.success)
                .toHaveBeenCalledWith(
                    "Carrito vaciado correctamente"
                )
        })
    })

    test("muestra error cuando falla vaciar carrito", async () => {

        const user = userEvent.setup()

        obtenerCarrito.mockResolvedValue(
            carritoMock
        )

        vaciarCarrito.mockRejectedValue(
            new Error("Error al vaciar")
        )

        render(<CarritoPage />)

        await waitFor(() => {

            expect(
                screen.getByText(
                    /productos: 1/i
                )
            ).toBeInTheDocument()
        })

        await user.click(
            screen.getByRole("button", {
                name: /abrir modal/i
            })
        )

        await user.click(
            screen.getByRole("button", {
                name: /^aceptar$/i
            })
        )

        await waitFor(() => {

            expect(toast.error)
                .toHaveBeenCalledWith(
                    "Error al vaciar"
                )
        })
    })

})