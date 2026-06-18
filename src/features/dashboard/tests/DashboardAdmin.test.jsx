import { render, screen } from "@testing-library/react"
import { describe, test, expect, vi, beforeEach } from "vitest"
import "@testing-library/jest-dom/vitest"

import DashboardPage from "../pages/DashboardPage"

import {
    obtenerDashboardAdmin,
} from "../services/dashboardService"

const mockNavigate = vi.fn()

vi.mock("../services/dashboardService", () => ({
    obtenerDashboardAdmin: vi.fn(),
    obtenerDashboardVendedor: vi.fn()
}))

vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual("react-router-dom")

    return {
        ...actual,
        useNavigate: () => mockNavigate
    }
})

vi.mock("../../../context/useAuthStore", () => ({
    default: (selector) =>
        selector({
            _hasHydrated: true,
            user: {
                _id: "1",
                rol: "ADMINISTRADOR"
            }
        })
}))

vi.mock("../components/TotalSpentCard", () => ({
    default: () => <div>TotalSpentCard</div>
}))

vi.mock("../components/WeeklyRevenueCard", () => ({
    default: () => <div>WeeklyRevenueCard</div>
}))

vi.mock("../components/PieChartCard", () => ({
    default: () => <div>PieChartCard</div>
}))

describe("Dashboard administrador", () => {

    beforeEach(() => {
        vi.clearAllMocks()
    })

    test("Carga estadísticas del administrador", async () => {

        obtenerDashboardAdmin.mockResolvedValue({
            resumen: {
                ingresosTotales: 1000,
                ingresosMes: 500,
                ingresosHoy: 100,
                quejasPendientes: 2,
                pedidosPendientes: 3,
                totalProductos: 50
            },
            graficas: {
                ventasPorMes: [],
                ventasPorMetodoPago: []
            }
        })

        render(<DashboardPage />)

        expect(
            await screen.findByText("Ingresos Totales")
        ).toBeInTheDocument()

        expect(
            screen.getByText("$1000")
        ).toBeInTheDocument()

        expect(
            obtenerDashboardAdmin
        ).toHaveBeenCalled()
    })

    test("Muestra widgets exclusivos del administrador", async () => {

        obtenerDashboardAdmin.mockResolvedValue({
            resumen: {
                ingresosTotales: 1000,
                ingresosMes: 500,
                ingresosHoy: 100,
                quejasPendientes: 2,
                pedidosPendientes: 3,
                totalProductos: 50
            },
            graficas: {
                ventasPorMes: [],
                ventasPorMetodoPago: []
            }
        })

        render(<DashboardPage />)

        await screen.findByText("Ingresos Totales")

        expect(
            screen.getByText("Quejas Pendientes")
        ).toBeInTheDocument()

        expect(
            screen.getByText("Productos")
        ).toBeInTheDocument()
    })

    test("Renderiza los componentes gráficos del administrador", async () => {

        obtenerDashboardAdmin.mockResolvedValue({
            resumen: {
                ingresosTotales: 1000,
                ingresosMes: 500,
                ingresosHoy: 100,
                quejasPendientes: 2,
                pedidosPendientes: 3,
                totalProductos: 50
            },
            graficas: {
                ventasPorMes: [],
                ventasPorMetodoPago: []
            }
        })

        render(<DashboardPage />)

        await screen.findByText("Ingresos Totales")

        expect(
            screen.getByText("TotalSpentCard")
        ).toBeInTheDocument()

        expect(
            screen.getByText("WeeklyRevenueCard")
        ).toBeInTheDocument()
    })

    test("Muestra mensaje informativo para administrador", async () => {

        obtenerDashboardAdmin.mockResolvedValue({
            resumen: {
                ingresosTotales: 1000,
                ingresosMes: 500,
                ingresosHoy: 100,
                quejasPendientes: 2,
                pedidosPendientes: 3,
                totalProductos: 50
            },
            graficas: {
                ventasPorMes: [],
                ventasPorMetodoPago: []
            }
        })

        render(<DashboardPage />)

        expect(
            await screen.findByText(
                /estadísticas generales del sistema/i
            )
        ).toBeInTheDocument()
    })

})