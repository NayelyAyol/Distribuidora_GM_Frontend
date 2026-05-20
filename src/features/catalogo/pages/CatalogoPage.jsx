import { useState } from "react"
import ProductosGrid from "../../vendedor/productos/components/ProductosGrid"

import SearchBar from "../components/SearchBar"
import Filtros from "../components/Filtros"
import MejoresProductos from "../components/MejoresProductos"

export default function CatalogoPage() {

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
            nombre: "Mouse Logitech",
            descripcion: "Inalámbrico",
            stock: 10,
            imagen: "https://picsum.photos/301",
            categoriaId: "2"
        },
        {
            _id: "3",
            nombre: "Laptop HP",
            descripcion: "Laptop oficina",
            stock: 5,
            imagen: "https://picsum.photos/302",
            categoriaId: "1"
        },
        {
            _id: "4",
            nombre: "Mouse Logitech",
            descripcion: "Inalámbrico",
            stock: 10,
            imagen: "https://picsum.photos/303",
            categoriaId: "2"
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

            <ProductosGrid
                productos={productosFiltrados}
                esCliente={true}
                esVendedor={false}
                onAddCart={(p) => console.log("cart:", p)}
            />
        </div>

    </div>
)
}