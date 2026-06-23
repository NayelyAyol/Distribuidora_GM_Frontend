import { describe, test, expect, beforeEach, vi } from "vitest"
import useVentaStore from "../context/useVentaStore"
import { toast } from "react-toastify"

vi.mock("react-toastify", () => ({
    toast: {
        warning: vi.fn()
    }
}))

describe("Ventas", () => {

    beforeEach(() => {
        useVentaStore.getState().resetVentaCompleta()
        vi.clearAllMocks()
    })

    test("agrega un producto a la factura", () => {

        const producto = {
            id: "1",
            nombre: "Cuaderno",
            stock: 10,
            precioUnitario: 5
        }

        useVentaStore
            .getState()
            .agregarProducto(producto)

        const { factura } =
            useVentaStore.getState()

        expect(factura).toHaveLength(1)

        expect(factura[0]).toMatchObject({
            id: "1",
            nombre: "Cuaderno",
            cantidad: 1
        })

    })

    test("incrementa cantidad cuando el producto ya existe", () => {

        const producto = {
            id: "1",
            nombre: "Cuaderno",
            stock: 10,
            precioUnitario: 5
        }

        useVentaStore
            .getState()
            .agregarProducto(producto)

        useVentaStore
            .getState()
            .agregarProducto(producto)

        const { factura } =
            useVentaStore.getState()

        expect(factura).toHaveLength(1)

        expect(
            factura[0].cantidad
        ).toBe(2)

    })

    test("muestra advertencia cuando el producto no tiene stock", () => {

        const producto = {
            id: "1",
            nombre: "Cuaderno",
            stock: 0,
            precioUnitario: 5
        }

        useVentaStore
            .getState()
            .agregarProducto(producto)

        expect(toast.warning)
            .toHaveBeenCalled()

        expect(
            useVentaStore.getState().factura
        ).toHaveLength(0)

    })

    test("no permite superar el stock disponible", () => {

        const producto = {
            id: "1",
            nombre: "Cuaderno",
            stock: 1,
            precioUnitario: 5
        }

        useVentaStore
            .getState()
            .agregarProducto(producto)

        useVentaStore
            .getState()
            .agregarProducto(producto)

        const { factura } =
            useVentaStore.getState()

        expect(
            factura[0].cantidad
        ).toBe(1)

        expect(toast.warning)
            .toHaveBeenCalled()

    })

    test("elimina un producto de la factura", () => {

        const producto = {
            id: "1",
            nombre: "Cuaderno",
            stock: 10,
            precioUnitario: 5
        }

        useVentaStore
            .getState()
            .agregarProducto(producto)

        useVentaStore
            .getState()
            .eliminarProducto("1")

        expect(
            useVentaStore.getState().factura
        ).toHaveLength(0)

    })

    test("cambia la cantidad respetando el stock", () => {

        useVentaStore.setState({
            factura: [
                {
                    id: "1",
                    nombre: "Cuaderno",
                    cantidad: 1,
                    stock: 5
                }
            ]
        })

        useVentaStore
            .getState()
            .cambiarCantidad("1", 10)

        expect(
            useVentaStore.getState()
                .factura[0]
                .cantidad
        ).toBe(5)

    })

    test("limpia la venta correctamente", () => {

        useVentaStore.setState({
            factura: [
                {
                    id: "1",
                    cantidad: 2
                }
            ],
            metodoPago: "EFECTIVO"
        })

        useVentaStore
            .getState()
            .limpiarVenta()

        const state =
            useVentaStore.getState()

        expect(state.factura)
            .toEqual([])

        expect(state.metodoPago)
            .toBeNull()

    })

})