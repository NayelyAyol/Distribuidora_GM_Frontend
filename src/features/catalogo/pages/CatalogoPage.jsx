import { useState } from "react"
import { useNavigate } from "react-router-dom"

import ProductosGrid from "../../vendedor/productos/components/ProductosGrid"

import SearchBar from "../components/SearchBar"
import Filtros from "../components/Filtros"
import MejoresProductos from "../components/MejoresProductos"

export default function CatalogoPage() {

    const navigate = useNavigate()

    const [search, setSearch] = useState("")
    const [categoriaActiva, setCategoriaActiva] = useState(null)

    const [productos] = useState([
        {
            _id: "1",
            nombre: "Laptop HP",
            descripcion: "Laptop oficina",
            stock: 5,
            imagen: "https://picsum.photos/300",
            categoriaId: "1"
        },
        {
            _id: "2",
            nombre: "Mouse",
            descripcion: "Mouse inteligente",
            stock: 5,
            imagen: "https://picsum.photos/301",
            categoriaId: "1"
        },
        {
            _id: "3",
            nombre: "Mouse Logitech",
            descripcion: "Inalámbrico",
            stock: 10,
            imagen: "https://picsum.photos/302",
            categoriaId: "2"
        },
        {
            _id: "4",
            nombre: "Escobas",
            descripcion: "Laptop oficina",
            stock: 5,
            imagen: "https://picsum.photos/303",
            categoriaId: "1"
        },
        {
            _id: "5",
            nombre: "Mouse Logitech",
            descripcion: "Inalámbrico",
            stock: 10,
            imagen: "https://picsum.photos/304",
            categoriaId: "2"
        },
        {
            _id: "6",
            nombre: "CPU",
            descripcion: "Laptop oficina",
            stock: 5,
            imagen: "https://picsum.photos/305",
            categoriaId: "1"
        },
        {
            _id: "7",
            nombre: "Tazas",
            descripcion: "Mouse inteligente",
            stock: 5,
            imagen: "https://picsum.photos/306",
            categoriaId: "1"
        },
        {
            _id: "8",
            nombre: "Alfombra",
            descripcion: "Inalámbrico",
            stock: 10,
            imagen: "https://picsum.photos/307",
            categoriaId: "2"
        },
        {
            _id: "9",
            nombre: "Forros",
            descripcion: "Laptop oficina",
            stock: 5,
            imagen: "https://picsum.photos/308",
            categoriaId: "1"
        },
        {
            _id: "10",
            nombre: "Toallas",
            descripcion: "Inalámbrico",
            stock: 10,
            imagen: "https://picsum.photos/309",
            categoriaId: "1"
        }
    ])

    const categorias = [
        { _id: "1", nombre: "Electrónica" },
        { _id: "2", nombre: "Accesorios" }
    ]

    const productosDestacados = productos.slice(0, 5)

    const handleBuscar = () => {
        console.log("buscar:", search)
    }

    const productosFiltrados = productos.filter((p) => {

        const matchSearch = p.nombre
            .toLowerCase()
            .includes(search.toLowerCase())

        const matchCategoria = categoriaActiva
            ? p.categoriaId === categoriaActiva
            : true

        return matchSearch && matchCategoria
    })

    return (
        <div className="p-6 flex flex-col gap-6">

            <p className="text-gray-500">
                Este módulo te permite visualizar
                los productos disponibles
            </p>

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

            <MejoresProductos productos={productosDestacados} />

            <div className="bg-white/60 p-4 rounded-2xl shadow-inner">
                <h2 className="font-bold text-gray-700 mb-4">
                    Todos los productos
                </h2>

                <div
                    className="
                    max-h-[400px]
                    overflow-y-auto
                    pr-2
                "
                >
                    <ProductosGrid
                        productos={productosFiltrados}
                        esCliente={true}
                        esVendedor={false}
                        onAddCart={(p) => console.log("cart:", p)}
                        onSelectProducto={(p) => navigate(`/dashboard/producto/${p._id}`)}
                    />
                </div>
            </div>

        </div>
    )
}