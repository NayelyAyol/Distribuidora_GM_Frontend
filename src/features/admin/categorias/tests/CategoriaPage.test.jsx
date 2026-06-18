import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, test, expect, vi, beforeEach } from "vitest"
import "@testing-library/jest-dom/vitest"

import CategoriaPage from "../pages/CategoriaPage"

import {
    listarCategoriasActivas,
    listarCategoriasInactivas,
    desactivarCategoria
} from "../services/categoriaService"

const mockNavigate = vi.fn()

vi.mock("../services/categoriaService", () => ({
    listarCategoriasActivas: vi.fn(),
    listarCategoriasInactivas: vi.fn(),
    activarCategoria: vi.fn(),
    desactivarCategoria: vi.fn(),
    crearCategoria: vi.fn(),
    actualizarCategoria: vi.fn()
}))

vi.mock("@/context/useAuthStore", () => ({
    default: (selector) =>
        selector({
            user: {
                _id: "1",
                rol: "ADMINISTRADOR"
            }
        })
}))

vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual("react-router-dom")

    return {
        ...actual,
        useNavigate: () => mockNavigate
    }
})

describe("Gestión de categorías", () => {

    beforeEach(() => {
        vi.clearAllMocks()
    })

    test("Carga categorías activas al iniciar", async () => {

        listarCategoriasActivas.mockResolvedValue([
            {
                _id: "1",
                nombre: "Electrónicos",
                descripcion: "Productos tecnológicos",
                estado: true
            }
        ])

        render(<CategoriaPage />)

        expect(
            await screen.findByText("Electrónicos")
        ).toBeInTheDocument()

        expect(
            screen.getByText("Productos tecnológicos")
        ).toBeInTheDocument()
    })

    test("Muestra botones Activos e Inactivos", async () => {

        listarCategoriasActivas.mockResolvedValue([])

        render(<CategoriaPage />)

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

    test("Permite cambiar a categorías inactivas", async () => {

        listarCategoriasActivas.mockResolvedValue([])

        listarCategoriasInactivas.mockResolvedValue([
            {
                _id: "2",
                nombre: "Hogar",
                descripcion: "Productos para el hogar",
                estado: false
            }
        ])

        render(<CategoriaPage />)

        const botonInactivos =
            await screen.findByRole("button", {
                name: /^Inactivos$/i
            })

        await userEvent.click(botonInactivos)

        await waitFor(() => {
            expect(
                listarCategoriasInactivas
            ).toHaveBeenCalled()
        })
    })

    test("Permite abrir modal para desactivar categoría", async () => {

        listarCategoriasActivas.mockResolvedValue([
            {
                _id: "1",
                nombre: "Electrónicos",
                descripcion: "Productos tecnológicos",
                estado: true
            }
        ])

        render(<CategoriaPage />)

        const botonDesactivar =
            await screen.findByRole("button", {
                name: /Desactivar/i
            })

        await userEvent.click(botonDesactivar)

        expect(
            await screen.findByText(
                /Confirmar desactivación/i
            )
        ).toBeInTheDocument()
    })

    test("Desactiva una categoría al confirmar", async () => {

        listarCategoriasActivas.mockResolvedValue([
            {
                _id: "1",
                nombre: "Electrónicos",
                descripcion: "Productos tecnológicos",
                estado: true
            }
        ])

        desactivarCategoria.mockResolvedValue({})

        render(<CategoriaPage />)

        const botonDesactivar =
            await screen.findByRole("button", {
                name: /Desactivar/i
            })

        await userEvent.click(botonDesactivar)

        await screen.findByText(
            /Confirmar desactivación/i
        )

        const botonesAceptar =
            screen.getAllByRole("button", {
                name: /^Aceptar$/i
            })

        await userEvent.click(
            botonesAceptar[1]
        )

        await waitFor(() => {
            expect(
                desactivarCategoria
            ).toHaveBeenCalledWith("1")
        })
    })

})