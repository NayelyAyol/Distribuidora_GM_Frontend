import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, test, expect, vi, beforeEach } from "vitest"
import "@testing-library/jest-dom"

import UsuarioForm from "../components/UsuarioForm"
import { registrarVendedor } from "../services/vendedorService"

vi.mock("../services/vendedorService", () => ({
    registrarVendedor: vi.fn(() => Promise.resolve())
}))

vi.mock("react-toastify", () => ({
    toast: {
        success: vi.fn(),
        error: vi.fn()
    }
}))

describe("UsuarioForm", () => {

    beforeEach(() => {
        vi.clearAllMocks()
    })

    test("debe renderizar todos los campos del formulario", () => {

        render(<UsuarioForm />)

        expect(
            screen.getByPlaceholderText("Ej: Juan")
        ).toBeInTheDocument()

        expect(
            screen.getByPlaceholderText("Ej: Pérez")
        ).toBeInTheDocument()

        expect(
            screen.getAllByPlaceholderText("10 dígitos")[0]
        ).toBeInTheDocument()

        expect(
            screen.getByPlaceholderText("correo@ejemplo.com")
        ).toBeInTheDocument()

        expect(
            screen.getByRole("button", {
                name: /aceptar/i
            })
        ).toBeInTheDocument()

    })

    test("muestra errores cuando todos los campos están vacíos", async () => {

        render(<UsuarioForm />)

        await userEvent.click(
            screen.getByRole("button", {
                name: /aceptar/i
            })
        )

        expect(
            screen.getByText("El nombre es obligatorio")
        ).toBeInTheDocument()

        expect(
            screen.getByText("El apellido es obligatorio")
        ).toBeInTheDocument()

        expect(
            screen.getByText("La cédula es obligatoria")
        ).toBeInTheDocument()

        expect(
            screen.getByText("La fecha de nacimiento es obligatoria")
        ).toBeInTheDocument()

        expect(
            screen.getByText("El teléfono es obligatorio")
        ).toBeInTheDocument()

        expect(
            screen.getByText("La dirección es obligatoria")
        ).toBeInTheDocument()

        expect(
            screen.getByText("El correo es obligatorio")
        ).toBeInTheDocument()

        expect(
            screen.getByText("La contraseña es obligatoria")
        ).toBeInTheDocument()

        expect(
            screen.getByText("Confirma tu contraseña")
        ).toBeInTheDocument()

    })

    test("valida el formato del campo correo", async () => {

        render(<UsuarioForm />)

        await userEvent.type(
            screen.getByPlaceholderText("correo@ejemplo.com"),
            "correoinvalido"
        )

        await userEvent.click(
            screen.getByRole("button", {
                name: /aceptar/i
            })
        )

        expect(
            await screen.findByText(
                "Ingresa un correo válido"
            )
        ).toBeInTheDocument()

    })

    test("valida que la contraseña sea segura", async () => {

        render(<UsuarioForm />)

        await userEvent.type(
            screen.getByPlaceholderText("8-16 caracteres"),
            "123"
        )

        await userEvent.click(
            screen.getByRole("button", {
                name: /aceptar/i
            })
        )

        expect(
            await screen.findByText(
                "La contraseña debe tener entre 8 y 16 caracteres"
            )
        ).toBeInTheDocument()

    })

    test("valida que las contraseñas coincidan", async () => {

        render(<UsuarioForm />)

        await userEvent.type(
            screen.getByPlaceholderText("8-16 caracteres"),
            "Admin@123"
        )

        await userEvent.type(
            screen.getByPlaceholderText("Repite tu contraseña"),
            "Admin@456"
        )

        await userEvent.click(
            screen.getByRole("button", {
                name: /aceptar/i
            })
        )

        expect(
            await screen.findByText(
                "Las contraseñas no coinciden"
            )
        ).toBeInTheDocument()

    })

    test("permite mostrar la contraseña", async () => {

        render(<UsuarioForm />)

        const passwordInput =
            screen.getByPlaceholderText(
                "8-16 caracteres"
            )

        expect(passwordInput)
            .toHaveAttribute(
                "type",
                "password"
            )

        const buttons =
            screen.getAllByRole("button")

        await userEvent.click(buttons[0])

        expect(passwordInput)
            .toHaveAttribute(
                "type",
                "text"
            )

    })

    test("envía datos válidos", async () => {

        render(<UsuarioForm />)

        await userEvent.type(
            screen.getByPlaceholderText("Ej: Juan"),
            "Carlos"
        )

        await userEvent.type(
            screen.getByPlaceholderText("Ej: Pérez"),
            "Lopez"
        )

        await userEvent.type(
            screen.getAllByPlaceholderText("10 dígitos")[0],
            "1723456789"
        )

        const fechaNacimiento =
            document.querySelector(
                'input[name="fecha_nacimiento"]'
            )

        await userEvent.type(
            fechaNacimiento,
            "2000-01-01"
        )

        await userEvent.type(
            screen.getAllByPlaceholderText("10 dígitos")[1],
            "0999999999"
        )

        await userEvent.type(
            screen.getByPlaceholderText(
                "Ej: Av. Amazonas 123"
            ),
            "Quito Norte"
        )

        await userEvent.type(
            screen.getByPlaceholderText(
                "correo@ejemplo.com"
            ),
            "carlos@test.com"
        )

        await userEvent.type(
            screen.getByPlaceholderText(
                "8-16 caracteres"
            ),
            "Admin@123"
        )

        await userEvent.type(
            screen.getByPlaceholderText(
                "Repite tu contraseña"
            ),
            "Admin@123"
        )

        await userEvent.click(
            screen.getByRole("button", {
                name: /aceptar/i
            })
        )

        expect(
            registrarVendedor
        ).toHaveBeenCalledWith({
            nombre: "Carlos",
            apellido: "Lopez",
            cedula: "1723456789",
            fecha_nacimiento: "2000-01-01",
            telefono: "0999999999",
            direccion: "Quito Norte",
            email: "carlos@test.com",
            password: "Admin@123",
            rol: "VENDEDOR"
        })

    })

})