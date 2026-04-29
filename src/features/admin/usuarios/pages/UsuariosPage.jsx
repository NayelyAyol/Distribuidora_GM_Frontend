import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { FiSearch } from "react-icons/fi"
import { Input } from "@/components/ui/input"
import { inputClass } from "@/utils/styles"

import UsuarioTable from "../components/UsuarioTable"

import {
    listarVendedores,
    activarVendedor,
    desactivarVendedor
} from "../services/vendedorService"

import {
    listarClientes,
    activarCliente,
    desactivarCliente
} from "../services/clienteService"

import {
    createColumnHelper
} from "@tanstack/react-table"

import { FiEdit } from "react-icons/fi"

const columnHelper = createColumnHelper()

export default function UsuariosPage() {

    const [vendedores, setVendedores] = useState([])
    const [clientes, setClientes] = useState([])
    const [loading, setLoading] = useState(true)
    const [tab, setTab] = useState("vendedores")

    const fetchVendedores = async () => {
        try {
            const data = await listarVendedores()
            setVendedores(data.vendedores || data)
        } catch (error) {
            toast.error("Error al obtener vendedores")
        }
    }

    const fetchClientes = async () => {
        try {
            const data = await listarClientes()
            setClientes(data.clientes || data)
        } catch (error) {
            toast.error("Error al obtener clientes")
        }
    }

    useEffect(() => {
        const loadData = async () => {
            setLoading(true)
            await Promise.all([fetchVendedores(), fetchClientes()])
            setLoading(false)
        }

        loadData()
    }, [])

    if (loading) {
        return <p className="p-6">Cargando usuarios...</p>
    }

    const vendedorExtraColumns = [
        columnHelper.display({
            id: "acciones",
            header: "Acción",
            cell: ({ row }) => {
                const vendedor = row.original

                return (
                    <div className="flex justify-center">
                        <button className="text-emerald-800 hover:text-emerald-900 flex items-center gap-1">
                            Editar <FiEdit />
                        </button>
                    </div>
                )
            }
        })
    ]

    return (
        <div className="p-6 space-y-6">

            <div>
                <p className="text-gray-500">
                    Este módulo te permite gestionar los usuarios del sistema
                </p>
            </div>

            <div className="bg-white/60 backdrop-blur-xl rounded-2xl border border-white/20 overflow-hidden">

                <div className="flex border-b bg-white">
                    <button
                        onClick={() => setTab("vendedores")}
                        className={`px-6 py-3 text-sm font-medium transition ${tab === "vendedores"
                            ? "bg-emerald-100 text-emerald-800"
                            : "text-gray-600 hover:bg-gray-100"
                            }`}
                    >
                        Vendedores
                    </button>

                    <button
                        onClick={() => setTab("clientes")}
                        className={`px-6 py-3 text-sm font-medium transition ${tab === "clientes"
                            ? "bg-emerald-100 text-emerald-800"
                            : "text-gray-600 hover:bg-gray-100"
                            }`}
                    >
                        Clientes
                    </button>
                </div>

                <div className="p-6 space-y-4">

                    {/* HEADER + SEARCH */}
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                        <div className="
                            flex items-center
                            bg-white
                            rounded-full
                            px-3 py-2
                            w-full md:w-[260px]
                            min-w-0
                            border border-gray-100
                            shadow-sm
                        ">
                            <FiSearch className="text-gray-500 mr-2 flex-shrink-0" />
                            <Input
                                type="text"
                                placeholder="Buscar..."
                                className={`${inputClass} bg-transparent border-0 focus:ring-0`}
                            />
                        </div>

                    </div>

                <div classname="w-full overflow-x-auto">
                    <UsuarioTable
                        data={tab === "vendedores" ? vendedores : clientes}
                        onRefresh={tab === "vendedores" ? fetchVendedores : fetchClientes}
                        extraColumns={tab === "vendedores" ? vendedorExtraColumns : []}
                        onToggleEstado={async (usuario, estado) => {
                            try {
                                const esVendedor = tab === "vendedores"

                                if (esVendedor) {
                                    estado
                                        ? await activarVendedor(usuario._id)
                                        : await desactivarVendedor(usuario._id)
                                } else {
                                    estado
                                        ? await activarCliente(usuario._id)
                                        : await desactivarCliente(usuario._id)
                                }

                                toast.success(
                                    `${esVendedor ? "Vendedor" : "Cliente"} ${estado ? "activado" : "desactivado"
                                    }`
                                )
                            } catch {
                                toast.error("Error al actualizar estado")
                            }
                        }}
                    />
                    </div>
                </div>
            </div>
        </div>
    )
}