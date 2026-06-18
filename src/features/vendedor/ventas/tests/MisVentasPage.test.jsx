import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, test, expect, vi, beforeEach } from "vitest"
import "@testing-library/jest-dom/vitest"

import MisVentasPage from "../pages/MisVentasPage"

import {
    obtenerMisVentas,
    cancelarVenta
} from "../services/ventaService"

import { toast } from "react-toastify"

const mockNavigate = vi.fn()

vi.mock("react-router-dom", () => ({
    useNavigate: () => mockNavigate
}))

vi.mock("../services/ventaService", () => ({
    obtenerMisVentas: vi.fn(),
    cancelarVenta: vi.fn()
}))

vi.mock("react-toastify", () => ({
    toast: {
        success: vi.fn(),
        error: vi.fn()
    }
}))

vi.mock("@/components/ui/Input", () => ({
    Input: (props) => <input {...props} />
}))

vi.mock("@/components/ui/button", () => ({
    Button: ({ children, ...props }) => (
        <button {...props}>
            {children}
        </button>
    )
}))

vi.mock("@/components/ui/card", () => ({
    Card: ({ children }) => (
        <div>{children}</div>
    )
}))

vi.mock("../columns/ventasColumns", () => ({
    ventasColumns: (onVerDetalle, onCancelar) => [
        {},
        {},
        {},
        {},
        {},
        {
            id: "acciones",
            onVerDetalle,
            onCancelar
        }
    ]
}))

vi.mock("@/components/ui/DataTable", () => ({
    default: ({ data, columns }) => (
        <div>
            {data.map((venta) => (
                <div
                    key={venta._id}
                    data-testid={`venta-${venta._id}`}
                >
                    <span>
                        {venta.datosFacturacion?.nombreCompleto}
                    </span>

                    <button
                        onClick={() =>
                            columns[5].onVerDetalle(
                                venta
                            )
                        }
                    >
                        Ver detalle
                    </button>

                    <button
                        onClick={() =>
                            columns[5].onCancelar(
                                venta
                            )
                        }
                    >
                        Cancelar venta
                    </button>
                </div>
            ))}
        </div>
    )
}))

describe("MisVentasPage", () => {

    beforeEach(() => {

        vi.clearAllMocks()

        obtenerMisVentas.mockResolvedValue({
            ventas: [
                {
                    _id: "1",
                    estado: "EN_PROCESO",
                    datosFacturacion: {
                        nombreCompleto: "Juan Pérez"
                    }
                }
            ],
            totalPaginas: 1
        })

    })

    test(
        "renderiza ventas obtenidas del servicio",
        async () => {

            render(
                <MisVentasPage />
            )

            await waitFor(() => {

                expect(
                    obtenerMisVentas
                ).toHaveBeenCalled()

            })

            expect(
                screen.getByText(
                    /juan pérez/i
                )
            ).toBeInTheDocument()

        }
    )

    test(
        "navega al detalle de una venta",
        async () => {

            const user =
                userEvent.setup()

            render(
                <MisVentasPage />
            )

            await screen.findByText(
                /juan pérez/i
            )

            await user.click(
                screen.getByRole(
                    "button",
                    {
                        name:
                            /ver detalle/i
                    }
                )
            )

            expect(
                mockNavigate
            ).toHaveBeenCalledWith(
                "/dashboard/mis-ventas/detalle/1"
            )

        }
    )

    test(
        "abre modal al cancelar venta",
        async () => {

            const user =
                userEvent.setup()

            render(
                <MisVentasPage />
            )

            await screen.findByText(
                /juan pérez/i
            )

            await user.click(
                screen.getByRole(
                    "button",
                    {
                        name:
                            /cancelar venta/i
                    }
                )
            )

            expect(
                screen.getByText(
                    /confirmar cancelación/i
                )
            ).toBeInTheDocument()

        }
    )

    test(
        "cierra modal al presionar cancelar",
        async () => {

            const user =
                userEvent.setup()

            render(
                <MisVentasPage />
            )

            await screen.findByText(
                /juan pérez/i
            )

            await user.click(
                screen.getByRole(
                    "button",
                    {
                        name:
                            /cancelar venta/i
                    }
                )
            )

            await user.click(
                screen.getByRole(
                    "button",
                    {
                        name: /^cancelar$/i
                    }
                )
            )

            expect(
                screen.queryByText(
                    /confirmar cancelación/i
                )
            ).not.toBeInTheDocument()

        }
    )

    test(
        "cancela venta correctamente",
        async () => {

            const user =
                userEvent.setup()

            cancelarVenta.mockResolvedValue({
                msg:
                    "Venta cancelada con éxito"
            })

            render(
                <MisVentasPage />
            )

            await screen.findByText(
                /juan pérez/i
            )

            await user.click(
                screen.getByRole(
                    "button",
                    {
                        name:
                            /cancelar venta/i
                    }
                )
            )

            await user.click(
                screen.getByRole(
                    "button",
                    {
                        name:
                            /aceptar/i
                    }
                )
            )

            await waitFor(() => {

                expect(
                    cancelarVenta
                ).toHaveBeenCalledWith(
                    "1"
                )

            })

            expect(
                toast.success
            ).toHaveBeenCalled()

        }
    )

    test(
        "muestra error al cancelar venta",
        async () => {

            const user =
                userEvent.setup()

            cancelarVenta.mockRejectedValue(
                new Error(
                    "Error cancelando"
                )
            )

            render(
                <MisVentasPage />
            )

            await screen.findByText(
                /juan pérez/i
            )

            await user.click(
                screen.getByRole(
                    "button",
                    {
                        name:
                            /cancelar venta/i
                    }
                )
            )

            await user.click(
                screen.getByRole(
                    "button",
                    {
                        name:
                            /aceptar/i
                    }
                )
            )

            await waitFor(() => {

                expect(
                    toast.error
                ).toHaveBeenCalled()

            })

        }
    )

    test(
        "muestra error al cargar ventas",
        async () => {

            obtenerMisVentas.mockRejectedValue(
                new Error(
                    "Error al cargar ventas"
                )
            )

            render(
                <MisVentasPage />
            )

            await waitFor(() => {

                expect(
                    toast.error
                ).toHaveBeenCalled()

            })

        }
    )

})