import { useState, useEffect, useMemo } from "react"
import { FiSearch, FiPlus, FiGrid, FiLayers, FiRefreshCw } from "react-icons/fi"
import { useNavigate } from "react-router-dom"

import DataTable from "@/components/ui/DataTable"
import { pedidosSeleccionadosColumns } from "../columns/pedidosSeleccionadosColumns"
import { pedidosClienteColumns } from "@/features/cliente/pedidos/columns/pedidosClientesColumns"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import ChatModal from "../../../shared/chat/components/ChatModal" // Importamos el modal refactorizado
import { toast } from "react-toastify"

import { inputClass, buttonOutlineClass, buttonPrimaryClass } from "@/utils/styles"
import useAuthStore from "@/context/useAuthStore"
import { obtenerMisPedidos, cambiarEstadoPedido } from "../../../cliente/pedidos/services/pedidoService"
import { createPortal } from "react-dom"

const INTERVALO_POLLING = 10000

export default function PedidosPage() {
    const [filtro, setFiltro] = useState("pendientes")
    const [pedidoSeleccionado, setPedidoSeleccionado] = useState(null)
    const [isChatOpen, setIsChatOpen] = useState(false)
    const [pedidos, setPedidos] = useState([])
    const [loading, setLoading] = useState(false)
    const [tipoPedido, setTipoPedido] = useState("") 
    const [busqueda, setBusqueda] = useState("")
    const [page, setPage] = useState(1)
    const [totalPaginas, setTotalPaginas] = useState(1)
    const [pedidoACancelar, setPedidoACancelar] = useState(null)


    const navigate = useNavigate()
    const user = useAuthStore((state) => state.user)
    const esCliente = user?.rol?.toUpperCase() === "CLIENTE"

    const placeholderTexto = esCliente 
            ? "Buscar por nombre del pedido..." 
            : "Buscar por nombre del cliente...";

    const construirParams = () => {
        const estadoMap = {
            pendientes: "PENDIENTE",
            enProceso: "EN_PROCESO",
            finalizados: "FINALIZADO",
            cancelados: "CANCELADO"
        };

        const params = { page };

        if (filtro === "pagosPendientes") {
            params.estado = "EN_PROCESO";
            params.estadoPago = "PENDIENTE";
        } else {
            params.estado = estadoMap[filtro] || "PENDIENTE";
        }

        if (tipoPedido && tipoPedido !== "") params.tipoPedido = tipoPedido;
        if (busqueda && busqueda.trim() !== "") params.buscar = busqueda.trim();

        return params;
    };

    const cargarPedidos = async () => {
        setLoading(true);
        try {
            const params = construirParams();
            const query = new URLSearchParams(params).toString();
            const data = await obtenerMisPedidos(query);
            setPedidos(data.pedidos || []);
            setTotalPaginas(data.totalPaginas || 1);

        } catch (error) {
            toast.error(error.message || "Error al cargar los pedidos");
        } finally {
            setLoading(false);
        }
    };

    const cargarPedidosSilencioso = async () => {
        try {
            const params = construirParams();
            const query = new URLSearchParams(params).toString();
            const data = await obtenerMisPedidos(query);
            setPedidos(data.pedidos || []);
            setTotalPaginas(data.totalPaginas || 1);
        } catch (error) {
            console.error("Error en refresco automático:", error);
        }
    };

    useEffect(() => {
        if (!esCliente && filtro === "pendientes") {
            setFiltro("enProceso");
        }
    }, [esCliente, filtro]);

    useEffect(() => {
        setPage(1)
    }, [filtro, tipoPedido, busqueda]);

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (!esCliente && filtro === "pendientes") {
                setFiltro("enProceso");
                return;
            }
            cargarPedidos();
        }, 500); 

        return () => clearTimeout(delayDebounceFn);
    }, [filtro, esCliente, tipoPedido, busqueda, page]);

    useEffect(() => {
        const intervalo = setInterval(() => {
            if (
                document.visibilityState === "visible" &&
                !isChatOpen &&
                !pedidoACancelar
            ) {
                cargarPedidosSilencioso();
            }
        }, INTERVALO_POLLING);

        return () => clearInterval(intervalo);
    }, [filtro, esCliente, tipoPedido, busqueda, page, isChatOpen, pedidoACancelar]);

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

    const handleCancelar = (pedido) => setPedidoACancelar(pedido)

    const handleConfirmarCancelacion = async () => {
        try {
            setLoading(true)
            const data = await cambiarEstadoPedido(pedidoACancelar._id, "CANCELADO")
            toast.success(data.msg || "Pedido cancelado correctamente")
            setPedidoACancelar(null)
            cargarPedidos()
        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    const columns = useMemo(() =>
        esCliente
            ? pedidosClienteColumns(
                (pedido) => navigate(`/dashboard/mis-pedidos/${pedido._id}`),
                handleAbrirChat,
                handleRealizarPago,
                handleCancelar
            )
            : pedidosSeleccionadosColumns(
                (pedido) => navigate(`/dashboard/mis-pedidos/${pedido._id}`),
                handleAbrirChat,
                filtro !== "cancelados",
                handleCancelar
            ),
    [esCliente, filtro])

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
                                aria-label="Buscar"
                                onChange={(e) => {
                                    const value = e.target.value;
                                    if (!/^[\p{L}\p{N}\s]*$/u.test(value)) return;
                                    if (value.length > 100) return;
                                    setBusqueda(value);
                                }}
                                maxLength={100}
                                className={`${inputClass} bg-transparent border-0 focus:ring-0 flex-1 placeholder:text-sm`}
                            />
                            <button className="rounded-full flex items-center justify-center h-12 w-12 px-2 bg-emerald-700/10 hover:bg-emerald-100 text-emerald-800 transition">
                                <FiSearch className="text-emerald-900 text-xl" />
                            </button>
                        </div>



                        <div className="ml-auto flex items-center gap-2">
                            {(busqueda || tipoPedido) && (
                                <Button 
                                    aria-label="Refrescar"
                                    onClick={() => { setBusqueda(""); setTipoPedido(""); }} 
                                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm"
                                >
                                    <FiRefreshCw className="mr-2" /> Limpiar
                                </Button>
                            )}
                            
                            {esCliente && (
                                <Button
                                    aria-label="Agregar"
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
                        <Button 
                            onClick={() => setFiltro("pagosPendientes")} 
                            className={filtro === "pagosPendientes" ? "bg-emerald-100 text-emerald-700": "bg-gray-200 text-gray-600"}
                        >
                            Pago Pendiente
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
                            columns={columns}
                        />
                    </div>
                    <div className="flex justify-center items-center gap-2 mt-4 flex-wrap">
                        {Array.from({ length: totalPaginas }, (_, index) => {
                            const numero = index + 1
                            const activa = numero === page
                            return (
                                <button
                                    key={numero}
                                    onClick={() => setPage(numero)}
                                    className={`min-w-[40px] h-[40px] px-3 rounded-xl border transition font-medium
                                        ${activa
                                            ? "bg-emerald-100 text-emerald-700 border-emerald-300"
                                            : "text-gray-600 hover:bg-gray-100 border-gray-200"
                                        }`}
                                >
                                    {numero}
                                </button>
                            )
                        })}
                    </div>
                </div>
            </div>
    

            <ChatModal 
                isOpen={isChatOpen}
                onClose={() => setIsChatOpen(false)}
                pedidoId={pedidoSeleccionado?._id}
                otherUserId={                                             
                    esCliente
                        ? pedidoSeleccionado?.vendedor?._id
                        : pedidoSeleccionado?.cliente?._id
                }
                otherUserName={
                    esCliente 
                        ? (pedidoSeleccionado?.vendedor?.perfilId 
                            ? `${pedidoSeleccionado.vendedor.perfilId.nombre} ${pedidoSeleccionado.vendedor.perfilId.apellido}` 
                            : "Vendedor")
                        : (pedidoSeleccionado?.cliente?.perfilId 
                            ? `${pedidoSeleccionado.datosFacturacion?.nombreCompleto}` 
                            : "Cliente")
                }
                pedidoNombre={pedidoSeleccionado?.nombrePedido}
            />
{pedidoACancelar && createPortal(
                <div className="fixed top-0 left-0 right-0 bottom-0 bg-white/30 backdrop-blur-sm flex items-center justify-center z-50">
                    <Card className="w-full max-w-md p-6 bg-emerald-50 backdrop-blur-xl border border-gray-200 shadow-xl rounded-2xl">
                        <h2 className="text-lg font-bold text-gray-800 mb-2">Confirmar cancelación</h2>
                        <p className="text-[15px] text-gray-500 mb-6">
                            ¿Estás seguro de que deseas cancelar el pedido "{pedidoACancelar?.nombrePedido || "este pedido"}"?
                        </p>
                        <div className="flex justify-end gap-3">
                            <Button
                                variant="ghost"
                                className={`max-w-[100px] py-[22px] ${buttonOutlineClass}`}
                                onClick={() => setPedidoACancelar(null)}
                            >
                                Cancelar
                            </Button>
                            <Button
                                onClick={handleConfirmarCancelacion}
                                disabled={loading}
                                className={`max-w-[100px] ${buttonPrimaryClass}`}
                            >
                                Aceptar
                            </Button>
                        </div>
                    </Card>
                </div>,
                document.body
            )}
        </div>
    
    )
}