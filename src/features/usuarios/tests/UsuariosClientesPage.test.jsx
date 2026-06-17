import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, test, expect, vi, beforeEach } from "vitest"
import "@testing-library/jest-dom/vitest"

import UsuariosPage from "../pages/UsuariosPage"

import {
    listarVendedoresActivos
} from "../services/vendedorService"

import {
    listarClientesActivos,
    buscarCliente
} from "../services/clienteService"

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
    default: (selector) =>
        selector({
            user: {
                _id: "1",
                perfilId: {
                    rol: "ADMIN"
                }
            }
        })
}))

describe("Gestión de clientes", () => {

    beforeEach(() => {

        vi.clearAllMocks()

        listarVendedoresActivos.mockResolvedValue({
            usuarios: []
        })

        listarClientesActivos.mockResolvedValue({
            usuarios: []
        })

    })

    test("Carga clientes al cambiar a la pestaña clientes", async () => {

        listarClientesActivos.mockResolvedValue({
            usuarios: [
                {
                    _id: "1",
                    email: "maria@test.com",
                    estado: true,
                    perfilId: {
                        nombre: "Maria",
                        apellido: "Lopez",
                        cedula: "1712345678"
                    }
                }
            ]
        })

        render(<UsuariosPage />)

        await waitFor(() => {
            expect(
                screen.queryByText("Cargando usuarios...")
            ).not.toBeInTheDocument()
        })

        const botonClientes =
            await screen.findByRole("button", {
                name: /clientes/i
            })

        await userEvent.click(botonClientes)

        expect(
            await screen.findByText("Maria")
        ).toBeInTheDocument()

        expect(
            screen.getByText("Lopez")
        ).toBeInTheDocument()

        expect(
            screen.getByText("1712345678")
        ).toBeInTheDocument()

    })

    test("Permite buscar cliente por cédula", async () => {

        buscarCliente.mockResolvedValue({
            usuarios: [
                {
                    _id: "1",
                    email: "maria@test.com",
                    estado: true,
                    perfilId: {
                        nombre: "Maria",
                        apellido: "Lopez",
                        cedula: "1712345678"
                    }
                }
            ]
        })

        render(<UsuariosPage />)

        await waitFor(() => {
            expect(
                screen.queryByText("Cargando usuarios...")
            ).not.toBeInTheDocument()
        })

        const botonClientes =
            await screen.findByRole("button", {
                name: /clientes/i
            })

        await userEvent.click(botonClientes)

        const input =
            await screen.findByPlaceholderText(
                "Buscar por cédula..."
            )

        await userEvent.type(
            input,
            "1712345678"
        )

        const botonBuscar =
            screen
                .getAllByRole("button")
                .find(btn => btn.querySelector("svg"))

        await userEvent.click(botonBuscar)

        await waitFor(() => {

            expect(
                buscarCliente
            ).toHaveBeenCalledWith(
                "1712345678"
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
            screen.getByRole("button", {
                name: /^Inactivos$/i
            })
        ).toBeInTheDocument()

    })

    test("Muestra la pestaña Clientes", async () => {

        render(<UsuariosPage />)

        await waitFor(() => {
            expect(
                screen.queryByText("Cargando usuarios...")
            ).not.toBeInTheDocument()
        })

        expect(
            await screen.findByRole("button", {
                name: /clientes/i
            })
        ).toBeInTheDocument()

    })

})