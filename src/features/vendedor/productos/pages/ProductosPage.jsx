import { useNavigate, useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import useAuthStore from "@/context/useAuthStore"
import ProductosGrid from "../components/ProductosGrid"
import SearchBar from "../../../catalogo/components/SearchBar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

import {
    buttonPrimaryClass,
    buttonOutlineClass
} from "@/utils/styles"

import { FiArrowLeft } from "react-icons/fi"

import { toast } from "react-toastify"

import {
    listarCategoriasActivas
} from "@/features/admin/categorias/services/categoriaService"

import {
    gestionProductos,
    activarProducto,
    desactivarProducto
} from "../services/productoService"

export default function ProductosPage() {

    const navigate = useNavigate()
    const { categoriaId } = useParams()
    const user = useAuthStore((state) => state.user)
    const esVendedor = user?.rol?.toUpperCase() === "VENDEDOR"
    const esCliente = user?.rol?.toUpperCase() === "CLIENTE"
    const [search, setSearch] = useState("")
    const [categoriaNombre, setCategoriaNombre] = useState("Cargando...")
    const [productoSeleccionado, setProductoSeleccionado] = useState(null)
    const [productos, setProductos] = useState([])
    const [estadoActivo, setEstadoActivo] = useState("activos")
    const [page, setPage] = useState(1)
    const [totalPaginas, setTotalPaginas] = useState(1)

    useEffect(() => {

        const cargarCategoria = async () => {
            try {

                const categorias =
                    await listarCategoriasActivas()

                const categoria = categorias.find(
                    (c) => c._id === categoriaId
                )

                if (categoria) {

                    setCategoriaNombre(
                        categoria.nombre
                    )

                } else {

                    setCategoriaNombre(
                        "Categoría"
                    )

                }

            } catch (error) {

                console.error(error)

                setCategoriaNombre(
                    "Categoría"
                )

            }
        }

        if (categoriaId) {

            cargarCategoria()

        }

    }, [categoriaId])

    useEffect(() => {

        setPage(1)

    }, [search, estadoActivo])

    useEffect(() => {

        const cargarProductos = async () => {

            try {

                const params = {

                    categoria: categoriaId,
                    buscar: search,
                    page,
                    limit: 8

                }

                if (estadoActivo !== "todos") {

                    params.estado =
                        estadoActivo === "activos"

                }

                const data =
                    await gestionProductos(params)

                setProductos(data.productos)

                setTotalPaginas(
                    data.totalPaginas
                )

            } catch (error) {

                console.error(error)

            }
        }

        const delay = setTimeout(() => {

            cargarProductos()

        }, 400)

        return () => clearTimeout(delay)

    }, [search, estadoActivo, page, categoriaId])

    const aumentarStock = (id) => {

        setProductos((prev) =>
            prev.map((p) =>
                p._id === id
                    ? {
                        ...p,
                        stock: p.stock + 1
                    }
                    : p
            )
        )
    }

    const disminuirStock = (id) => {

        setProductos((prev) =>
            prev.map((p) =>
                p._id === id &&
                p.stock > 0
                    ? {
                        ...p,
                        stock: p.stock - 1
                    }
                    : p
            )
        )
    }

    const handleEdit = () => {

        navigate(
            `/dashboard/categorias/${categoriaId}/productos/actualizar`
        )
    }

    const handleToggleEstado = (producto) => {

        setProductoSeleccionado(producto)

    }

    const handleCloseModal = () => {

        setProductoSeleccionado(null)

    }

    const handleConfirmEstado = async () => {
        try {
            if (productoSeleccionado.estado) {
                await desactivarProducto(
                    productoSeleccionado._id
                )
                toast.success("Producto desactivado")
            } else {
                await activarProducto(productoSeleccionado._id)
                toast.success("Producto activado")
            }
            const params = {
                categoria: categoriaId,
                buscar: search,
                page,
                limit: 8
            }
            if (estadoActivo !== "todos") {
                params.estado =
                    estadoActivo === "activos"
            }
            const data = await gestionProductos(params)
            setProductos(data.productos)
            setTotalPaginas(
                data.totalPaginas
            )
            handleCloseModal()
        } catch (error) {
            toast.error(error.message)
        }
    }

    return (

        <>
            <div className="p-6 flex flex-col gap-6">

                <div>

                    <p className="text-gray-500">

                        {esVendedor
                            ? "Este módulo te permite gestionar el stock de los productos"
                            : "Este módulo te permite agregar productos al carrito para realizar tu compra"}

                    </p>

                </div>

                <div className="bg-white/60 rounded-2xl p-5 shadow-inner">

                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">

                        <div className="flex items-center gap-3">

                            <Button
                                variant="ghost"
                                onClick={() =>
                                    navigate(
                                        "/dashboard/categorias"
                                    )
                                }
                            >

                                <FiArrowLeft
                                    className="
                                        text-[20px]
                                        font-bold
                                    "
                                />

                            </Button>

                            <h2 className="text-2xl font-bold text-gray-800">

                                Categoría{" "}

                                <span className="text-emerald-700">

                                    {categoriaNombre}

                                </span>

                            </h2>

                        </div>

                        {esVendedor && (

                            <div className="flex flex-wrap items-center justify-start lg:justify-end gap-3">

                                <Button
                                    onClick={() =>
                                        navigate(
                                            `/dashboard/categorias/${categoriaId}/productos/crear`
                                        )
                                    }
                                    className={`${buttonPrimaryClass} whitespace-nowrap sm:w-[150px]`}
                                >
                                    + Agregar
                                </Button>

                            </div>

                        )}

                    </div>

                    <div className="mb-4">

                        <SearchBar
                            search={search}
                            setSearch={setSearch}
                        />

                    </div>

                    {esVendedor && (

                        <div className="flex gap-2 mb-6 flex-wrap">

                            {[
                                {
                                    key: "activos",
                                    label: "Activos"
                                },
                                {
                                    key: "desactivados",
                                    label: "Desactivados"
                                }
                            ].map((estado) => (

                                <Button
                                    key={estado.key}
                                    onClick={() =>
                                        setEstadoActivo(
                                            estado.key
                                        )
                                    }
                                    className={`
                                        px-4 py-2 border transition font-medium

                                        ${estadoActivo === estado.key
                                                    ? "bg-emerald-100 text-emerald-700"
                                                    : "text-gray-600 hover:bg-gray-100"
                                        }
                                    `}
                                >

                                    {estado.label}

                                </Button>

                            ))}

                        </div>

                    )}

                    <ProductosGrid
                        productos={productos}
                        onIncrease={aumentarStock}
                        onDecrease={disminuirStock}
                        onEdit={handleEdit}
                        onToggleEstado={handleToggleEstado}
                        esVendedor={esVendedor}
                        esCliente={esCliente}
                    />

                    <div className="flex justify-center items-center gap-2 mt-6 flex-wrap">

                        {Array.from(
                            { length: totalPaginas },
                            (_, index) => {

                                const numero =
                                    index + 1

                                const activa =
                                    numero === page

                                return (

                                    <button
                                        key={numero}
                                        onClick={() =>
                                            setPage(numero)
                                        }
                                        className={`
                                            min-w-[42px]
                                            h-[42px]
                                            px-3
                                            rounded-xl
                                            border
                                            transition
                                            font-medium

                                            ${activa
                                                    ? "bg-emerald-100 text-emerald-700"
                                                    : "text-gray-600 hover:bg-gray-100"
                                            }
                                        `}
                                    >

                                        {numero}

                                    </button>

                                )
                            }
                        )}

                    </div>

                </div>

            </div>

            {productoSeleccionado && (

                <div className="fixed top-0 left-0 right-0 bottom-0 bg-white/30 backdrop-blur-sm flex items-center justify-center z-50">

                    <Card className="w-full max-w-md p-6 bg-emerald-50 backdrop-blur-xl border border-gray-200 shadow-xl rounded-2xl">

                        <h2 className="text-lg font-bold text-gray-800 mb-2">

                            Confirmar {productoSeleccionado.estado
                                ? "desactivación"
                                : "activación"}

                        </h2>

                        <p className="text-[15px] text-gray-500 mb-4">

                            ¿Está seguro que desea{" "}

                            {productoSeleccionado.estado
                                ? "desactivar"
                                : "activar"}

                            {" "}el producto{" "}

                            <span className="font-semibold text-emerald-800">

                                {productoSeleccionado.nombre}

                            </span>

                            ?

                        </p>

                        <div className="flex justify-end gap-3">

                            <Button
                                variant="ghost"
                                className={`max-w-[100px] py-[22px] ${buttonOutlineClass}`}
                                onClick={handleCloseModal}
                            >
                                Cancelar
                            </Button>

                            <Button
                                onClick={handleConfirmEstado}
                                className={`max-w-[100px] ${buttonPrimaryClass}`}
                            >
                                Aceptar
                            </Button>

                        </div>

                    </Card>

                </div>

            )}

        </>

    )
}