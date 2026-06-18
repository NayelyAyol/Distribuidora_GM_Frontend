import { render, screen, waitFor, fireEvent } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, test, expect, vi, beforeEach } from "vitest"
import "@testing-library/jest-dom/vitest"

import RegisterForm from "../components/RegisterForm"
import { registro } from "../services/authService"
import { toast } from "react-toastify"

vi.mock("../services/authService", () => ({
    registro: vi.fn()
}))

vi.mock("react-toastify", () => ({
    toast: {
        success: vi.fn(),
        error: vi.fn()
    }
}))

describe("RegisterForm", () => {

    beforeEach(() => {
        vi.clearAllMocks()
    })

    const llenarFormularioValido = async (user) => {

        await user.type(
            screen.getByPlaceholderText(/carlos/i),
            "Juan"
        )

        await user.type(
            screen.getByPlaceholderText(/ruiz/i),
            "Perez"
        )

        await user.type(
            screen.getByPlaceholderText(/1725841230/i),
            "1234567890"
        )

        const fecha =
            screen.getByLabelText(
                /fecha de nacimiento/i
            )

        fireEvent.change(fecha, {
            target: {
                value: "2000-01-01"
            }
        })

        await user.type(
            screen.getByPlaceholderText(/0984512367/i),
            "0999999999"
        )

        await user.type(
            screen.getByPlaceholderText(/quito/i),
            "Quito"
        )

        await user.type(
            screen.getByPlaceholderText(/av. de los granados/i),
            "Av Siempre Viva"
        )

        await user.type(
            screen.getByPlaceholderText(/correo@gmail.com/i),
            "juan@test.com"
        )

        await user.type(
            screen.getByLabelText(/^contraseña$/i),
            "Password1!"
        )

        await user.type(
            screen.getByLabelText(/confirmar contraseña/i),
            "Password1!"
        )
    }

    test("renderiza todos los campos", () => {

        render(<RegisterForm />)

        expect(
            screen.getByPlaceholderText(/carlos/i)
        ).toBeInTheDocument()

        expect(
            screen.getByPlaceholderText(/ruiz/i)
        ).toBeInTheDocument()

        expect(
            screen.getByPlaceholderText(/1725841230/i)
        ).toBeInTheDocument()

        expect(
            screen.getByRole("button", {
                name: /aceptar/i
            })
        ).toBeInTheDocument()
    })

    test("permite escribir en los campos", async () => {

        const user = userEvent.setup()

        render(<RegisterForm />)

        const nombre =
            screen.getByPlaceholderText(/carlos/i)

        await user.type(nombre, "Juan")

        expect(nombre).toHaveValue("Juan")
    })

    test("muestra error cuando las contraseñas no coinciden", async () => {

        const user = userEvent.setup()

        render(<RegisterForm />)

        await llenarFormularioValido(user)

        const confirmar =
            screen.getByLabelText(
                /confirmar contraseña/i
            )

        await user.clear(confirmar)

        await user.type(
            confirmar,
            "Password2!"
        )

        await user.click(
            screen.getByRole("button", {
                name: /aceptar/i
            })
        )

        expect(
            await screen.findByText(
                /las contraseñas no coinciden/i
            )
        ).toBeInTheDocument()
    })

    test("muestra error cuando la contraseña es inválida", async () => {

        const user = userEvent.setup()

        render(<RegisterForm />)

        await llenarFormularioValido(user)

        const password =
            screen.getByLabelText(
                /^contraseña$/i
            )

        const confirmar =
            screen.getByLabelText(
                /confirmar contraseña/i
            )

        await user.clear(password)
        await user.clear(confirmar)

        await user.type(password, "123")
        await user.type(confirmar, "123")

        await user.click(
            screen.getByRole("button", {
                name: /aceptar/i
            })
        )

        expect(
            await screen.findByText(
                /debe tener entre 8 y 16 caracteres/i
            )
        ).toBeInTheDocument()
    })

    test("registra usuario correctamente", async () => {

        const user = userEvent.setup()

        registro.mockResolvedValue({})

        render(<RegisterForm />)

        await llenarFormularioValido(user)

        await user.click(
            screen.getByRole("button", {
                name: /aceptar/i
            })
        )

        await waitFor(() => {

            expect(registro)
                .toHaveBeenCalledTimes(1)

            expect(toast.success)
                .toHaveBeenCalledWith(
                    "Registro exitoso"
                )
        })
    })

    test("muestra error cuando falla el servicio", async () => {

        const user = userEvent.setup()

        registro.mockRejectedValue(
            new Error("Error servidor")
        )

        render(<RegisterForm />)

        await llenarFormularioValido(user)

        await user.click(
            screen.getByRole("button", {
                name: /aceptar/i
            })
        )

        await waitFor(() => {

            expect(registro)
                .toHaveBeenCalledTimes(1)

            expect(toast.error)
                .toHaveBeenCalledWith(
                    "Error servidor"
                )
        })
    })

    test("permite mostrar y ocultar contraseña", async () => {

        const user = userEvent.setup()

        render(<RegisterForm />)

        const passwordInput =
            screen.getByLabelText(
                /^contraseña$/i
            )

        const botones =
            screen.getAllByRole("button")

        expect(passwordInput)
            .toHaveAttribute(
                "type",
                "password"
            )

        await user.click(botones[0])

        expect(passwordInput)
            .toHaveAttribute(
                "type",
                "text"
            )
    })

})