import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, test, expect, vi, beforeEach } from "vitest"
import "@testing-library/jest-dom/vitest"

import ProductosRecomendados from "../ProductosRecomendados"

import { obtenerRecomendacionesIA } from "../services/recoIAService"

import { agregarAlCarrito } 
from "@/features/cliente/carrito/services/carritoService"

import useAuthStore from "@/context/useAuthStore"


const navigateMock = vi.fn()

vi.mock("react-router-dom", () => ({
    useNavigate: () => navigateMock
}))

vi.mock("../services/recoIAService", () => ({
    obtenerRecomendacionesIA: vi.fn()
}))

vi.mock("@/context/useAuthStore", () => ({
    default: vi.fn((selector) => 
        selector({
            user:null
        })
    )
}))

vi.mock("@/features/cliente/carrito/services/carritoService", () => ({
    agregarAlCarrito: vi.fn()
}))

vi.mock("../shared/components/BaseCard", () => ({
    default: ({title, description, price, children, onClick}) => (
        <div onClick={onClick}>

            <h3>
                {title}
            </h3>

            <p>
                {description}
            </p>

            <p>
                {price}
            </p>


            {children}

        </div>
    )
}))

vi.mock("react-toastify", () => ({

    toast: {
        success: vi.fn(),
        error: vi.fn()
    }

}))


describe("ProductosRecomendados", () => {

    const productosMock = [
        {
            _id: "1",
            nombre: "Mouse Gamer",
            descripcion: "Mouse RGB",
            precioVenta: 25,
            imagen: "imagen.png",
            motivo: "Producto recomendado"
        }
    ]

    beforeEach(() => {

        vi.clearAllMocks()

    })

    test("Renderiza productos recomendados correctamente", async () => {
        useAuthStore.mockReturnValue({
            user: {
                nombre: "Juan"
            }
        })

        obtenerRecomendacionesIA.mockResolvedValue({
            titulo: "Recomendados para ti",
            recomendaciones: productosMock
        })

        render(
            <ProductosRecomendados productoId="10"/>
        )

        expect(

            await screen.findByText(
                "Recomendados para ti"
            )

        ).toBeInTheDocument()

        expect(
            screen.getByText(
                "Mouse Gamer"
            )
        ).toBeInTheDocument()

        expect(

            screen.getByText(
                "Producto recomendado"
            )

        ).toBeInTheDocument()

    })

    test("Muestra mensaje cuando no existen recomendaciones", async () => {
        obtenerRecomendacionesIA.mockResolvedValue({

            recomendaciones: []

        })

        render(
            <ProductosRecomendados productoId="10"/>
        )

        expect(
            await screen.findByText(
                "Por el momento no tenemos recomendaciones para ti"
            )
        ).toBeInTheDocument()

    })

    test("Muestra loading mientras carga recomendaciones", () => {
        obtenerRecomendacionesIA.mockImplementation(
            () => new Promise(() => {})
        )

        render(
            <ProductosRecomendados productoId="10"/>
        )

        expect(

            screen.getByText(
                "Productos que te pueden interesar"
            )
        ).toBeInTheDocument()

    })

test("Usuario no autenticado redirige a registro al agregar carrito", async()=>{

    const user = userEvent.setup()


    useAuthStore.mockImplementation(
        (selector)=>
            selector({
                user:null
            })
    )


    obtenerRecomendacionesIA.mockResolvedValue({

        recomendaciones: productosMock

    })


    render(
        <ProductosRecomendados productoId="10"/>
    )


    const botonCarrito =
        await screen.findByRole(
            "button"
        )


    await user.click(
        botonCarrito
    )


    await waitFor(()=>{

        expect(
            navigateMock
        ).toHaveBeenCalledWith(
            "/registro"
        )

    })

})

    test("Usuario autenticado agrega producto al carrito", async () => {

        const user = userEvent.setup()

        useAuthStore.mockReturnValue({

            user: {
                nombre: "Juan"
            }

        })

        obtenerRecomendacionesIA.mockResolvedValue({
            recomendaciones: productosMock
        })

        agregarAlCarrito.mockResolvedValue({
            msg: "Producto agregado"
        })

        render(
            <ProductosRecomendados productoId="10"/>
        )

        const boton =

        await screen.findByRole(
            "button"
        )

        await user.click(boton)

        await waitFor(() => {
            expect(
                agregarAlCarrito
            ).toHaveBeenCalledWith(
                "1",
                1
            )
        })
    })
})