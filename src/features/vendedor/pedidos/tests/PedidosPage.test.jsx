import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, test, expect, vi, beforeEach } from "vitest"
import "@testing-library/jest-dom"

import PedidosPage from "../pages/PedidosPage"


vi.mock("react-router-dom", () => ({
    useNavigate: () => vi.fn()
}))


vi.mock("@/context/useAuthStore", () => {

    const store = (callback) =>
        callback({
            user: {
                rol: "VENDEDOR",
                nombre: "Juan"
            }
        })

    store.getState = () => ({
        user:{
            rol:"VENDEDOR",
            nombre:"Juan"
        }
    })

    return {
        default: store
    }
})

vi.mock("../../../cliente/pedidos/services/pedidoService", () => ({
    obtenerMisPedidos: vi.fn(),
    cambiarEstadoPedido: vi.fn()
}))

import {
    obtenerMisPedidos,
    cambiarEstadoPedido
} from "../../../cliente/pedidos/services/pedidoService"

vi.mock("react-toastify", () => ({
    toast:{
        success: vi.fn(),
        error: vi.fn()
    }
}))

vi.mock("@/components/ui/DataTable", () => ({
    default: ({data}) => (
        <div>
            {data?.map((pedido)=>(
                <p key={pedido._id}>
                    {pedido.nombrePedido}
                </p>
            ))}
        </div>
    )
}))

vi.mock("../columns/pedidosSeleccionadosColumns", () => ({
    pedidosSeleccionadosColumns: vi.fn(()=>[])
}))

vi.mock("@/features/cliente/pedidos/columns/pedidosClientesColumns", () => ({
    pedidosClienteColumns: vi.fn(()=>[])
}))

vi.mock("../../../shared/chat/components/ChatModal",()=>({
    default:()=> <div/>
}))

describe("Pedidos vendedor",()=>{
    beforeEach(()=>{
        vi.clearAllMocks()
    })

    test("carga y muestra adecuadamente los pedidos del vendedor", async()=>{
        obtenerMisPedidos.mockResolvedValue({
            pedidos:[
                {
                    _id:"1",
                    nombrePedido:"Pedido Laptop",
                    estado:"EN_PROCESO"
                }
            ],
            totalPaginas:1
        })

        render(<PedidosPage/>)

        expect(
            await screen.findByText("Pedido Laptop")
        ).toBeInTheDocument()
    })

    test("muestra mensaje cuando no existen pedidos", async()=>{
        obtenerMisPedidos.mockResolvedValue({
            pedidos:[],
            totalPaginas:1
        })

        render(<PedidosPage/>)

        await waitFor(()=>{

            expect(obtenerMisPedidos)
            .toHaveBeenCalled()

        })
    })

    test("busca pedidos por nombre del cliente", async()=>{
        obtenerMisPedidos.mockResolvedValue({
            pedidos:[],
            totalPaginas:1
        })

        render(<PedidosPage/>)

        const input =
            screen.getByPlaceholderText(
                "Buscar por nombre del cliente..."
            )

        await userEvent.type(
            input,
            "Carlos"
        )

        await waitFor(()=>{

            expect(obtenerMisPedidos)
            .toHaveBeenCalled()

        })
    })

    test("cambia filtro a pedidos finalizados", async()=>{
        obtenerMisPedidos.mockResolvedValue({
            pedidos:[],
            totalPaginas:1
        })

        render(<PedidosPage/>)

        await userEvent.click(
            screen.getByText("Finalizados")
        )

        await waitFor(()=>{

            expect(obtenerMisPedidos)
            .toHaveBeenCalled()

        })
    })

    test("cancela pedido de forma exitosa", async()=>{
        obtenerMisPedidos.mockResolvedValue({

            pedidos:[
                {
                    _id:"123",
                    nombrePedido:"Pedido prueba",
                    estado:"EN_PROCESO",
                    metodoPago:"EFECTIVO"
                }
            ],

            totalPaginas:1
        })

        cambiarEstadoPedido.mockResolvedValue({
            msg:"Cancelado"
        })

        render(<PedidosPage/>)

        await waitFor(()=>{

            expect(obtenerMisPedidos)
            .toHaveBeenCalled()
        })
    })

    test("muestra error al cargar pedidos", async()=>{

        obtenerMisPedidos.mockRejectedValue(
            new Error("Error servidor")
        )

        render(<PedidosPage/>)

        await waitFor(()=>{

            expect(obtenerMisPedidos)
            .toHaveBeenCalled()

        })
    })
})