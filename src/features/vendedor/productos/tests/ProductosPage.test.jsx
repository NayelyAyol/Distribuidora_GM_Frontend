import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, test, expect, vi, beforeEach } from "vitest"
import "@testing-library/jest-dom/vitest"

import ProductosPage from "../pages/ProductosPage"

import {
    listarCategoriasActivas
} from "@/features/admin/categorias/services/categoriaService"

import {
    gestionProductos,
    desactivarProducto
} from "../services/productoService"

const mockNavigate = vi.fn()

vi.mock(
    "@/features/admin/categorias/services/categoriaService",
    () => ({
        listarCategoriasActivas: vi.fn()
    })
)

vi.mock("../services/productoService", () => ({
    gestionProductos: vi.fn(),
    activarProducto: vi.fn(),
    desactivarProducto: vi.fn()
}))

vi.mock("@/context/useAuthStore", () => ({
    default: (selector) =>
        selector({
            user: {
                _id: "1",
                rol: "VENDEDOR"
            }
        })
}))

vi.mock("react-router-dom", async () => {
    const actual =
        await vi.importActual("react-router-dom")

    return {
        ...actual,
        useNavigate: () => mockNavigate,
        useParams: () => ({
            categoriaId: "cat1"
        })
    }
})

vi.mock(
    "../../../catalogo/components/SearchBar",
    () => ({
        default: () => (
            <input placeholder="buscar" />
        )
    })
)

vi.mock("../components/ProductosGrid", () => ({
    default: ({
        productos,
        onToggleEstado
    }) => (
        <div>
            {productos.map((p) => (
                <div key={p._id}>
                    <span>{p.nombre}</span>

                    <button
                        onClick={() =>
                            onToggleEstado(p)
                        }
                    >
                        Toggle
                    </button>
                </div>
            ))}
        </div>
    )
}))

describe("ProductosPage", () => {

    beforeEach(() => {

        vi.clearAllMocks()

        listarCategoriasActivas.mockResolvedValue([
            {
                _id: "cat1",
                nombre: "Ferretería"
            }
        ])

        gestionProductos.mockResolvedValue({
            productos: [
                {
                    _id: "1",
                    nombre: "Martillo",
                    estado: true
                }
            ],
            totalPaginas: 1
        })

    })

    test(
        "Carga nombre de categoría",
        async () => {

            render(<ProductosPage />)

            expect(
                await screen.findByText(
                    /Ferretería/i
                )
            ).toBeInTheDocument()

        }
    )

    test(
        "Carga productos",
        async () => {

            render(<ProductosPage />)

            expect(
                await screen.findByText(
                    "Martillo"
                )
            ).toBeInTheDocument()

        }
    )

    test(
        "Muestra filtros de estado",
        async () => {

            render(<ProductosPage />)

            expect(
                await screen.findByRole(
                    "button",
                    {
                        name: /Activos/i
                    }
                )
            ).toBeInTheDocument()

            expect(
                screen.getByRole(
                    "button",
                    {
                        name: /Desactivados/i
                    }
                )
            ).toBeInTheDocument()

        }
    )

    test(
        "Permite cambiar a desactivados",
        async () => {

            render(<ProductosPage />)

            const boton =
                await screen.findByRole(
                    "button",
                    {
                        name: /Desactivados/i
                    }
                )

            await userEvent.click(boton)

            await waitFor(() => {

                expect(
                    gestionProductos
                ).toHaveBeenCalled()

            })

        }
    )

    test(
        "Abre modal para desactivar producto",
        async () => {

            render(<ProductosPage />)

            const boton =
                await screen.findByRole(
                    "button",
                    {
                        name: /Toggle/i
                    }
                )

            await userEvent.click(boton)

            expect(
                await screen.findByText(
                    /Confirmar desactivación/i
                )
            ).toBeInTheDocument()

        }
    )

    test(
        "Desactiva producto al confirmar",
        async () => {

            desactivarProducto.mockResolvedValue(
                {}
            )

            render(<ProductosPage />)

            const botonToggle =
                await screen.findByRole(
                    "button",
                    {
                        name: /Toggle/i
                    }
                )

            await userEvent.click(
                botonToggle
            )

            const botonesAceptar =
                await screen.findAllByRole(
                    "button",
                    {
                        name: /Aceptar/i
                    }
                )

            await userEvent.click(
                botonesAceptar[
                    botonesAceptar.length - 1
                ]
            )

            await waitFor(() => {

                expect(
                    desactivarProducto
                ).toHaveBeenCalledWith(
                    "1"
                )

            })

        }
    )

    test(
        "Botón agregar navega correctamente",
        async () => {

            render(<ProductosPage />)

            const botonAgregar =
                await screen.findByRole(
                    "button",
                    {
                        name: /\+ Agregar/i
                    }
                )

            await userEvent.click(
                botonAgregar
            )

            expect(
                mockNavigate
            ).toHaveBeenCalledWith(
                "/dashboard/categorias/cat1/productos/crear"
            )

        }
    )

})