import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, test, expect, vi, beforeEach } from "vitest"
import "@testing-library/jest-dom"

import NotificationPage from "../pages/NotificationPage"

vi.mock("../service/accionesService", () => ({
    listarAccionesAdmin: vi.fn(),
    finalizarAccionAdmin: vi.fn(),
    ejecutarPromocionSugerida: vi.fn(),
    ejecutarFechaFestiva: vi.fn()
}))

import {
    listarAccionesAdmin,
    finalizarAccionAdmin,
    ejecutarPromocionSugerida,
    ejecutarFechaFestiva
} from "../service/accionesService"

vi.mock("react-toastify", () => ({
    toast: {
        success: vi.fn(),
        error: vi.fn()
    }
}))

vi.mock("../components/NotificationItem", () => ({
    default: ({
        label,
        tipo,
        onFinalizar,
        onEjecutar,
        showButton
    }) => (
        <div>
            <span>{label}</span>

            <button
                onClick={() => onFinalizar(tipo)}
            >
                Finalizar
            </button>

            {showButton && (
                <button
                    onClick={() => onEjecutar(tipo)}
                >
                    Ejecutar
                </button>
            )}
        </div>
    )
}))

describe("NotificationPage", () => {

    beforeEach(() => {
        vi.clearAllMocks()
    })

    test("muestra el mensaje de carga al iniciar", () => {

        listarAccionesAdmin.mockReturnValue(
            new Promise(() => {})
        )

        render(<NotificationPage />)

        expect(
            screen.getByText(
                /cargando notificaciones/i
            )
        ).toBeInTheDocument()

    })

    test("carga y muestra las acciones inteligentes", async () => {

        listarAccionesAdmin.mockResolvedValue({
            acciones: [
                {
                    tipo: "PROMOCION_SUGERIDA",
                    estado: "PENDIENTE"
                },
                {
                    tipo: "FECHA_FESTIVA",
                    estado: "PENDIENTE"
                }
            ]
        })

        render(<NotificationPage />)

        expect(
            await screen.findByText(
                "Promociones sugeridas"
            )
        ).toBeInTheDocument()

        expect(
            await screen.findByText(
                "Promoción por fechas festivas"
            )
        ).toBeInTheDocument()

    })

    test("ejecuta promoción sugerida", async () => {

        listarAccionesAdmin.mockResolvedValue({
            acciones: [
                {
                    tipo: "PROMOCION_SUGERIDA",
                    estado: "PENDIENTE"
                }
            ]
        })

        ejecutarPromocionSugerida.mockResolvedValue({})

        render(<NotificationPage />)

        const botones =
            await screen.findAllByRole("button")

        await userEvent.click(
            botones[1]
        )

        expect(
            ejecutarPromocionSugerida
        ).toHaveBeenCalled()

    })

    test("ejecuta campaña de fecha festiva", async () => {

        listarAccionesAdmin.mockResolvedValue({
            acciones: [
                {
                    tipo: "FECHA_FESTIVA",
                    estado: "PENDIENTE"
                }
            ]
        })

        ejecutarFechaFestiva.mockResolvedValue({})

        render(<NotificationPage />)

        const botones =
            await screen.findAllByRole("button")

        await userEvent.click(
            botones[1]
        )

        expect(
            ejecutarFechaFestiva
        ).toHaveBeenCalled()

    })

    test("finaliza una acción inteligente", async () => {

        listarAccionesAdmin.mockResolvedValue({
            acciones: [
                {
                    tipo: "PROMOCION_SUGERIDA",
                    estado: "PENDIENTE"
                }
            ]
        })

        finalizarAccionAdmin.mockResolvedValue({})

        render(<NotificationPage />)

        const botonFinalizar =
            await screen.findByText(
                "Finalizar"
            )

        await userEvent.click(
            botonFinalizar
        )

        expect(
            finalizarAccionAdmin
        ).toHaveBeenCalledWith(
            "PROMOCION_SUGERIDA"
        )

    })

    test("maneja errores al cargar las diferentes acciones", async () => {

        listarAccionesAdmin.mockRejectedValue(
            new Error("Error del servidor")
        )

        render(<NotificationPage />)

        await waitFor(() => {
            expect(
                listarAccionesAdmin
            ).toHaveBeenCalled()
        })

    })

})