import { useNavigate, useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import useAuthStore from "@/context/useAuthStore"
import ProductosGrid from "../components/ProductosGrid"
import SearchBar from "../../../catalogo/components/SearchBar"
import { Button } from "@/components/ui/button"
import { buttonPrimaryClass } from "@/utils/styles"
import { FiArrowLeft } from "react-icons/fi"
import { listarCategoriasActivas } from "@/features/admin/categorias/services/categoriaService"

export default function ProductosPage() {

    const navigate = useNavigate()
    const { categoriaId } = useParams()
    const user = useAuthStore((state) => state.user)
    const esVendedor = user?.rol?.toUpperCase() === "VENDEDOR"
    const esCliente = user?.rol?.toUpperCase() === "CLIENTE"
    const [search, setSearch] = useState("")
    const [categoriaNombre, setCategoriaNombre] = useState("Cargando...")

    const [productos, setProductos] = useState([
        {
            _id: "1",
            nombre: "Laptop HP",
            descripcion: "Laptop para oficina",
            stock: 5,
            imagen: "https://picsum.photos/300"
        },
        {
            _id: "2",
            nombre: "Mouse Logitech",
            descripcion: "Mouse inalámbrico",
            stock: 8,
            imagen: "https://picsum.photos/301"
        }
    ])

    const [productosFiltrados, setProductosFiltrados] = useState(productos)

    useEffect(() => {
        setProductosFiltrados(productos)
    }, [productos])

    useEffect(() => {
        const cargarCategoria = async () => {
            try {
                const categorias = await listarCategoriasActivas()

                const categoria = categorias.find(
                    (c) => c._id === categoriaId
                )

                if (categoria) {
                    setCategoriaNombre(categoria.nombre)
                } else {
                    setCategoriaNombre("Categoría")
                }

            } catch (error) {
                console.error(error)
                setCategoriaNombre("Categoría")
            }
        }

        if (categoriaId) {
            cargarCategoria()
        }
    }, [categoriaId])

    const handleBuscar = () => {
        if (!search.trim()) {
            setProductosFiltrados(productos)
            return
        }

        const filtrados = productos.filter((p) =>
            p.nombre.toLowerCase().includes(search.toLowerCase())
        )

        setProductosFiltrados(filtrados)
    }

    const aumentarStock = (id) => {
        setProductos((prev) =>
            prev.map((p) =>
                p._id === id
                    ? { ...p, stock: p.stock + 1 }
                    : p
            )
        )
    }

    const disminuirStock = (id) => {
        setProductos((prev) =>
            prev.map((p) =>
                p._id === id && p.stock > 0
                    ? { ...p, stock: p.stock - 1 }
                    : p
            )
        )
    }

    const handleEdit = () => {
        navigate(
            `/dashboard/categorias/${categoriaId}/productos/actualizar`
        )
    }

    return (
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
                            onClick={() => navigate("/dashboard/categorias")}
                        >
                            <FiArrowLeft className="text-[20px] font-bold" />
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
                                    navigate(`/dashboard/categorias/${categoriaId}/productos/crear`)
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
                        handleBuscar={handleBuscar}
                    />
                </div>

                <ProductosGrid
                    productos={productosFiltrados}
                    onIncrease={aumentarStock}
                    onDecrease={disminuirStock}
                    onEdit={handleEdit}
                    esVendedor={esVendedor}
                    esCliente={esCliente}
                />

            </div>

        </div>
    )
}