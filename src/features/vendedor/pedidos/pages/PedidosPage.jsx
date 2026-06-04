import { useState } from "react"
import { FiSearch, FiPlus, FiGrid, FiLayers, FiRefreshCw } from "react-icons/fi"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

import DataTable from "@/components/ui/DataTable"
import { pedidosSeleccionadosColumns } from "../columns/pedidosSeleccionadosColumns"
import { pedidosClienteColumns } from "@/features/cliente/pedidos/columns/pedidosClientesColumns"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import ChatModal from "../../../shared/chat/components/ChatModal" // Importamos el modal refactorizado
import { toast } from "react-toastify"

import { inputClass } from "@/utils/styles"
import useAuthStore from "@/context/useAuthStore"
import { obtenerMisPedidos } from "../../../cliente/pedidos/services/pedidoService"

export default function PedidosPage() {
    const [filtro, setFiltro] = useState("pendientes")
    const [pedidoSeleccionado, setPedidoSeleccionado] = useState(null)
    const [isChatOpen, setIsChatOpen] = useState(false)
    const [pedidos, setPedidos] = useState([])
    const [loading, setLoading] = useState(false)
    const [tipoPedido, setTipoPedido] = useState("") 
    const [busqueda, setBusqueda] = useState("")

    const navigate = useNavigate()
    const user = useAuthStore((state) => state.user)
    const esCliente = user?.rol?.toUpperCase() === "CLIENTE"

    const placeholderTexto = esCliente 
            ? "Buscar por nombre del pedido..." 
            : "Buscar por nombre del cliente...";

    const cargarPedidos = async () => {
        setLoading(true);
        try {
            const estadoMap = {
                pendientes: "PENDIENTE",
                enProceso: "EN_PROCESO",
                finalizados: "FINALIZADO",
                cancelados: "CANCELADO"
            };

            const params = {};
            
            params.estado = estadoMap[filtro] || "PENDIENTE";
            
            if (tipoPedido && tipoPedido !== "") {
                params.tipoPedido = tipoPedido;
            }
            
            if (busqueda && busqueda.trim() !== "") {
                params.buscar = busqueda.trim();
            }

            const query = new URLSearchParams(params).toString();
            const data = await obtenerMisPedidos(query);
            setPedidos(data.pedidos || []);
        } catch (error) {
            toast.error(error.message || "Error al cargar los pedidos");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (!esCliente && filtro === "pendientes") {
                setFiltro("enProceso");
                return;
            }
            cargarPedidos();
        }, 500); 

        return () => clearTimeout(delayDebounceFn);
    }, [filtro, esCliente, tipoPedido, busqueda]);

    const handleAbrirChat = (pedido) => {
        setPedidoSeleccionado(pedido)
        setIsChatOpen(true)
    }

    const handleRealizarPago = (pedido) => {
        const productosDelPedido = pedido.productos || [
            { id: pedido.id, nombre: pedido.nombre, precio: 10.00, cantidad: 1 } 
        ];

        navigate("/dashboard/mis-pedidos/pago", { 
            state: { 
                factura: productosDelPedido, 
                pedidoId: pedido.id,
                esPedidoFoto: pedido.esPedidoFoto || false
            } 
        });
    }

return (
        <div className="p-6 space-y-6">
            <div>
                <p className="text-gray-500">
                    {esCliente
                        ? "Este módulo te permite visualizar tus pedidos realizados"
                        : "Este módulo te permite gestionar los pedidos asignados a tu cargo"}
                </p>
            </div>

            <div className="bg-white/60 backdrop-blur-xl rounded-2xl border border-white/20 overflow-hidden">
                <div className="p-6 space-y-4">
                    
                    <div className="flex flex-wrap items-center gap-3">
                        <div className="flex items-center bg-white rounded-full w-full md:w-[300px] border border-gray-100 shadow-sm">
                            <Input
                                type="text"
                                placeholder={placeholderTexto}
                                value={busqueda}
                                onChange={(e) => setBusqueda(e.target.value)}
                                className={`${inputClass} bg-transparent border-0 focus:ring-0 flex-1 placeholder:text-sm`}
                            />
                            <button className="rounded-full flex items-center justify-center h-12 w-12 px-2 bg-emerald-700/10 hover:bg-emerald-100 text-emerald-800 transition">
                                <FiSearch className="text-emerald-900 text-xl" />
                            </button>
                        </div>



                        <div className="ml-auto flex items-center gap-2">
                            {(busqueda || tipoPedido) && (
                                <Button 
                                    onClick={() => { setBusqueda(""); setTipoPedido(""); }} 
                                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm"
                                >
                                    <FiRefreshCw className="mr-2" /> Limpiar
                                </Button>
                            )}
                            
                            {esCliente && (
                                <Button
                                    onClick={() => navigate("/dashboard/mis-pedidos/nuevo-pedido")}
                                    className="rounded-lg bg-emerald-100 hover:bg-emerald-200 text-emerald-700 text-sm flex items-center transition"
                                >
                                    <FiPlus className="mr-2" /> Nuevo pedido
                                </Button>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-2 pt-2 justify-end">
                        <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-3 py-2 shadow-sm w-full sm:w-40">
                            <FiLayers className="text-gray-400 text-lg" />
                            <select
                                value={tipoPedido}
                                onChange={(e) => setTipoPedido(e.target.value)}
                                className="bg-transparent text-sm text-gray-700 focus:outline-none cursor-pointer w-full"
                            >
                                <option value="">Tipos</option>
                                <option value="FOTO_LISTA">Por Foto</option>
                                <option value="CARRITO">Carrito</option>
                            </select>
                        </div>

                        {esCliente && (
                            <Button onClick={() => setFiltro("pendientes")} className={filtro === "pendientes" ? "bg-emerald-100 text-emerald-700" : "bg-gray-200 text-gray-600"}>
                                Pendientes
                            </Button>
                        )}
                        <Button onClick={() => setFiltro("enProceso")} className={filtro === "enProceso" ? "bg-emerald-100 text-emerald-700" : "bg-gray-200 text-gray-600"}>
                            En Proceso
                        </Button>
                        <Button onClick={() => setFiltro("finalizados")} className={filtro === "finalizados" ? "bg-emerald-100 text-emerald-700" : "bg-gray-200 text-gray-600"}>
                            Finalizados
                        </Button>
                        <Button onClick={() => setFiltro("cancelados")} className={filtro === "cancelados" ? "bg-emerald-100 text-emerald-700" : "bg-gray-200 text-gray-600"}>
                            Cancelados
                        </Button>
                    </div>


                    <div className="w-full overflow-x-auto">
                        <DataTable
                            data={pedidos}
                            columns={
                                esCliente
                                    ? pedidosClienteColumns(
                                        (pedido) => navigate(`/dashboard/mis-pedidos/${pedido._id}`),
                                        handleAbrirChat,
                                        handleRealizarPago
                                    )
                                    : pedidosSeleccionadosColumns(
                                        (pedido) => navigate(`/dashboard/mis-pedidos/${pedido._id}`),
                                        handleAbrirChat,
                                        filtro !== "cancelados"
                                    )
                            }
                        />
                    </div>
                </div>
            </div>
    

            <ChatModal 
                isOpen={isChatOpen}
                onClose={() => setIsChatOpen(false)}
                pedidoId={pedidoSeleccionado?.nombrePedido}
                role={esCliente ? "cliente" : "vendedor"}
                userName={esCliente ? user?.nombre || "Cliente" : "Vendedor"}
                otherUserName={
                    esCliente 
                        ? (pedidoSeleccionado?.vendedor?.perfilId 
                            ? `${pedidoSeleccionado.vendedor.perfilId.nombre} ${pedidoSeleccionado.vendedor.perfilId.apellido}` 
                            : "Vendedor")
                        : (pedidoSeleccionado?.cliente?.perfilId 
                            ? `${pedidoSeleccionado.cliente.perfilId.nombre} ${pedidoSeleccionado.cliente.perfilId.apellido}` 
                            : "Cliente")
                }
            />
        </div>
    
    )
}