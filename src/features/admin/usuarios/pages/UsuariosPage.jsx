import { useEffect, useState } from "react"
import { toast } from "react-toastify"

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

    // =========================
    // FETCH VENDEDORES
    // =========================
    const fetchVendedores = async () => {
        try {
            const data = await listarVendedores()
            setVendedores(data.vendedores || data)
        } catch (error) {
            toast.error("Error al obtener vendedores")
        }
    }

    // =========================
    // FETCH CLIENTES
    // =========================
    const fetchClientes = async () => {
        try {
            const data = await listarClientes()
            setClientes(data.clientes || data)
        } catch (error) {
            toast.error("Error al obtener clientes")
        }
    }

    // =========================
    // LOAD INICIAL
    // =========================
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

    // =========================
    // COLUMNAS EXTRA VENDEDORES
    // =========================
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
        <div className="space-y-10">

            <div className="bg-white/60 backdrop-blur-xl p-6 rounded-2xl border border-white/20">
                
                <h2 className="text-xl font-bold mb-4">
                    Vendedores
                </h2>

                <UsuarioTable
                    data={vendedores}
                    onRefresh={fetchVendedores}
                    extraColumns={vendedorExtraColumns}
                    onToggleEstado={async (vendedor, estado) => {
                        try {
                            if (estado) {
                                await activarVendedor(vendedor._id)
                                toast.success("Vendedor activado")
                            } else {
                                await desactivarVendedor(vendedor._id)
                                toast.success("Vendedor desactivado")
                            }
                        } catch {
                            toast.error("Error al actualizar estado")
                        }
                    }}
                />
            </div>

            <div className="bg-white/60 backdrop-blur-xl p-6 rounded-2xl border border-white/20">

                <h2 className="text-xl font-bold mb-4">
                    Clientes
                </h2>

                <UsuarioTable
                    data={clientes}
                    onRefresh={fetchClientes}
                    onToggleEstado={async (cliente, estado) => {
                        try {
                            if (estado) {
                                await activarCliente(cliente._id)
                                toast.success("Cliente activado")
                            } else {
                                await desactivarCliente(cliente._id)
                                toast.success("Cliente desactivado")
                            }
                        } catch {
                            toast.error("Error al actualizar estado")
                        }
                    }}
                />
            </div>

        </div>
    )
}