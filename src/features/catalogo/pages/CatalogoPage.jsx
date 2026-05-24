import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import ProductosGrid from "../../vendedor/productos/components/ProductosGrid"

import SearchBar from "../components/SearchBar"
import Filtros from "../components/Filtros"
import MejoresProductos from "../components/MejoresProductos"

import useAuthStore from "@/context/useAuthStore"
import { Catalogo } from "../services/catalogoService"

export default function CatalogoPage() {

    const navigate = useNavigate()

    const user = useAuthStore((state) => state.user)

    const basePath = user
        ? "/dashboard/producto"
        : "/producto"

    const [search, setSearch] = useState("")
    const [categoriaActiva, setCategoriaActiva] = useState(null)

    const [productos, setProductos] = useState([])

    useEffect(()=>{
        const cargarProductos = async ()=>{
            try{
                const data = await Catalogo()
                setProductos(data)
            }catch (error){
                console.error(error)
            }
        }
        cargarProductos()
    }, [])

    const categorias = [
        ...new Map(
            productos.map((p) => [
                p.categoria?._id,
                p.categoria
            ])
        ).values()
    ]

    const productosDestacados = productos.slice(0, 5)

    const handleBuscar = () => {
        console.log("buscar:", search)
    }

    const handleAddCart = (producto) => {

        if (!user) {
            navigate("/registro")
            return
        }

        console.log("Agregar carrito:", producto)
    }

    const productosFiltrados = productos.filter((p) => {

        const matchSearch = p.nombre
            .toLowerCase()
            .includes(search.toLowerCase())

        const matchCategoria = categoriaActiva
            ? p.categoria?._id === categoriaActiva
            : true

        return matchSearch && matchCategoria
    })

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
                            handleBuscar={handleBuscar}
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
                    productos={productosDestacados}
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

                        <ProductosGrid
                            productos={productosFiltrados}
                            esCliente={true}
                            esVendedor={false}
                            onAddCart={handleAddCart}
                            onSelectProducto={(p) =>
                                navigate(`${basePath}/${p._id}`)
                            }
                        />

                    </div>

                </div>

            </div>

        </div>
    </div>
)
}