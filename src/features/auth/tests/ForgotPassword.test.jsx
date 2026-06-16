import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, test, expect, vi, beforeEach } from "vitest"
import "@testing-library/jest-dom"

import ForgotPasswordForm from "../components/ForgotPasswordForm"

const mockNavigate = vi.fn()

vi.mock("react-router-dom", () => ({
    useNavigate: () => mockNavigate
}))

vi.mock("react-toastify", () => ({
    toast: {
        dismiss: vi.fn(),
        error: vi.fn()
    }
}))

describe("ForgotPasswordForm", () => {

    beforeEach(() => {
        vi.clearAllMocks()
    })

    test("Renderiza correctamente", () => {

        render(
            <ForgotPasswordForm onSubmit={vi.fn()} />
        )

        expect(
            screen.getByText(/olvidaste tu contraseña/i)
        ).toBeInTheDocument()

        expect(
            screen.getByPlaceholderText("ejemplo@email.com")
        ).toBeInTheDocument()

        expect(
            screen.getByRole("button", {
                name: /enviar/i
            })
        ).toBeInTheDocument()
    })

    test("Muestra error cuando el correo está vacío", async () => {

        render(
            <ForgotPasswordForm onSubmit={vi.fn()} />
        )

        await userEvent.click(
            screen.getByRole("button", {
                name: /enviar/i
            })
        )

        expect(
            await screen.findByText("El correo es obligatorio")
        ).toBeInTheDocument()
    })

    test("Muestra error cuando el correo es inválido", async () => {

        render(
            <ForgotPasswordForm onSubmit={vi.fn()} />
        )

        await userEvent.type(
            screen.getByPlaceholderText("ejemplo@email.com"),
            "correoinvalido"
        )

        await userEvent.click(
            screen.getByRole("button", {
                name: /enviar/i
            })
        )

        expect(
            await screen.findByText("Ingresa un correo válido")
        ).toBeInTheDocument()
    })

    test("Navega al login al presionar volver", async () => {

        render(
            <ForgotPasswordForm onSubmit={vi.fn()} />
        )

        const buttons = screen.getAllByRole("button")

        await userEvent.click(buttons[0])

        expect(mockNavigate)
            .toHaveBeenCalledWith("/login")
    })

    test("Envía el formulario con un correo válido", async () => {

        const mockSubmit = vi.fn()

        render(
            <ForgotPasswordForm onSubmit={mockSubmit} />
        )

        await userEvent.type(
            screen.getByPlaceholderText("ejemplo@email.com"),
            "usuario@test.com"
        )

        await userEvent.click(
            screen.getByRole("button", {
                name: /enviar/i
            })
        )

        expect(mockSubmit)
            .toHaveBeenCalledWith({
                email: "usuario@test.com"
            })
    })

})