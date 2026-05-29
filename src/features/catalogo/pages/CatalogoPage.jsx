import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import ProductosGrid from "../../vendedor/productos/components/ProductosGrid"
import SearchBar from "../components/SearchBar"
import Filtros from "../components/Filtros"
import MejoresProductos from "../components/MejoresProductos"

import useAuthStore from "@/context/useAuthStore"
import { Explorar } from "../services/catalogoService"
import { toast } from "react-toastify"

export default function CatalogoPage() {
    const navigate = useNavigate()
    const user = useAuthStore((state) => state.user)
    const basePath = user ? "/dashboard/producto" : "/producto"

    const [search, setSearch] = useState("")
    const [categoriaActiva, setCategoriaActiva] = useState(null)
    const [marca, setMarca] = useState("")
    const [verDestacados, setVerDestacados] = useState(undefined)

    const [destacados, setDestacados] = useState([])
    const [productos, setProductos] = useState([])
    const [productosOriginales, setProductosOriginales] = useState([]) 

    const [page, setPage] = useState(1)
    const [totalPaginas, setTotalPaginas] = useState(1)

    useEffect(() => {
        setPage(1)
    }, [search, categoriaActiva, marca, verDestacados])

    useEffect(() => {
        const cargarProductos = async () => {
            try {
                const texto = search.trim()
                if (texto.length > 0 && texto.length < 2) return

                const data = await Explorar({
                    categoria: categoriaActiva || "", 
                    buscar: texto,
                    marca: marca,
                    destacado: verDestacados,
                    page,
                    limit: 20
                })

                const listaProductos = data?.productos || []
                setProductos(listaProductos)
                setTotalPaginas(data?.totalPaginas || 1)

                // Guardamos la ráfaga original limpia para mapear las listas desplegables completas
                if (!texto && !categoriaActiva && !marca && productosOriginales.length === 0) {
                    setProductosOriginales(listaProductos)
                }

                const filtradosDestacados = listaProductos.filter(p => p?.destacado === true)
                setDestacados(filtradosDestacados)

            } catch (error) {
                console.error(error)
                toast.error(error.message || "Error al explorar productos")
            }
        }

        const delay = setTimeout(() => {
            cargarProductos()
        }, 400)

        return () => clearTimeout(delay)
    }, [search, categoriaActiva, marca, verDestacados, page])

    const categorias = [
        ...new Map(
            (productosOriginales.length > 0 ? productosOriginales : productos).map((p) => [
                p?.categoria?._id,
                p?.categoria
            ])
        ).values()
    ].filter(Boolean)

    const marcas = [
        ...new Set(
            (productosOriginales.length > 0 ? productosOriginales : productos)
                .map((p) => p?.marca?.trim()?.toLowerCase())
                .filter(Boolean)
        )
    ].sort()

    const handleAddCart = (producto) => {
        if (!user) {
            navigate("/registro")
            return
        }
        console.log("Agregar al carrito:", producto)
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

                    {/* BARRA DE ACCIONES Y FILTROS COMPACTA */}
                    <div className="flex flex-col lg:flex-row lg:items-center gap-4 justify-between">
                        
                        <div className="flex flex-col md:flex-row gap-3 w-full lg:w-auto items-center">
                            <SearchBar search={search} setSearch={setSearch} />
                            
                            <Filtros
                                categorias={categorias}
                                categoriaActiva={categoriaActiva}
                                setCategoriaActiva={setCategoriaActiva}
                                marcas={marcas}
                                marca={marca}
                                setMarca={setMarca}
                            />
                        </div>
                    </div>

                    {!search.trim() && !categoriaActiva && !marca && (
                        <MejoresProductos
                            productos={destacados}
                            showHeader={false}
                            onSelectProducto={(p) => navigate(`${basePath}/${p._id}`)}
                        />
                    )}

                    <div className="p-4">
                        <h2 className="font-bold text-gray-700 mb-4">
                            Todos los productos
                        </h2>

                        <div className="max-h-[400px] overflow-y-auto custom-scroll pr-2">
                            {productos.length === 0 ? (
                                <div className="text-center text-gray-500 py-10">
                                    No se encontraron productos con los filtros seleccionados
                                </div>
                            ) : (
                                <ProductosGrid
                                    productos={productos}
                                    esCliente={true}
                                    esVendedor={false}
                                    onAddCart={handleAddCart}
                                    onSelectProducto={(p) => navigate(`${basePath}/${p._id}`)}
                                />
                            )}
                        </div>

                        <div className="flex justify-center items-center gap-2 mt-6 flex-wrap">
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
            </div>
        </div>
    )
}