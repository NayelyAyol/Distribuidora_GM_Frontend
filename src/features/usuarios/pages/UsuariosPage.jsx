import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { FiSearch } from "react-icons/fi"
import { Input } from "@/components/ui/input"
import { inputClass, buttonOutlineClass, buttonPrimaryClass } from "@/utils/styles"
import { Button } from "@/components/ui/button"
import DataTable from "@/components/ui/DataTable"
import { usuarioColumns } from "../columns/usuarioColumns"
import { Card } from "@/components/ui/card"
import { createPortal } from "react-dom";

import {
    activarVendedor,
    desactivarVendedor,
    buscarVendedor,
    listarVendedoresActivos,
    listarVendedoresInactivos
} from "../services/vendedorService"

import {
    activarCliente,
    desactivarCliente,
    buscarCliente,
    listarClientesActivos,
    listarClientesInactivos
} from "../services/clienteService"

import useAuthStore from "../../../context/useAuthStore"

export default function UsuariosPage() {

    const [vendedores, setVendedores] = useState([])
    const [clientes, setClientes] = useState([])
    const [loading, setLoading] = useState(true)
    const [tab, setTab] = useState("vendedores")
    const [search, setSearch] = useState("")
    const [filtro, setFiltro] = useState("activos")
    const [userToToggle, setUserToToggle] = useState(null)

    const [page, setPage] = useState(1)
    const [totalPaginas, setTotalPaginas] = useState(1)
    const LIMITE = 15

    const user = useAuthStore((state) => state.user)
    const rol = user?.perfilId?.rol?.toUpperCase()
    const esVendedor = rol === "VENDEDOR"

    const fetchVendedoresActivos = async (pagina = 1) => {
        const data = await listarVendedoresActivos({ page: pagina, limit: LIMITE })
        setVendedores(data.usuarios || data)
        setTotalPaginas(data.totalPaginas || 1)
    }

    const fetchVendedoresInactivos = async (pagina = 1) => {
        const data = await listarVendedoresInactivos({ page: pagina, limit: LIMITE })
        setVendedores(data.usuarios || data)
        setTotalPaginas(data.totalPaginas || 1)
    }

    const fetchClientesActivos = async (pagina = 1) => {
        const data = await listarClientesActivos({ page: pagina, limit: LIMITE })
        setClientes(data.usuarios || data)
        setTotalPaginas(data.totalPaginas || 1)
    }

    const fetchClientesInactivos = async (pagina = 1) => {
        const data = await listarClientesInactivos({ page: pagina, limit: LIMITE })
        setClientes(data.usuarios || data)
        setTotalPaginas(data.totalPaginas || 1)
    }

    useEffect(() => {
        const loadData = async () => {
            setLoading(true)
            try {
                if (esVendedor) {
                    await fetchClientesActivos(page)
                } else if (tab === "vendedores") {
                    filtro === "activos"
                        ? await fetchVendedoresActivos(page)
                        : await fetchVendedoresInactivos(page)
                } else {
                    filtro === "activos"
                        ? await fetchClientesActivos(page)
                        : await fetchClientesInactivos(page)
                }
            } catch (error) {
                toast.error(error.message)
            } finally {
                setLoading(false)
            }
        }

        loadData()
    }, [tab, filtro, page, esVendedor])

    const handleTabChange = (nuevaTab) => {
        setTab(nuevaTab)
        setSearch("")
        setPage(1)
    }

    const handleFiltroChange = async (nuevoFiltro) => {
        setFiltro(nuevoFiltro)
        setSearch("")
        setPage(1)
    }

    const handleBuscar = async () => {
        if (!search.trim()) {
            setSearch("")
            setPage(1)
            return
        }

        if (search.length !== 10) {
            toast.warning("La cédula debe tener 10 dígitos")
            return
        }

        try {
            setLoading(true)
            if (tab === "vendedores") {
                const data = await buscarVendedor(search)
                const resultados = data.usuarios || (data ? [data] : [])
                if (resultados.length === 0) toast.info("No se encontró el vendedor")
                setVendedores(resultados)
                setTotalPaginas(1) 
            } else {
                const data = await buscarCliente(search)
                const resultados = data.usuarios || (data ? [data] : [])
                if (resultados.length === 0) toast.info("No se encontró el cliente")
                setClientes(resultados)
                setTotalPaginas(1)
            }
        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    const handleCloseToggle = () => setUserToToggle(null)

    const handleConfirmToggle = async () => {
        try {
            const esTabVendedor = tab === "vendedores"
            const esActivo = userToToggle.estado

            if (esTabVendedor) {
                esActivo ? await desactivarVendedor(userToToggle._id) : await activarVendedor(userToToggle._id)
            } else {
                esActivo ? await desactivarCliente(userToToggle._id) : await activarCliente(userToToggle._id)
            }

            toast.success(`Usuario ${esActivo ? "desactivado" : "activado"} correctamente`)
            await refreshData()
            handleCloseToggle()
        } catch (error) {
            toast.error(error.message)
        }
    }

    const refreshData = async () => {
        if (tab === "vendedores") {
            filtro === "activos"
                ? await fetchVendedoresActivos(page)
                : await fetchVendedoresInactivos(page)
        } else {
            filtro === "activos"
                ? await fetchClientesActivos(page)
                : await fetchClientesInactivos(page)
        }
    }

    if (loading) return <p className="p-6">Cargando usuarios...</p>

    return (
        <div className="p-6 space-y-6">

            <div>
                <p className="text-gray-500">
                    Este módulo te permite gestionar los usuarios del sistema
                </p>
            </div>

            <div className="bg-white/60 backdrop-blur-xl rounded-2xl border border-white/20 overflow-hidden">

                <div className="flex border-b bg-white">
                    {!esVendedor && (
                        <button
                            type="button"
                            onClick={() => handleTabChange("vendedores")}
                            className={`px-6 py-3 text-sm font-medium transition ${tab === "vendedores"
                                ? "bg-emerald-100 text-emerald-800"
                                : "text-gray-600 hover:bg-gray-100"
                                }`}
                        >
                            Vendedores
                        </button>
                    )}
                    <button
                        type="button"
                        onClick={() => handleTabChange("clientes")}
                        className={`px-6 py-3 text-sm font-medium transition ${tab === "clientes"
                            ? "bg-emerald-100 text-emerald-800"
                            : "text-gray-600 hover:bg-gray-100"
                            }`}
                    >
                        {esVendedor ? "Mis Clientes" : "Clientes"}
                    </button>
                </div>

                <div className="p-6 space-y-4">

                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 px-5">

                        <div className="flex items-center bg-white rounded-full w-full md:w-[260px] border border-gray-100 shadow-sm">
                            <Input
                                type="text"
                                placeholder="Buscar por cédula..."
                                maxLength={10}
                                value={search}
                                onChange={(e) => setSearch(e.target.value.replace(/\D/g, ""))}
                                onKeyDown={(e) => { if (e.key === "Enter") handleBuscar() }}
                                className={`${inputClass} bg-transparent border-0 focus:ring-0 flex-1 placeholder:text-sm`}
                            />
                            <button
                                onClick={handleBuscar}
                                disabled={loading}
                                className={`rounded-full flex items-center justify-center max-w-[120px] h-12 px-6 bg-emerald-700/10 hover:bg-emerald-100 text-emerald-800 transition ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                            >
                                <FiSearch className="text-emerald-900 text-xl" />
                            </button>
                        </div>

                        <div className="flex flex-wrap gap-3">
                            <Button
                                onClick={() => handleFiltroChange("activos")}
                                className={filtro === "activos" ? "bg-emerald-100 text-emerald-700" : "bg-gray-200 text-gray-600"}
                            >
                                Activos
                            </Button>
                            <Button
                                onClick={() => handleFiltroChange("inactivos")}
                                className={filtro === "inactivos" ? "bg-emerald-100 text-emerald-700" : "bg-gray-200 text-gray-600"}
                            >
                                Inactivos
                            </Button>
                        </div>

                    </div>

                    <div className="w-full overflow-x-auto">
                        <DataTable
                            data={
                                esVendedor
                                    ? clientes.filter(c => c.vendedorId === user._id)
                                    : tab === "vendedores"
                                        ? vendedores
                                        : clientes
                            }
                            columns={usuarioColumns(refreshData, (usuario) => setUserToToggle(usuario))}
                        />
                    </div>

                        <div className="flex justify-center items-center gap-2 p-4 flex-wrap">
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

            {userToToggle && createPortal(
                <div className="fixed top-0 left-0 right-0 bottom-0 bg-white/30 backdrop-blur-sm flex items-center justify-center z-50">
                    <Card className="w-full max-w-md p-6 bg-emerald-50 backdrop-blur-xl border border-gray-200 shadow-xl rounded-2xl">
                        <h2 className="text-lg font-bold text-gray-800 mb-2">
                            Confirmar {userToToggle.estado ? "desactivación" : "activación"}
                        </h2>
                        <p className="text-[15px] text-gray-500 mb-4">
                            ¿Está seguro que desea {userToToggle.estado ? "desactivar" : "activar"} al usuario{" "}
                            <span className="font-semibold text-emerald-800">
                                {userToToggle.perfilId?.nombre} {userToToggle.perfilId?.apellido}
                            </span>?
                        </p>
                        <div className="flex justify-end gap-3">
                            <Button
                                variant="ghost"
                                className={`max-w-[100px] py-[22px] ${buttonOutlineClass}`}
                                onClick={handleCloseToggle}
                            >
                                Cancelar
                            </Button>
                            <Button
                                onClick={handleConfirmToggle}
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