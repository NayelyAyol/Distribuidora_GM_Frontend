import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { FiSearch, FiTrash2 } from "react-icons/fi"
import { Input } from "@/components/ui/input"
import { inputClass } from "@/utils/styles"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { buttonPrimaryClass, buttonOutlineClass } from "@/utils/styles"
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
    const [selectedUser, setSelectedUser] = useState(null)

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


    const handleCloseDelete = () => {
        setSelectedUser(null)
    }

    const handleConfirmDelete = () => {
        toast.success(`Usuario ${selectedUser?.nombre || selectedUser?.email} eliminado`)
        setSelectedUser(null)
    }

    const vendedorExtraColumns = [
        columnHelper.display({
            id: "acciones",
            header: "Acciones",
            cell: ({ row }) => {
                const vendedor = row.original

                return (
                    <div className="flex justify-center gap-3">
                        <button className="text-emerald-800 hover:text-emerald-900 flex items-center gap-1">
                            <FiEdit />
                        </button>

                        <button
                            onClick={() => {
                                setSelectedUser(vendedor)
                            }}
                            className="text-red-600 hover:text-red-800 flex items-center gap-1"
                        >
                            <FiTrash2/>
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

                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 px-5">

                        <div className="flex items-center bg-white rounded-full px-6 py-2 w-full md:w-[260px] border border-gray-100 shadow-sm">
                            <FiSearch className="text-gray-500 mr-2 flex-shrink-0" />
                            <Input
                                type="text"
                                placeholder="Buscar..."
                                className={`${inputClass} bg-transparent border-0 focus:ring-0`}
                            />
                        </div>

                    </div>

                    <div className="w-full overflow-x-auto">

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
                                        `${esVendedor ? "Vendedor" : "Cliente"} ${estado ? "activado" : "desactivado"}`
                                    )
                                } catch {
                                    toast.error("Error al actualizar estado")
                                }
                            }}
                        />

                    </div>

                </div>

            </div>

            {selectedUser && (
                <div className="fixed top-0 left-0 right-0 bottom-0 bg-white/30 backdrop-blur-sm flex items-center justify-center z-50">

                    <Card className="w-full max-w-md p-6 bg-emerald-50 backdrop-blur-xl border border-gray-200 shadow-xl rounded-2xl">

                        <h2 className="text-lg font-bold text-gray-800 mb-2">
                            Confirmar eliminación
                        </h2>

                        <p className="text-[15px] text-gray-500 mb-4 text-justify break-words">
                            ¿Está seguro que desea eliminar el usuario{" "}
                            <span className="font-semibold text-emerald-800">
                                {selectedUser.nombre || selectedUser.email}
                            </span>
                            ?
                        </p>

                        <div className="flex justify-end gap-3">

                            <Button
                                variant="ghost"
                                className={`max-w-[100px] py-[22px] ${buttonOutlineClass}`}
                                onClick={handleCloseDelete}
                            >
                                Cancelar
                            </Button>

                            <Button
                                onClick={handleConfirmDelete}
                                className={`max-w-[100px] ${buttonPrimaryClass}`}
                            >
                                Eliminar
                            </Button>

                        </div>

                    </Card>

                </div>
            )}

        </div>
    )
}