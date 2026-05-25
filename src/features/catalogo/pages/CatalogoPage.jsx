import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import ProductosGrid from "../../vendedor/productos/components/ProductosGrid"

import SearchBar from "../components/SearchBar"
import Filtros from "../components/Filtros"
import MejoresProductos from "../components/MejoresProductos"

import useAuthStore from "@/context/useAuthStore"
import { Catalogo, Explorar } from "../services/catalogoService"

import { toast } from "react-toastify"

export default function CatalogoPage() {

    const navigate = useNavigate()

    const user = useAuthStore((state) => state.user)

    const basePath = user
        ? "/dashboard/producto"
        : "/producto"

    const [search, setSearch] = useState("")
    const [categoriaActiva, setCategoriaActiva] = useState(null)

    const [destacados, setDestacados] = useState([])
    const [productos, setProductos] = useState([])

    const [page, setPage] = useState(1)
    const [totalPaginas, setTotalPaginas] = useState(1)

    useEffect(() => {

        const cargarDestacados = async () => {

            try {

                const data = await Catalogo()

                setDestacados(data)

            } catch (error) {

                console.error(error)

                toast.error(
                    error.message ||
                    "Error al cargar productos destacados"
                )

            }
        }

        cargarDestacados()

    }, [])

    useEffect(() => {

        setPage(1)

    }, [search, categoriaActiva])

    useEffect(() => {

        const cargarProductos = async () => {

            try {

                const texto = search.trim()
                if (
                    texto.length > 0 &&
                    texto.length < 2
                ) {
                    return
                }

                const data = await Explorar({
                    buscar: texto,
                    categoria: categoriaActiva,
                    page,
                    limit: 20
                })

                setProductos(data.productos)
                setTotalPaginas(data.totalPaginas)

            } catch (error) {

                console.error(error)

                toast.error(
                    error.message ||
                    "Error al explorar productos"
                )

            }
        }

        const delay = setTimeout(() => {
            cargarProductos()
        }, 400)

        return () => clearTimeout(delay)

    }, [search, categoriaActiva, page])

    const categorias = [
        ...new Map(
            productos.map((p) => [
                p.categoria?._id,
                p.categoria
            ])
        ).values()
    ]

    const handleAddCart = (producto) => {

        if (!user) {

            navigate("/registro")
            return

        }

        console.log("Agregar carrito:", producto)
    }

    return (

        <div className="p-6 flex flex-col gap-6">

            {user && (

                <p className="text-gray-500">
                    Este módulo te permite visualizar los productos disponibles
                </p>

            )}

            <div className="min-h-screen bg-white/60 rounded-xl">

                <div className="p-6 flex flex-col gap-6">

                    <div className="flex flex-col lg:flex-row lg:items-center gap-4">

                        <div className="w-full lg:w-auto lg:flex-shrink-0">

                            <SearchBar
                                search={search}
                                setSearch={setSearch}
                            />

                        </div>

                        <div className="w-full overflow-x-auto">

                            <div className="flex gap-2 lg:justify-end min-w-max">

                                <Filtros
                                    categorias={categorias}
                                    categoriaActiva={categoriaActiva}
                                    setCategoriaActiva={setCategoriaActiva}
                                />

                            </div>

                        </div>

                    </div>

                    <MejoresProductos
                        productos={destacados}
                        showHeader={false}
                        onSelectProducto={(p) =>
                            navigate(`${basePath}/${p._id}`)
                        }
                    />

                    <div className="p-4">

                        <h2 className="font-bold text-gray-700 mb-4">
                            Todos los productos
                        </h2>

                        <div className="max-h-[400px] overflow-y-auto custom-scroll pr-2">

                            {productos.length === 0 ? (

                                <div className="text-center text-gray-500 py-10">
                                    No se encontraron productos
                                </div>

                            ) : (

                                <ProductosGrid
                                    productos={productos}
                                    esCliente={true}
                                    esVendedor={false}
                                    onAddCart={handleAddCart}
                                    onSelectProducto={(p) =>
                                        navigate(`${basePath}/${p._id}`)
                                    }
                                />

                            )}

                        </div>

                        <div className="flex justify-center items-center gap-2 mt-6 flex-wrap">

                            {Array.from(
                                { length: totalPaginas },
                                (_, index) => {

                                    const numero = index + 1

                                    const activa = numero === page

                                    return (

                                        <button
                                            key={numero}
                                            onClick={() => setPage(numero)}
                                            className={`
                                                min-w-[40px]
                                                h-[40px]
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

            </div>

        </div>
    )
}