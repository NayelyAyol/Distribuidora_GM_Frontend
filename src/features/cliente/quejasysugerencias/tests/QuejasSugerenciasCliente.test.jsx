import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, test, expect, vi, beforeEach } from "vitest"
import "@testing-library/jest-dom/vitest"

import RecomendacionForm from "../../../vendedor/recomendaciones/components/RecomendacionForm"
import { toast } from "react-toastify"

vi.mock("react-toastify", () => ({
    toast: {
        success: vi.fn(),
        error: vi.fn()
    }
}))

describe("Quejas y Sugerencias - Cliente Form", () => {

    beforeEach(() => {
        vi.clearAllMocks()
    })

    test("renderiza los campos correctamente", () => {

        render(
            <RecomendacionForm
                onSubmit={vi.fn()}
            />
        )

        expect(
            screen.getByPlaceholderText(/asunto/i)
        ).toBeInTheDocument()

        expect(
            screen.getByPlaceholderText(
                /escribe tu mensaje/i
            )
        ).toBeInTheDocument()

        expect(
            screen.getByRole("button", {
                name: /enviar/i
            })
        ).toBeInTheDocument()
    })

    test("permite escribir en los campos", async () => {

        const user = userEvent.setup()

        render(
            <RecomendacionForm
                onSubmit={vi.fn()}
            />
        )

        const asunto =
            screen.getByPlaceholderText(/asunto/i)

        const mensaje =
            screen.getByPlaceholderText(
                /escribe tu mensaje/i
            )

        await user.type(
            asunto,
            "Problema con pedido"
        )

        await user.type(
            mensaje,
            "Necesito ayuda"
        )

        expect(asunto)
            .toHaveValue("Problema con pedido")

        expect(mensaje)
            .toHaveValue("Necesito ayuda")
    })

    test("muestra error cuando el asunto está vacío", async () => {

        const user = userEvent.setup()

        render(
            <RecomendacionForm
                onSubmit={vi.fn()}
            />
        )

        await user.click(
            screen.getByRole("button", {
                name: /enviar/i
            })
        )

        expect(toast.error)
            .toHaveBeenCalledWith(
                "Ingresa un asunto"
            )
    })

    test("muestra error cuando el mensaje está vacío", async () => {

        const user = userEvent.setup()

        render(
            <RecomendacionForm
                onSubmit={vi.fn()}
            />
        )

        await user.type(
            screen.getByPlaceholderText(/asunto/i),
            "Problema con pedido"
        )

        await user.click(
            screen.getByRole("button", {
                name: /enviar/i
            })
        )

        expect(toast.error)
            .toHaveBeenCalledWith(
                "Escribe un mensaje"
            )
    })

    test("muestra error cuando el asunto tiene menos de 5 caracteres", async () => {

        const user = userEvent.setup()

        render(
            <RecomendacionForm
                onSubmit={vi.fn()}
            />
        )

        await user.type(
            screen.getByPlaceholderText(/asunto/i),
            "abc"
        )

        await user.type(
            screen.getByPlaceholderText(
                /escribe tu mensaje/i
            ),
            "Mensaje válido"
        )

        await user.click(
            screen.getByRole("button", {
                name: /enviar/i
            })
        )

        expect(toast.error)
            .toHaveBeenCalledWith(
                "El asunto debe tener al menos 5 caracteres"
            )
    })

    test("muestra error cuando el mensaje tiene menos de 5 caracteres", async () => {

        const user = userEvent.setup()

        render(
            <RecomendacionForm
                onSubmit={vi.fn()}
            />
        )

        await user.type(
            screen.getByPlaceholderText(/asunto/i),
            "Problema pedido"
        )

        await user.type(
            screen.getByPlaceholderText(
                /escribe tu mensaje/i
            ),
            "abc"
        )

        await user.click(
            screen.getByRole("button", {
                name: /enviar/i
            })
        )

        expect(toast.error)
            .toHaveBeenCalledWith(
                "El mensaje debe tener al menos 5 caracteres"
            )
    })

    test("envía correctamente la recomendación", async () => {

        const user = userEvent.setup()

        const onSubmit = vi.fn()
            .mockResolvedValue({})

        render(
            <RecomendacionForm
                onSubmit={onSubmit}
            />
        )

        await user.type(
            screen.getByPlaceholderText(/asunto/i),
            "Problema con pedido"
        )

        await user.type(
            screen.getByPlaceholderText(
                /escribe tu mensaje/i
            ),
            "Necesito ayuda con mi pedido"
        )

        await user.click(
            screen.getByRole("button", {
                name: /enviar/i
            })
        )

        await waitFor(() => {

            expect(onSubmit)
                .toHaveBeenCalledTimes(1)

            expect(onSubmit)
                .toHaveBeenCalledWith({
                    asunto: "Problema con pedido",
                    mensaje: "Necesito ayuda con mi pedido"
                })

            expect(toast.success)
                .toHaveBeenCalledWith(
                    "Mensaje enviado correctamente"
                )
        })
    })

    test("muestra error cuando falla el envío", async () => {

        const user = userEvent.setup()

        const onSubmit = vi.fn()
            .mockRejectedValue(
                new Error("Error servidor")
            )

        render(
            <RecomendacionForm
                onSubmit={onSubmit}
            />
        )

        await user.type(
            screen.getByPlaceholderText(/asunto/i),
            "Problema con pedido"
        )

        await user.type(
            screen.getByPlaceholderText(
                /escribe tu mensaje/i
            ),
            "Necesito ayuda con mi pedido"
        )

        await user.click(
            screen.getByRole("button", {
                name: /enviar/i
            })
        )

        await waitFor(() => {

            expect(toast.error)
                .toHaveBeenCalledWith(
                    "Error servidor"
                )
        })
    })

})