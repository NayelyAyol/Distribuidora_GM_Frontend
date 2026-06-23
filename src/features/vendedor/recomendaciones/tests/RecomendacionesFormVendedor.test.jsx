import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, test, expect, vi, beforeEach } from "vitest"
import "@testing-library/jest-dom"

import RecomendacionForm from "../components/RecomendacionForm"
import { toast } from "react-toastify"

const onSubmitMock = vi.fn()

vi.mock("@/context/useAuthStore", () => {
    const store = (callback) =>
        callback({
            user: {
                rol: "VENDEDOR",
                nombre: "Juan"
            }
        })

    return { default: store }
})

vi.mock("react-toastify", () => ({
    toast: {
        success: vi.fn(),
        error: vi.fn()
    }
}))

describe("RecomendacionForm vendedor", () => {

    beforeEach(() => {
        vi.clearAllMocks()
    })

    test("no muestra selector de tipo para vendedor", () => {

        render(
            <RecomendacionForm
                onSubmit={onSubmitMock}
            />
        )

        expect(
            screen.queryByRole("combobox")
        ).not.toBeInTheDocument()

    })

    test("envia recomendacion correctamente", async () => {

        onSubmitMock.mockResolvedValue({})

        render(
            <RecomendacionForm
                onSubmit={onSubmitMock}
            />
        )

        await userEvent.type(
            screen.getByPlaceholderText("Asunto"),
            "Mejora del sistema"
        )

        await userEvent.type(
            screen.getByPlaceholderText("Escribe tu mensaje..."),
            "Sería útil agregar más filtros"
        )

        await userEvent.click(
            screen.getByRole("button", {
                name: "Enviar"
            })
        )

        await waitFor(() => {

            expect(onSubmitMock)
                .toHaveBeenCalledWith({
                    tipo: "QUEJA",
                    asunto: "Mejora del sistema",
                    mensaje: "Sería útil agregar más filtros"
                })

        })

        expect(toast.success)
            .toHaveBeenCalled()

    })

    test("muestra error cuando el asunto esta vacio", async () => {

        render(
            <RecomendacionForm
                onSubmit={onSubmitMock}
            />
        )

        await userEvent.type(
            screen.getByPlaceholderText("Escribe tu mensaje..."),
            "Mensaje de prueba"
        )

        await userEvent.click(
            screen.getByRole("button", {
                name: "Enviar"
            })
        )

        expect(toast.error)
            .toHaveBeenCalledWith(
                "Ingresa un asunto"
            )

    })

})