import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, test, expect, vi, beforeEach } from "vitest"
import "@testing-library/jest-dom"

import SeleccionMetodoPagoPage from "../pages/SeleccionMetodoPago"

const navigateMock = vi.fn()

const setMetodoPagoMock = vi.fn()
const setFormMock = vi.fn()

vi.mock("react-router-dom", () => ({
    useNavigate: () => navigateMock,
    useLocation: () => ({
        pathname: "/dashboard/mis-pedidos/pago",
        state: {
            checkout: {
                esPedidoFoto: true,
                tipoEntrega: "domicilio",
                carrito: [],
                metodoPago: null,
                pedido: {
                    nombrePedido: "Pedido Cliente",
                    observaciones: "Urgente",
                    datosFacturacion: {
                        nombreCompleto: "Maria Lopez",
                        identificacion: "1234567890",
                        correo: "maria@test.com",
                        telefono: "0999999999"
                    },
                    direccionEntrega: {
                        direccion: "Quito",
                        referencia: "Casa azul"
                    }
                },
                resumenPago: {
                    totalPagar: 50
                }
            }
        }
    })
}))

vi.mock("@stripe/react-stripe-js", () => ({
    useStripe: () => ({
        createPaymentMethod: vi.fn()
    }),
    useElements: () => ({
        getElement: vi.fn()
    }),
    CardElement: () => <div />
}))

vi.mock("react-toastify", () => ({
    toast: {
        success: vi.fn(),
        error: vi.fn()
    }
}))

vi.mock("../../../cliente/pedidos/hooks/usePedidoForm", () => ({
    default: () => ({
        form: {
            nombrePedido: "Pedido Cliente",
            nombreCompleto: "Maria Lopez",
            identificacion: "1234567890",
            correo: "maria@test.com",
            telefono: "0999999999",
            direccion: "Quito",
            referencia: "Casa azul",
            observaciones: "Urgente"
        },
        setForm: setFormMock,
        handleChange: vi.fn(),
        metodoPago: "TRANSFERENCIA",
        setMetodoPago: setMetodoPagoMock
    })
}))

vi.mock("../../../shared/pagos/components/MetodoPagoSelector", () => ({
    default: () => <div>Método Pago</div>
}))

vi.mock("../../../shared/pagos/components/TransferenciaForm", () => ({
    default: () => <div>Transferencia Form</div>
}))

vi.mock("../../../shared/pagos/components/TarjetaForm", () => ({
    default: () => <div>Tarjeta Form</div>
}))

vi.mock("../../../cliente/pedidos/components/PedidoInfoForm", () => ({
    default: () => <div>Pedido Info</div>
}))

vi.mock("../../../cliente/pedidos/components/PedidoDireccionForm", () => ({
    default: () => <div>Dirección Form</div>
}))

vi.mock("../../../cliente/pedidos/components/PedidoDatosForm", () => ({
    default: () => <div>Datos Form</div>
}))

vi.mock("@/features/shared/pagos/components/ResumenPago", () => ({
    default: () => <div>Resumen Pago</div>
}))

vi.mock("@/components/ui/button", () => ({
    Button: ({ children, ...props }) => (
        <button {...props}>{children}</button>
    )
}))

describe("SeleccionMetodoPagoPage cliente", () => {

    beforeEach(() => {
        vi.clearAllMocks()
    })

    test("renderiza correctamente la pantalla", () => {

        render(<SeleccionMetodoPagoPage />)

        expect(
            screen.getByText(/completar los datos de facturación/i)
        ).toBeInTheDocument()
    })

    test("muestra los datos cargados del pedido foto", () => {

        render(<SeleccionMetodoPagoPage />)

        expect(
            screen.getByText("Maria Lopez")
        ).toBeInTheDocument()
    })

    test("muestra componente resumen de pago", () => {

        render(<SeleccionMetodoPagoPage />)

        expect(
            screen.getByText("Resumen Pago")
        ).toBeInTheDocument()
    })

    test("muestra formulario de transferencia", () => {

        render(<SeleccionMetodoPagoPage />)

        expect(
            screen.getByText("Transferencia Form")
        ).toBeInTheDocument()
    })

    test("permite regresar con el boton volver", async () => {

        render(<SeleccionMetodoPagoPage />)

        const botones = screen.getAllByRole("button")

        await userEvent.click(botones[0])

        expect(navigateMock)
            .toHaveBeenCalledWith(-1)
    })

    test("continua al siguiente paso", async () => {

        render(<SeleccionMetodoPagoPage />)

        await userEvent.click(
            screen.getByText("Continuar")
        )

        await waitFor(() => {

            expect(navigateMock)
                .toHaveBeenCalled()

        })
    })

})