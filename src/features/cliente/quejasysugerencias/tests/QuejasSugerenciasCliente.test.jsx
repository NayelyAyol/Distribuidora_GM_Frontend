import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, test, expect, vi, beforeEach } from "vitest"
import "@testing-library/jest-dom/vitest"

import RecomendacionForm from "../../../vendedor/recomendaciones/components/RecomendacionForm"
import { toast } from "react-toastify"
import useAuthStore from "@/context/useAuthStore"

vi.mock("react-toastify", () => ({
    toast: {
        success: vi.fn(),
        error: vi.fn()
    }
}))


vi.mock("@/context/useAuthStore", () => ({
    default: vi.fn()
}))


describe("RecomendacionForm", () => {


    beforeEach(() => {
        vi.clearAllMocks()

        useAuthStore.mockReturnValue({
            user:{
                rol:"CLIENTE"
            }
        })

    })


    test("renderiza los campos correctamente",()=>{


        render(
            <RecomendacionForm
                onSubmit={vi.fn()}
            />
        )

        expect(
            screen.getByPlaceholderText(
                "Asunto"
            )
        ).toBeInTheDocument()

        expect(
            screen.getByPlaceholderText(
                "Escribe tu mensaje..."
            )
        ).toBeInTheDocument()

        expect(
            screen.getByRole(
                "button",
                {
                    name:/enviar/i
                }
            )
        ).toBeInTheDocument()
    })

    test("permite escribir en los campos",async()=>{


        const user =
        userEvent.setup()



        render(
            <RecomendacionForm
                onSubmit={vi.fn()}
            />
        )

        const asunto =
        screen.getByPlaceholderText(
            "Asunto"
        )


        const mensaje =
        screen.getByPlaceholderText(
            "Escribe tu mensaje..."
        )

        await user.type(
            asunto,
            "Problema pedido"
        )

        await user.type(
            mensaje,
            "Necesito ayuda"
        )

        expect(asunto)
        .toHaveValue(
            "Problema pedido"
        )

        expect(mensaje)
        .toHaveValue(
            "Necesito ayuda"
        )


    })

    test("muestra error cuando el asunto está vacío",async()=>{


        const user =
        userEvent.setup()

        render(
            <RecomendacionForm
                onSubmit={vi.fn()}
            />
        )

        await user.click(
            screen.getByRole(
                "button",
                {
                    name:/enviar/i
                }
            )
        )

        expect(
            toast.error
        )
        .toHaveBeenCalledWith(
            "Ingresa un asunto"
        )

    })

    test("muestra error cuando el mensaje está vacío",async()=>{


        const user =
        userEvent.setup()

        render(
            <RecomendacionForm
                onSubmit={vi.fn()}
            />
        )

        await user.type(
            screen.getByPlaceholderText(
                "Asunto"
            ),
            "Problema pedido"
        )

        await user.click(
            screen.getByRole(
                "button",
                {
                    name:/enviar/i
                }
            )
        )

        expect(
            toast.error
        )
        .toHaveBeenCalledWith(
            "Escribe un mensaje"
        )


    })

    test("envía correctamente la recomendación",async()=>{


        const user =
        userEvent.setup()



        const onSubmit =
        vi.fn()
        .mockResolvedValue({})

        render(
            <RecomendacionForm
                onSubmit={onSubmit}
            />
        )

        await user.type(
            screen.getByPlaceholderText(
                "Asunto"
            ),
            "Problema con pedido"
        )

        await user.type(
            screen.getByPlaceholderText(
                "Escribe tu mensaje..."
            ),
            "Necesito ayuda con mi pedido"
        )

        await user.click(
            screen.getByRole(
                "button",
                {
                    name:/enviar/i
                }
            )
        )

        await waitFor(()=>{


            expect(
                onSubmit
            )
            .toHaveBeenCalledWith({

                tipo:"QUEJA",

                asunto:"Problema con pedido",

                mensaje:"Necesito ayuda con mi pedido"

            })


            expect(
                toast.success
            )
            .toHaveBeenCalledWith(
                "Mensaje enviado correctamente"
            )


        })
    })

    test("muestra error cuando falla el envío",async()=>{


        const user =
        userEvent.setup()



        const onSubmit =
        vi.fn()
        .mockRejectedValue(
            new Error(
                "Error servidor"
            )
        )

        render(
            <RecomendacionForm
                onSubmit={onSubmit}
            />
        )

        await user.type(
            screen.getByPlaceholderText(
                "Asunto"
            ),
            "Problema pedido"
        )

        await user.type(
            screen.getByPlaceholderText(
                "Escribe tu mensaje..."
            ),
            "Necesito ayuda"
        )

        await user.click(
            screen.getByRole(
                "button",
                {
                    name:/enviar/i
                }
            )
        )

        await waitFor(()=>{


            expect(
                toast.error
            )
            .toHaveBeenCalledWith(
                "Error servidor"
            )


        })
    })

})