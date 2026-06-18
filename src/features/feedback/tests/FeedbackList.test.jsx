import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, test, expect, vi, beforeEach } from "vitest"
import "@testing-library/jest-dom/vitest"

import FeedbackList from "../components/FeedbackList"

import {
    obtenerQuejasSugerenciasAdmin,
    responderQuejaSugerencia
} from "@/features/cliente/quejasysugerencias/services/quejasSugerenciasService"

vi.mock(
    "@/features/cliente/quejasysugerencias/services/quejasSugerenciasService",
    () => ({
        obtenerQuejasSugerenciasAdmin: vi.fn(),
        responderQuejaSugerencia: vi.fn()
    })
)

describe("Gestión de feedback", () => {

    beforeEach(() => {
        vi.clearAllMocks()
    })

    test("Carga quejas pendientes al iniciar", async () => {

        obtenerQuejasSugerenciasAdmin.mockResolvedValue({
            quejasSugerencias: [
                {
                    _id: "1",
                    asunto: "Problema con pedido",
                    mensaje: "No llegó completo",
                    estado: "PENDIENTE",
                    usuario: {
                        email: "cliente@test.com"
                    }
                }
            ]
        })

        render(<FeedbackList />)

        expect(
            await screen.findByText(
                "Problema con pedido"
            )
        ).toBeInTheDocument()

        expect(
            screen.getByText(
                "No llegó completo"
            )
        ).toBeInTheDocument()

        expect(
            obtenerQuejasSugerenciasAdmin
        ).toHaveBeenCalledWith(
            "PENDIENTE"
        )
    })

    test("Muestra botones Pendientes y Finalizadas", async () => {

        obtenerQuejasSugerenciasAdmin.mockResolvedValue({
            quejasSugerencias: []
        })

        render(<FeedbackList />)

        expect(
            await screen.findByRole("button", {
                name: /^Pendientes$/i
            })
        ).toBeInTheDocument()

        expect(
            screen.getByRole("button", {
                name: /^Finalizadas$/i
            })
        ).toBeInTheDocument()
    })

    test("Permite cambiar a feedback finalizado", async () => {

        obtenerQuejasSugerenciasAdmin.mockResolvedValue({
            quejasSugerencias: []
        })

        render(<FeedbackList />)

        const botonFinalizadas =
            await screen.findByRole("button", {
                name: /^Finalizadas$/i
            })

        await userEvent.click(
            botonFinalizadas
        )

        await waitFor(() => {

            expect(
                obtenerQuejasSugerenciasAdmin
            ).toHaveBeenLastCalledWith(
                "FINALIZADA"
            )

        })
    })

    test("Muestra mensaje cuando no existen registros", async () => {

        obtenerQuejasSugerenciasAdmin.mockResolvedValue({
            quejasSugerencias: []
        })

        render(<FeedbackList />)

        expect(
            await screen.findByText(
                /No hay quejas o sugerencias pendientes/i
            )
        ).toBeInTheDocument()
    })

    test("Permite responder una queja", async () => {

        obtenerQuejasSugerenciasAdmin.mockResolvedValue({
            quejasSugerencias: [
                {
                    _id: "1",
                    asunto: "Problema con pedido",
                    mensaje: "No llegó completo",
                    estado: "PENDIENTE",
                    usuario: {
                        email: "cliente@test.com"
                    }
                }
            ]
        })

        responderQuejaSugerencia.mockResolvedValue({})

        render(<FeedbackList />)

        const botonResponder =
            await screen.findByRole("button", {
                name: /Responder/i
            })

        await userEvent.click(
            botonResponder
        )

        const textarea =
            await screen.findByPlaceholderText(
                "Escribe tu respuesta..."
            )

        await userEvent.type(
            textarea,
            "Su solicitud ha sido atendida"
        )

        const botonesAceptar =
            screen.getAllByRole("button", {
                name: /^Aceptar$/i
            })

        await userEvent.click(
            botonesAceptar[0]
        )

        await waitFor(() => {

            expect(
                responderQuejaSugerencia
            ).toHaveBeenCalledWith(
                "1",
                "Su solicitud ha sido atendida"
            )

        })
    })

})