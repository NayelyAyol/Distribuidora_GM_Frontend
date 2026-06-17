import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, test, expect, vi, beforeEach } from "vitest"
import "@testing-library/jest-dom/vitest"

import UsuariosPage from "../pages/UsuariosPage"

import {
    listarVendedoresActivos,
    buscarVendedor
} from "../services/vendedorService"

vi.mock("../services/vendedorService", () => ({
    listarVendedoresActivos: vi.fn(),
    listarVendedoresInactivos: vi.fn(),
    buscarVendedor: vi.fn(),
    activarVendedor: vi.fn(),
    desactivarVendedor: vi.fn()
}))

vi.mock("../services/clienteService", () => ({
    listarClientesActivos: vi.fn(),
    listarClientesInactivos: vi.fn(),
    buscarCliente: vi.fn(),
    activarCliente: vi.fn(),
    desactivarCliente: vi.fn()
}))

vi.mock("../../../context/useAuthStore", () => ({
    default: () => ({
        _id: "1",
        perfilId: {
            rol: "ADMIN"
        }
    })
}))

describe("Gestión de vendedores", () => {

    beforeEach(() => {
        vi.clearAllMocks()
    })

    test("Carga vendedores al iniciar", async () => {

        listarVendedoresActivos.mockResolvedValue([
            {
                _id: "1",
                email: "juan@test.com",
                estado: true,
                perfilId: {
                    nombre: "Juan",
                    apellido: "Pérez",
                    cedula: "1234567890"
                }
            }
        ])

        render(<UsuariosPage />)

        expect(
            await screen.findByText("Juan")
        ).toBeInTheDocument()

        expect(
            screen.getByText("Pérez")
        ).toBeInTheDocument()

    })

    test("Permite buscar vendedor por cédula", async () => {

        listarVendedoresActivos.mockResolvedValue([])

        buscarVendedor.mockResolvedValue({
            usuarios: [
                {
                    _id: "1",
                    email: "juan@test.com",
                    estado: true,
                    perfilId: {
                        nombre: "Juan",
                        apellido: "Pérez",
                        cedula: "1234567890"
                    }
                }
            ]
        })

        render(<UsuariosPage />)

        const input = await screen.findByPlaceholderText(
            "Buscar por cédula..."
        )

        await userEvent.type(
            input,
            "1234567890"
        )

        const botones =
            screen.getAllByRole("button")

        await userEvent.click(
            botones.find(btn =>
                btn.querySelector("svg")
            )
        )

        await waitFor(() => {
            expect(buscarVendedor)
                .toHaveBeenCalledWith(
                    "1234567890"
                )
        })

    })

    test("Muestra botones Activos e Inactivos", async () => {

        render(<UsuariosPage />)

        expect(
            await screen.findByRole("button", {
                name: /^Activos$/i
            })
        ).toBeInTheDocument()

        expect(
            await screen.findByRole("button", {
                name: /^Inactivos$/i
            })
        ).toBeInTheDocument()
    })

})