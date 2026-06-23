import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, test, expect, vi, beforeEach } from "vitest"
import "@testing-library/jest-dom"

vi.stubEnv(
    "VITE_BACKEND_URL",
    "http://localhost:3000/api"
)

vi.mock("socket.io-client", () => ({
    io: () => ({
        emit: vi.fn(),
        on: vi.fn(),
        off: vi.fn()
    })
}))

vi.mock("@/context/useAuthStore", () => {
    const store = (callback) =>
        callback({
            user: {
                id: "user1",
                nombre: "Juan",
                rol: "VENDEDOR"
            }
        })

    return { default: store }
})

vi.mock("../services/chatService", () => ({
    obtenerChatPedido: vi.fn(),
    enviarMensajePedido: vi.fn(),
    marcarChatLeido: vi.fn()
}))

vi.mock("react-toastify", () => ({
    toast: {
        error: vi.fn(),
        success: vi.fn(),
        warning: vi.fn(),
        info: vi.fn()
    }
}))

import ChatModal from "../components/ChatModal"
import {
    obtenerChatPedido,
    enviarMensajePedido,
    marcarChatLeido
} from "../services/chatService"
import { toast } from "react-toastify"

describe("ChatModal vendedor", () => {

    beforeEach(() => {
        vi.clearAllMocks()
    })

    test("carga mensajes correctamente", async () => {

        obtenerChatPedido.mockResolvedValue({
            mensajes: [
                {
                    _id: "1",
                    mensaje: "Hola vendedor",
                    emisor: {
                        _id: "cliente1"
                    }
                }
            ]
        })

        render(
            <ChatModal
                isOpen={true}
                onClose={vi.fn()}
                pedidoId="123"
                otherUserName="Cliente"
                pedidoNombre="Pedido Laptop"
            />
        )

        expect(
            await screen.findByText("Hola vendedor")
        ).toBeInTheDocument()

        expect(marcarChatLeido)
            .toHaveBeenCalledWith("123")
    })

    test("muestra error al cargar chat", async () => {

        obtenerChatPedido.mockRejectedValue(
            new Error("Error")
        )

        render(
            <ChatModal
                isOpen={true}
                onClose={vi.fn()}
                pedidoId="123"
                otherUserName="Cliente"
            />
        )

        await waitFor(() => {

            expect(toast.error)
                .toHaveBeenCalledWith(
                    "Error al cargar el chat"
                )

        })
    })

    test("envia mensaje correctamente", async () => {

        obtenerChatPedido.mockResolvedValue({
            mensajes: []
        })

        enviarMensajePedido.mockResolvedValue({
            mensaje: {
                _id: "2",
                mensaje: "Mensaje prueba"
            }
        })

        render(
            <ChatModal
                isOpen={true}
                onClose={vi.fn()}
                pedidoId="123"
                otherUserName="Cliente"
            />
        )

        const input = await screen.findByPlaceholderText(
            "Escribe algo..."
        )

        await userEvent.type(
            input,
            "Mensaje prueba"
        )

        await userEvent.click(
            screen.getByText("Enviar")
        )

        await waitFor(() => {

            expect(enviarMensajePedido)
                .toHaveBeenCalledWith(
                    "123",
                    "Mensaje prueba"
                )

        })
    })

    test("cierra el modal correctamente", async () => {

        obtenerChatPedido.mockResolvedValue({
            mensajes: []
        })

        const onClose = vi.fn()

        render(
            <ChatModal
                isOpen={true}
                onClose={onClose}
                pedidoId="123"
                otherUserName="Cliente"
            />
        )

        const botones =
            await screen.findAllByRole("button")

        await userEvent.click(
            botones[0]
        )

        expect(onClose)
            .toHaveBeenCalled()
    })

    test("no envia mensaje vacio", async () => {

        obtenerChatPedido.mockResolvedValue({
            mensajes: []
        })

        render(
            <ChatModal
                isOpen={true}
                onClose={vi.fn()}
                pedidoId="123"
                otherUserName="Cliente"
            />
        )

        await userEvent.click(
            await screen.findByText("Enviar")
        )

        expect(enviarMensajePedido)
            .not.toHaveBeenCalled()
    })

})