import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { FiSearch } from "react-icons/fi"
import { Input } from "@/components/ui/input"
import { inputClass } from "@/utils/styles"
import { Button } from "@/components/ui/button"
import UsuarioTable from "../components/UsuarioTable"

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

    const user = useAuthStore((state) => state.user)
    const rol = user?.perfilId?.rol?.toUpperCase()

    const esVendedor = rol === "VENDEDOR"

    const fetchVendedoresActivos = async () => {
        try {
            const data = await listarVendedoresActivos()
            setVendedores(data.usuarios || data)
        } catch (error) {
            toast.error(error.message)
        }
    }

    const fetchVendedoresInactivos = async () => {
        try {
            const data = await listarVendedoresInactivos()
            setVendedores(data.usuarios || data)
        } catch (error) {
            toast.error(error.message)
        }
    }

    const fetchClientesActivos = async () => {
        try {
            const data = await listarClientesActivos()
            setClientes(data.usuarios || data)
        } catch (error) {
            toast.error(error.message)
        }
    }

    const fetchClientesInactivos = async () => {
        try {
            const data = await listarClientesInactivos()
            setClientes(data.usuarios || data)
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {

        const loadData = async () => {

            setLoading(true)
            setSearch("")
            setFiltro("activos")

            try {

                if (esVendedor) {
                    await fetchClientesActivos()
                } else {

                    if (tab === "vendedores") {
                        await fetchVendedoresActivos()
                    } else {
                        await fetchClientesActivos()
                    }

                }

            } finally {
                setLoading(false)
            }

        }

        loadData()

    }, [tab])

    if (loading) {
        return <p className="p-6">Cargando usuarios...</p>
    }

    const handleBuscar = async () => {

        if (!search.trim()) {

            if (tab === "vendedores") {

                filtro === "activos"
                    ? await fetchVendedoresActivos()
                    : await fetchVendedoresInactivos()

            } else {

                filtro === "activos"
                    ? await fetchClientesActivos()
                    : await fetchClientesInactivos()

            }

            return
        }

        if (search.length !== 10) {
            toast.warning("La cédula debe tener 10 dígitos")
            return
        }

        try {

            if (tab === "vendedores") {

                const data = await buscarVendedor(search)
                setVendedores(data.usuarios || [data])

            } else {

                const data = await buscarCliente(search)
                setClientes(data.usuarios || [data])

            }

        } catch (error) {
            toast.error(error.message)
        }

    }

    const refreshData = async () => {

        if (tab === "vendedores") {

            if (filtro === "activos") {
                await fetchVendedoresActivos()
            } else {
                await fetchVendedoresInactivos()
            }

        } else {

            if (filtro === "activos") {
                await fetchClientesActivos()
            } else {
                await fetchClientesInactivos()
            }

        }

    }

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
                            onClick={() => setTab("vendedores")}
                            className={`px-6 py-3 text-sm font-medium transition ${
                                tab === "vendedores"
                                    ? "bg-emerald-100 text-emerald-800"
                                    : "text-gray-600 hover:bg-gray-100"
                            }`}
                        >
                            Vendedores
                        </button>
                    )}

                    <button
                        type="button"
                        onClick={() => setTab("clientes")}
                        className={`px-6 py-3 text-sm font-medium transition ${
                            tab === "clientes"
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
                                placeholder="Buscar..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value.replace(/\D/g, ""))}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") handleBuscar()
                                }}
                                className={`${inputClass} bg-transparent border-0 focus:ring-0 flex-1`}
                            />

                            <button
                                onClick={handleBuscar}
                                className="rounded-full flex items-center justify-center max-w-[120px] h-12 px-6 bg-emerald-700/10 hover:bg-emerald-100 text-emerald-800 transition"
                            >
                                <FiSearch className="text-emerald-900 text-xl" />
                            </button>

                        </div>

                        <div className="flex flex-wrap gap-3">

                            <Button
                                onClick={async () => {

                                    setFiltro("activos")
                                    setSearch("")

                                    if (tab === "vendedores") {
                                        await fetchVendedoresActivos()
                                    } else {
                                        await fetchClientesActivos()
                                    }

                                }}
                                className={
                                    filtro === "activos"
                                        ? "bg-emerald-100 text-emerald-700"
                                        : "bg-gray-200 text-gray-600"
                                }
                            >
                                Activos
                            </Button>

                            <Button
                                onClick={async () => {

                                    setFiltro("inactivos")
                                    setSearch("")

                                    if (tab === "vendedores") {
                                        await fetchVendedoresInactivos()
                                    } else {
                                        await fetchClientesInactivos()
                                    }

                                }}
                                className={
                                    filtro === "inactivos"
                                        ? "bg-emerald-100 text-emerald-700"
                                        : "bg-gray-200 text-gray-600"
                                }
                            >
                                Inactivos
                            </Button>

                        </div>

                    </div>

                    <div className="w-full overflow-x-auto">

                        <UsuarioTable
                            data={
                                esVendedor
                                    ? clientes.filter(c => c.vendedorId === user._id)
                                    : tab === "vendedores"
                                        ? vendedores
                                        : clientes
                            }
                            onRefresh={refreshData}
                            onToggleEstado={async (usuario, estado) => {

                                try {

                                    const esTabVendedor = tab === "vendedores"

                                    if (esTabVendedor) {

                                        estado
                                            ? await activarVendedor(usuario._id)
                                            : await desactivarVendedor(usuario._id)

                                    } else {

                                        estado
                                            ? await activarCliente(usuario._id)
                                            : await desactivarCliente(usuario._id)

                                    }

                                    await refreshData()

                                    toast.success(
                                        `${esTabVendedor ? "Vendedor" : "Cliente"} ${estado ? "activado" : "desactivado"}`
                                    )

                                } catch (error) {
                                    toast.error(error.message)
                                }

                            }}
                        />

                    </div>

                </div>

            </div>

        </div>
    )
}