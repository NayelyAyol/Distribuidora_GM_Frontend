import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, test, expect, vi, beforeEach } from "vitest"
import "@testing-library/jest-dom/vitest"

import CatalogoPage from "../pages/CatalogoPage"

import { Explorar } from "../services/catalogoService"
import { agregarAlCarrito } from "@/features/cliente/carrito/services/carritoService"
import { toast } from "react-toastify"

const mockNavigate = vi.fn()

vi.mock("react-router-dom", () => ({
    useNavigate: () => mockNavigate
}))

vi.mock("@/context/useAuthStore", () => ({
    default: vi.fn()
}))

import useAuthStore from "@/context/useAuthStore"

vi.mock("../services/catalogoService", () => ({
    Explorar: vi.fn()
}))

vi.mock(
    "@/features/cliente/carrito/services/carritoService",
    () => ({
        agregarAlCarrito: vi.fn()
    })
)

vi.mock("react-toastify", () => ({
    toast: {
        success: vi.fn(),
        error: vi.fn()
    }
}))

vi.mock("../components/SearchBar", () => ({
    default: () => (
        <div>SearchBar Mock</div>
    )
}))

vi.mock("../components/Filtros", () => ({
    default: () => (
        <div>Filtros Mock</div>
    )
}))

vi.mock("../components/MejoresProductos", () => ({
    default: ({ onAddCart }) => (
        <button
            onClick={() =>
                onAddCart({
                    productoId: "1",
                    cantidad: 1
                })
            }
        >
            Agregar Destacado
        </button>
    )
}))

vi.mock(
    "../../vendedor/productos/components/ProductosGrid",
    () => ({
        default: ({ productos }) => (
            <div>
                {productos.map((p) => (
                    <div key={p._id}>
                        {p.nombre}
                    </div>
                ))}
            </div>
        )
    })
)

describe("CatalogoPage", () => {

    beforeEach(() => {

        vi.clearAllMocks()

        useAuthStore.mockImplementation(
            (selector) =>
                selector({
                    user: null
                })
        )
    })

    test("llama a Explorar al cargar", async () => {

        Explorar.mockResolvedValue({
            productos: [],
            totalPaginas: 1
        })

        render(<CatalogoPage />)

        await waitFor(() => {

            expect(Explorar)
                .toHaveBeenCalled()
        })
    })

    test("muestra mensaje cuando no existen productos", async () => {

        Explorar.mockResolvedValue({
            productos: [],
            totalPaginas: 1
        })

        render(<CatalogoPage />)

        expect(
            await screen.findByText(
                /no se encontraron productos/i
            )
        ).toBeInTheDocument()
    })

    test("muestra productos obtenidos desde el servicio", async () => {

        Explorar.mockResolvedValue({
            productos: [
                {
                    _id: "1",
                    nombre: "Leche Toni",
                    destacado: true
                },
                {
                    _id: "2",
                    nombre: "Yogurt Toni",
                    destacado: false
                }
            ],
            totalPaginas: 1
        })

        render(<CatalogoPage />)

        expect(
            await screen.findByText(
                /leche toni/i
            )
        ).toBeInTheDocument()

        expect(
            screen.getByText(
                /yogurt toni/i
            )
        ).toBeInTheDocument()
    })

    test("muestra toast cuando falla explorar", async () => {

        Explorar.mockRejectedValue(
            new Error("Error catálogo")
        )

        render(<CatalogoPage />)

        await waitFor(() => {

            expect(toast.error)
                .toHaveBeenCalledWith(
                    "Error catálogo"
                )
        })
    })

    test("redirecciona al registro cuando no existe usuario y agrega al carrito", async () => {

        const user = userEvent.setup()

        Explorar.mockResolvedValue({
            productos: [
                {
                    _id: "1",
                    nombre: "Producto",
                    destacado: true
                }
            ],
            totalPaginas: 1
        })

        render(<CatalogoPage />)

        await user.click(
            await screen.findByRole(
                "button",
                {
                    name: /agregar destacado/i
                }
            )
        )

        expect(mockNavigate)
            .toHaveBeenCalledWith(
                "/registro"
            )
    })

    test("agrega producto al carrito cuando existe usuario", async () => {

        const user = userEvent.setup()

        useAuthStore.mockImplementation(
            (selector) =>
                selector({
                    user: {
                        _id: "123"
                    }
                })
        )

        Explorar.mockResolvedValue({
            productos: [
                {
                    _id: "1",
                    nombre: "Producto",
                    destacado: true
                }
            ],
            totalPaginas: 1
        })

        agregarAlCarrito.mockResolvedValue({
            msg: "Producto agregado"
        })

        render(<CatalogoPage />)

        await user.click(
            await screen.findByRole(
                "button",
                {
                    name: /agregar destacado/i
                }
            )
        )

        await waitFor(() => {

            expect(
                agregarAlCarrito
            ).toHaveBeenCalledWith(
                "1",
                1
            )

            expect(toast.success)
                .toHaveBeenCalledWith(
                    "Producto agregado"
                )
        })
    })

})