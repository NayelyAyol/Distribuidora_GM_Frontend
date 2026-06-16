import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, test, expect, vi, beforeEach } from "vitest"
import "@testing-library/jest-dom"

import LoginForm from "../components/LoginForm"

const mockNavigate = vi.fn()

vi.mock("react-router-dom", () => ({
    useNavigate: () => mockNavigate
}))

describe("Login Frontend", () => {

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

    test("Muestra errores cuando los campos están vacíos", async () => {

        render(
            <LoginForm onSubmit={vi.fn()} />
        )

        await userEvent.click(
            screen.getByRole("button", {
                name: /aceptar/i
            })
        )

        expect(
            screen.getByText("El correo es obligatorio")
        ).toBeInTheDocument()

        expect(
            screen.getByText("La contraseña es obligatoria")
        ).toBeInTheDocument()

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
            "Admin@123!"
        )

        await userEvent.click(
            screen.getByRole("button", {
                name: /aceptar/i
            })
        )

        expect(
            await screen.findByText("Ingresa un correo válido")
        ).toBeInTheDocument()

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
            await screen.findByText(
                "Debe tener entre 8 y 16 caracteres, incluir mayúsculas, minúsculas, números y caracteres especiales"
            )
        ).toBeInTheDocument()

    })

    test("Permite mostrar y ocultar la contraseña", async () => {

        render(
            <LoginForm onSubmit={vi.fn()} />
        )

        const passwordInput =
            screen.getByPlaceholderText("********")

        expect(passwordInput)
            .toHaveAttribute("type", "password")

        const toggleButton =
            passwordInput.parentElement.querySelector("button")

        await userEvent.click(toggleButton)

        expect(passwordInput)
            .toHaveAttribute("type", "text")

    })

    test("Navega a recuperación de contraseña", async () => {

        render(
            <LoginForm onSubmit={vi.fn()} />
        )

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
            "Admin@123!"
        )

        await userEvent.click(
            screen.getByRole("button", {
                name: /aceptar/i
            })
        )

        expect(mockSubmit)
            .toHaveBeenCalledWith({
                email: "admin@test.com",
                password: "Admin@123!"
            })

    })

})