import { render, screen, fireEvent } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, test, expect, vi, beforeEach } from "vitest"
import "@testing-library/jest-dom"

import LoginForm from "../components/LoginForm"

const mockNavigate = vi.fn()

vi.mock("react-router-dom", () => ({
    useNavigate: () => mockNavigate
}))

vi.mock("react-toastify", () => ({
    toast: {
        error: vi.fn()
    }
}))

import { toast } from "react-toastify"

describe("LoginForm", () => {

    beforeEach(() => {
        vi.clearAllMocks()
    })

    test("Renderiza inputs y botón", () => {

        render(
            <LoginForm onSubmit={vi.fn()} />
        )

        expect(
            screen.getByPlaceholderText("m@gmail.com")
        ).toBeInTheDocument()

        expect(
            screen.getByPlaceholderText("********")
        ).toBeInTheDocument()

        expect(
            screen.getByRole("button", {
                name: /aceptar/i
            })
        ).toBeInTheDocument()

    })

    test("Muestra error cuando los campos están vacíos", async () => {

        render(
            <LoginForm onSubmit={vi.fn()} />
        )

        await userEvent.click(
            screen.getByRole("button", {
                name: /aceptar/i
            })
        )

        expect(
            toast.error
        ).toHaveBeenCalledWith(
            "Todos los campos son obligatorios"
        )

    })

    test("Valida formato de correo", async () => {

        render(
            <LoginForm onSubmit={vi.fn()} />
        )

        await userEvent.type(
            screen.getByPlaceholderText("m@gmail.com"),
            "correoinvalido"
        )

        await userEvent.type(
            screen.getByPlaceholderText("********"),
            "Admin@123"
        )

        const form = screen
            .getByRole("button", { name: /aceptar/i })
            .closest("form")

        fireEvent.submit(form)

        expect(
            toast.error
        ).toHaveBeenCalledWith(
            "Ingresa un correo válido"
        )
    })

    test("Valida contraseña insegura", async () => {

        render(
            <LoginForm onSubmit={vi.fn()} />
        )

        await userEvent.type(
            screen.getByPlaceholderText("m@gmail.com"),
            "admin@test.com"
        )

        await userEvent.type(
            screen.getByPlaceholderText("********"),
            "123"
        )

        await userEvent.click(
            screen.getByRole("button", {
                name: /aceptar/i
            })
        )

        expect(
            toast.error
        ).toHaveBeenCalledWith(
            "La contraseña debe tener entre 8 y 16 caracteres, incluir mayúsculas, minúsculas, números y caracteres especiales"
        )

    })

    test("Permite mostrar y ocultar la contraseña", async () => {
        render(<LoginForm onSubmit={vi.fn()} />)

        const passwordInput =
            screen.getByPlaceholderText("********")

        expect(passwordInput).toHaveAttribute(
            "type",
            "password"
        )

        const toggleButton =
            passwordInput.parentElement.querySelector("button")

        await userEvent.click(toggleButton)

        expect(passwordInput).toHaveAttribute(
            "type",
            "text"
        )
    })

    test("Navega a recuperación de contraseña", async () => {
        render(<LoginForm onSubmit={vi.fn()} />)

        await userEvent.click(
            screen.getByText(
                /olvidaste tu contraseña/i
            )
        )

        expect(mockNavigate)
            .toHaveBeenCalledWith(
                "/resetear-password"
            )
    })

    test("Envía datos válidos al login", async () => {

        const mockSubmit = vi.fn()

        render(
            <LoginForm onSubmit={mockSubmit} />
        )

        await userEvent.type(
            screen.getByPlaceholderText("m@gmail.com"),
            "admin@test.com"
        )

        await userEvent.type(
            screen.getByPlaceholderText("********"),
            "Admin@123"
        )

        await userEvent.click(
            screen.getByRole("button", {
                name: /aceptar/i
            })
        )

        expect(
            mockSubmit
        ).toHaveBeenCalledWith({
            email: "admin@test.com",
            password: "Admin@123"
        })

    })

})