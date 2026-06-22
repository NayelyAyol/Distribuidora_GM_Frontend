import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, test, expect, vi, beforeEach } from "vitest"
import "@testing-library/jest-dom/vitest"

import RecomendacionesPage from "../pages/RecomendacionPage"

import {
    obtenerRecomendacionesAdmin,
    responderRecomendacion
} from "../../recommendations/service/recomendacionService"

import { toast } from "react-toastify"

vi.mock("../../recommendations/service/recomendacionService", () => ({
    obtenerRecomendacionesAdmin: vi.fn(),
    responderRecomendacion: vi.fn()
}))

vi.mock("react-toastify", () => ({
    toast: {
        success: vi.fn(),
        error: vi.fn()
    }
}))

vi.mock("../pages/NotificationPage", () => ({
    default: () => <div>Panel IA</div>
}))

vi.mock("@/components/ui/card", () => ({
    Card: ({ children }) => <div>{children}</div>
}))

vi.mock("@/components/ui/button", () => ({
    Button: ({ children, onClick }) => (
        <button onClick={onClick}>
            {children}
        </button>
    )
}))

vi.mock("@/components/ui/DataTable", () => ({
    default: ({ data, columns }) => (
        <div>
            {data.map((item) => (
                <div key={item._id}>
                    <span>{item.mensaje}</span>

                    {columns[0].cell({
                        row: {
                            original: item
                        }
                    })}
                </div>
            ))}
        </div>
    )
}))

vi.mock("../columns/recomendacionColumns", () => ({
    recomendacionColumns: (onOpenModal) => [
        {
            cell: ({ row }) => (
                <button
                    onClick={() =>
                        onOpenModal(row.original)
                    }
                >
                    Ver
                </button>
            )
        }
    ]
}))

describe("RecomendacionesPage", () => {

    const recomendacionMock = {
        _id: "1",
        mensaje: "Necesitan más productos",
        estado: "PENDIENTE"
    }

    beforeEach(() => {
        vi.clearAllMocks()
    })

    test("carga recomendaciones al iniciar", async () => {

        obtenerRecomendacionesAdmin.mockResolvedValue({
            recomendaciones: [recomendacionMock]
        })

        render(<RecomendacionesPage />)

        await waitFor(() => {

            expect(
                obtenerRecomendacionesAdmin
            ).toHaveBeenCalledWith(
                "PENDIENTE"
            )

        })

        expect(
            screen.getByText(
                "Necesitan más productos"
            )
        ).toBeInTheDocument()
    })

    test("cambia a pestaña Inteligentes", async () => {

        const user = userEvent.setup()

        obtenerRecomendacionesAdmin.mockResolvedValue({
            recomendaciones: []
        })

        render(<RecomendacionesPage />)

        await user.click(
            screen.getByText("Inteligentes")
        )

        expect(
            screen.getByText("Panel IA")
        ).toBeInTheDocument()
    })

    test("cambia filtro a FINALIZADA", async () => {

        const user = userEvent.setup()

        obtenerRecomendacionesAdmin.mockResolvedValue({
            recomendaciones: []
        })

        render(<RecomendacionesPage />)

        await user.click(
            screen.getByText("Atendidas")
        )

        await waitFor(() => {

            expect(
                obtenerRecomendacionesAdmin
            ).toHaveBeenLastCalledWith(
                "FINALIZADA"
            )

        })
    })

    test("muestra error cuando falla la carga", async () => {

        obtenerRecomendacionesAdmin.mockRejectedValue(
            new Error("Error servidor")
        )

        render(<RecomendacionesPage />)

        await waitFor(() => {

            expect(
                toast.error
            ).toHaveBeenCalledWith(
                "Error servidor"
            )

        })
    })

    test("muestra error si la respuesta está vacía", async () => {

        const user = userEvent.setup()

        obtenerRecomendacionesAdmin.mockResolvedValue({
            recomendaciones: [recomendacionMock]
        })

        render(<RecomendacionesPage />)

        await user.click(
            await screen.findByText("Ver")
        )

        await user.click(
            screen.getByText("Aceptar")
        )

        expect(
            toast.error
        ).toHaveBeenCalledWith(
            "La respuesta no puede estar vacía"
        )
    })

    test("responde correctamente una recomendación", async () => {

        const user = userEvent.setup()

        obtenerRecomendacionesAdmin.mockResolvedValue({
            recomendaciones: [recomendacionMock]
        })

        responderRecomendacion.mockResolvedValue({})

        render(<RecomendacionesPage />)

        await user.click(
            await screen.findByText("Ver")
        )

        await user.type(
            screen.getByPlaceholderText(
                "Escribe tu respuesta..."
            ),
            "Respuesta del administrador"
        )

        await user.click(
            screen.getByText("Aceptar")
        )

        await waitFor(() => {

            expect(
                responderRecomendacion
            ).toHaveBeenCalledWith(
                "1",
                "Respuesta del administrador"
            )

            expect(
                toast.success
            ).toHaveBeenCalledWith(
                "Recomendación respondida"
            )

        })
    })
})