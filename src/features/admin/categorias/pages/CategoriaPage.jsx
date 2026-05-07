import { useState, useEffect } from "react"
import { toast } from "react-toastify"

import useAuthStore from "@/context/useAuthStore"

import CategoriaForm from "../components/CategoriaForm"
import CategoriasGrid from "../components/CategoriasGrid"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { buttonPrimaryClass, buttonOutlineClass } from "@/utils/styles"
import { useNavigate } from "react-router-dom"

import { listarCategorias, listarCategoriasInactivas, listarCategoriasActivas } from "../services/categoriaService"

export default function CategoriaPage() {

    const user = useAuthStore((state) => state.user)

    const esVendedor = user?.rol?.toUpperCase() === "VENDEDOR"
    const esAdmin = user?.rol?.toUpperCase() === "ADMINISTRADOR"

    const navigate = useNavigate()

    const [categoryToEdit, setCategoryToEdit] = useState(null)
    const [categoryToDelete, setCategoryToDelete] = useState(null)
    const [loading, setLoading] = useState(false)
    const [filtro, setFiltro] = useState("todos")

    const [data, setData] = useState([])

    const handleOpenDelete = (cat) => {
        setCategoryToDelete(cat)
    }

    const handleCloseDelete = () => {
        setCategoryToDelete(null)
    }

    const handleConfirmDelete = () => {
        toast.success(`Categoría ${categoryToDelete.nombre} eliminada`)
        setCategoryToDelete(null)
    }

    const handleEdit = (cat) => {
        setCategoryToEdit(cat)
    }

    const handleSelectCategory = (cat) => {
        navigate(`/dashboard/categorias/${cat._id}/productos`)
    }

    const fetchCategorias = async () => {
        setLoading(true)
        try {
            const categorias = await listarCategorias()
            setData(categorias)
        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    const fetchCategoriasInactivas = async () => {
        setLoading(true)
        try {
            const categorias = await listarCategoriasInactivas()
            setData(categorias)
        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    const fetchCategoriasActivas = async () => {
        setLoading(true)
        try {
            const categorias = await listarCategoriasActivas()
            setData(categorias)
        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        const loadData = async () => {
            setLoading(true)

            try {

                if (esAdmin) {
                    setFiltro("todos")
                    await fetchCategorias()
                } else {
                    setFiltro("activos")
                    await fetchCategoriasActivas()
                }

            } catch (error) {
                toast.error(error.message)
            } finally {
                setLoading(false)
            }
        }

        loadData()

    }, [])

    return (
        <div className="flex flex-col gap-6 p-6">

            <p className="text-gray-500">
                {esVendedor
                    ? "Este módulo te permite administrar los productos de las diferentes categorías"
                    : "Este módulo te permite administrar las categorías de productos"}
            </p>

            {esAdmin && (
                <CategoriaForm
                    selectedCategory={categoryToEdit}
                    setSelectedCategory={setCategoryToEdit}
                    onSuccess={fetchCategorias}
                />
            )}

            <div className="bg-white/60 rounded-2xl p-4 shadow-inner">

                <div className="flex flex-wrap gap-3 mb-4">

                    <Button
                        onClick={() => {
                            setFiltro("todos")
                            fetchCategorias()
                        }}
                        className={
                            filtro === "todos"
                                ? "bg-emerald-100 text-emerald-700"
                                : "bg-gray-200 text-gray-600"
                        }
                    >
                        Todos
                    </Button>

                    <Button
                        onClick={() => {
                            setFiltro("activos")
                            fetchCategoriasActivas()
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
                        onClick={() => {
                            setFiltro("inactivos")
                            fetchCategoriasInactivas()
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

                <div className="flex-1 max-h-[60vh] overflow-y-auto">

                    {loading ? (
                        <p className="text-center text-gray-400">Cargando...</p>
                    ) : (
                        <CategoriasGrid
                            data={data}
                            onDelete={handleOpenDelete}
                            onEdit={handleEdit}
                            onSelect={handleSelectCategory}
                            esVendedor={esVendedor}
                        />
                    )}

                </div>

            </div>

            {categoryToDelete && (
                <div className="fixed top-0 left-0 right-0 bottom-0 bg-white/30 backdrop-blur-sm flex items-center justify-center z-50">

                    <Card className="w-full max-w-md p-6 bg-emerald-50 backdrop-blur-xl border border-gray-200 shadow-xl rounded-2xl">

                        <h2 className="text-lg font-bold text-gray-800 mb-2">
                            Confirmar eliminación
                        </h2>

                        <p className="text-[15px] text-gray-500 mb-4">
                            ¿Está seguro que desea eliminar la categoría{" "}
                            <span className="font-semibold text-emerald-800">
                                {categoryToDelete.nombre}
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