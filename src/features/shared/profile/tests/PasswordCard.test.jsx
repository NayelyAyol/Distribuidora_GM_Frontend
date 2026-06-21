import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, test, expect, vi, beforeEach } from "vitest"
import "@testing-library/jest-dom/vitest"

import PasswordCard from "../components/PasswordCard"
import { changePassword } from "../services/profileService"


vi.mock("../services/profileService", () => ({
    changePassword: vi.fn()
}))


vi.mock("react-toastify", () => ({
    toast: {
        success: vi.fn(),
        error: vi.fn()
    }
}))


const getInputs = () => ({
    actual: screen.getByLabelText("Contraseña actual"),
    nueva: screen.getByLabelText("Nueva contraseña"),
    confirm: screen.getByLabelText("Confirmar contraseña")
})


describe("PasswordCard - Test unitario", () => {


    beforeEach(() => {
        vi.clearAllMocks()
    })


    test("Renderiza correctamente los campos y botón", () => {

        render(<PasswordCard />)


        expect(
            screen.getByText("Cambiar contraseña")
        ).toBeInTheDocument()


        expect(
            screen.getByLabelText("Contraseña actual")
        ).toBeInTheDocument()


        expect(
            screen.getByLabelText("Nueva contraseña")
        ).toBeInTheDocument()


        expect(
            screen.getByLabelText("Confirmar contraseña")
        ).toBeInTheDocument()


        expect(
            screen.getByRole("button", {
                name:/Actualizar contraseña/i
            })
        ).toBeInTheDocument()

    })



    test("Muestra errores si los campos están vacíos", async()=>{

        const user = userEvent.setup()

        render(<PasswordCard />)


        await user.click(
            screen.getByRole("button", {
                name:/Actualizar contraseña/i
            })
        )


        expect(
            screen.getByText(
                "La contraseña actual es obligatoria"
            )
        ).toBeInTheDocument()


        expect(
            screen.getByText(
                "La nueva contraseña es obligatoria"
            )
        ).toBeInTheDocument()


        expect(
            screen.getByText(
                "Debes confirmar la contraseña"
            )
        ).toBeInTheDocument()

    })



    test("Rechaza contraseña que no cumple requisitos de seguridad", async()=>{

        const user = userEvent.setup()

        render(<PasswordCard />)


        const {actual,nueva,confirm} = getInputs()


        await user.type(actual,"Actual123@")


        await user.type(nueva,"123")


        await user.type(confirm,"123")


        await user.click(
            screen.getByRole("button", {
                name:/Actualizar contraseña/i
            })
        )


        expect(
            screen.getByText(
                "Debe tener 8-16 caracteres, mayúscula, minúscula, número y símbolo"
            )
        ).toBeInTheDocument()

    })



    test("Envía correctamente la nueva contraseña al servicio", async()=>{

        const user = userEvent.setup()


        changePassword.mockResolvedValue({
            ok:true
        })


        render(<PasswordCard />)


        const {actual,nueva,confirm} = getInputs()


        await user.type(actual,"Actual123@")


        await user.type(nueva,"Nueva123@")


        await user.type(confirm,"Nueva123@")


        await user.click(
            screen.getByRole("button", {
                name:/Actualizar contraseña/i
            })
        )


        await waitFor(()=>{

            expect(changePassword)
            .toHaveBeenCalledWith({

                passwordActual:"Actual123@",

                passwordNueva:"Nueva123@",

                confirmPassword:"Nueva123@"

            })

        })

    })



    test("Maneja error cuando falla el servicio", async()=>{

        const user = userEvent.setup()


        changePassword.mockRejectedValue(
            new Error("Error servidor")
        )


        render(<PasswordCard />)


        const {actual,nueva,confirm} = getInputs()


        await user.type(actual,"Actual123@")


        await user.type(nueva,"Nueva123@")


        await user.type(confirm,"Nueva123@")


        await user.click(
            screen.getByRole("button", {
                name:/Actualizar contraseña/i
            })
        )


        await waitFor(()=>{

            expect(changePassword)
            .toHaveBeenCalled()

        })

    })


})