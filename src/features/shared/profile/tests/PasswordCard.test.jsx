import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, test, expect, vi, beforeEach } from "vitest"
import "@testing-library/jest-dom"

import PasswordCard from "../components/PasswordCard"
import { changePassword } from "../services/profileService"

vi.mock("../services/profileService", () => ({
    changePassword: vi.fn()
}))

const getInputs = () => ({
    actual: screen.getByLabelText("Contraseña actual"),
    nueva: screen.getByLabelText("Nueva contraseña"),
    confirm: screen.getByLabelText("Confirmar contraseña")
})

describe("PasswordCard Frontend", () => {

    beforeEach(() => {
        vi.clearAllMocks()
    })

    test("Renderiza inputs y botón", () => {

        render(<PasswordCard />)

        const { actual, nueva, confirm } = getInputs()

        expect(actual).toBeInTheDocument()
        expect(nueva).toBeInTheDocument()
        expect(confirm).toBeInTheDocument()

        expect(
            screen.getByRole("button", {
                name: /actualizar contraseña/i
            })
        ).toBeInTheDocument()
    })

    test("Muestra errores cuando los campos están vacíos", async () => {

        const user = userEvent.setup()

        render(<PasswordCard />)

        await user.click(
            screen.getByRole("button", {
                name: /actualizar contraseña/i
            })
        )

        expect(
            screen.getByText("La contraseña actual es obligatoria")
        ).toBeInTheDocument()
    })

    test("Valida que nueva contraseña no sea igual a la actual", async () => {

        const user = userEvent.setup()

        render(<PasswordCard />)

        const { actual, nueva, confirm } = getInputs()

        await user.type(actual, "Test123@")
        await user.type(nueva, "Test123@")
        await user.type(confirm, "Test123@")

        await user.click(
            screen.getByRole("button", {
                name: /actualizar contraseña/i
            })
        )

        expect(
            screen.getByText("La nueva contraseña no puede ser igual a la actual")
        ).toBeInTheDocument()
    })

    test("Valida que contraseñas no coincidan", async () => {

        const user = userEvent.setup()

        render(<PasswordCard />)

        const { actual, nueva, confirm } = getInputs()

        await user.type(actual, "Test123@")
        await user.type(nueva, "New123@")
        await user.type(confirm, "Other123@")

        await user.click(
            screen.getByRole("button", {
                name: /actualizar contraseña/i
            })
        )

        expect(
            screen.getByText("Las contraseñas no coinciden")
        ).toBeInTheDocument()
    })

    test("Valida contraseña insegura", async () => {

        const user = userEvent.setup()

        render(<PasswordCard />)

        const { actual, nueva, confirm } = getInputs()

        await user.type(actual, "Test123@")
        await user.type(nueva, "123")
        await user.type(confirm, "123")

        await user.click(
            screen.getByRole("button", {
                name: /actualizar contraseña/i
            })
        )

        expect(
            screen.getByText(
                "Debe tener 8-16 caracteres, mayúscula, minúscula, número y símbolo"
            )
        ).toBeInTheDocument()
    })

    test("envía datos correctos al backend", async () => {

        const user = userEvent.setup()

        changePassword.mockResolvedValue({ ok: true })

        render(<PasswordCard />)

        const { actual, nueva, confirm } = getInputs()

        await user.type(actual, "Test123@")
        await user.type(nueva, "NewTest123@")
        await user.type(confirm, "NewTest123@")

        await user.click(
            screen.getByRole("button", {
                name: /actualizar contraseña/i
            })
        )

        expect(changePassword).toHaveBeenCalledWith({
            passwordActual: "Test123@",
            passwordNueva: "NewTest123@",
            confirmPassword: "NewTest123@"
        })
    })

    test("maneja error del backend", async () => {

        const user = userEvent.setup()

        changePassword.mockRejectedValue(new Error("Error servidor"))

        render(<PasswordCard />)

        const { actual, nueva, confirm } = getInputs()

        await user.type(actual, "Test123@")
        await user.type(nueva, "NewTest123@")
        await user.type(confirm, "NewTest123@")

        await user.click(
            screen.getByRole("button", {
                name: /actualizar contraseña/i
            })
        )

        expect(changePassword).toHaveBeenCalled()
    })
})