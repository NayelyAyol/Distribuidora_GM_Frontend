import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import CantidadSelector from "../CantidadSelector"
import ProductosRecomendados from "../ProductosRecomendados"
import { useNavigate } from "react-router-dom"
import { FiArrowLeft } from "react-icons/fi"

export default function ProductoDetallePage() {

    const navigate = useNavigate()
    const { id } = useParams()

    const [cantidad, setCantidad] = useState(1)

        const [productos] = useState([
        {
            _id: "1",
            nombre: "Laptop HP",
            descripcion: "Laptop oficina",
            stock: 5,
            precio:30,
            imagen: "https://picsum.photos/300",
            categoriaId: "1"
        },
        {
            _id: "2",
            nombre: "Mouse",
            descripcion: "Mouse inteligente",
            stock: 5,
            precio:30,
            imagen: "https://picsum.photos/301",
            categoriaId: "1"
        },
        {
            _id: "3",
            nombre: "Mouse Logitech",
            descripcion: "Inalámbrico",
            stock: 10,
            precio:30,
            imagen: "https://picsum.photos/302",
            categoriaId: "2"
        },
        {
            _id: "4",
            nombre: "Escobas",
            descripcion: "Laptop oficina",
            stock: 5,
            precio:30,
            imagen: "https://picsum.photos/303",
            categoriaId: "1"
        },
        {
            _id: "5",
            nombre: "Mouse Logitech",
            descripcion: "Inalámbrico",
            stock: 10,
            precio:30,
            imagen: "https://picsum.photos/304",
            categoriaId: "2"
        },
                {
            _id: "6",
            nombre: "CPU",
            descripcion: "Laptop oficina",
            stock: 5,
            precio:30,
            imagen: "https://picsum.photos/305",
            categoriaId: "1"
        },
        {
            _id: "7",
            nombre: "Tazas",
            descripcion: "Mouse inteligente",
            stock: 5,
            precio:30,
            imagen: "https://picsum.photos/306",
            categoriaId: "1"
        },
        {
            _id: "8",
            nombre: "Alfombra",
            descripcion: "Inalámbrico",
            stock: 10,
            precio:30,
            imagen: "https://picsum.photos/307",
            categoriaId: "2"
        },
        {
            _id: "9",
            nombre: "Forros",
            descripcion: "Laptop oficina",
            stock: 5,
            precio:30,
            imagen: "https://picsum.photos/308",
            categoriaId: "1"
        },
        {
            _id: "10",
            nombre: "Toallas",
            descripcion: "Inalámbrico",
            stock: 10,
            precio:30,
            imagen: "https://picsum.photos/309",
            categoriaId: "1"
        }
    ])

    const producto = productos.find(
        p => p._id === id
    )

    useEffect(() => {

        window.scrollTo(0, 0)

    }, [id])

    if (!producto) {
        return (
            <p className="p-6">
                Producto no encontrado
            </p>
        )
    }

    const recomendados = productos.filter(
        p =>
            p.categoriaId === producto.categoriaId &&
            p._id !== producto._id
    )

    return (
        <div className="p-6 flex flex-col gap-8">

            <p className="text-gray-500">
                Este módulo te permite visualizar
                un producto seleccionado
            </p>

            <div className="relative grid lg:grid-cols-2 gap-8 bg-white p-6 rounded-2xl shadow">

                <div className="absolute pt-8 px-8">

                    <button
                        onClick={() =>
                            navigate("/dashboard/catalogo")
                        }
                        className="
                            w-11 h-11 rounded-xl
                            bg-white shadow-sm
                            border border-gray-100
                            flex items-center justify-center
                            hover:bg-emerald-100 transition
                            shrink-0
                        "
                    >

                        <FiArrowLeft
                            className="
                                text-xl
                                text-gray-700
                            "
                        />

                    </button>

                </div>

                <img
                    src={producto.imagen}
                    className="
                        w-full
                        h-[350px]
                        object-cover
                        rounded-xl
                    "
                />

                <div>

                    <h1 className="text-3xl font-bold">
                        {producto.nombre}
                    </h1>

                    <p className="text-gray-500 mt-2">
                        {producto.descripcion}
                    </p>

                    <p className="text-xl font-semibold mt-4">
                        ${producto.precio}
                    </p>

                    <p className="text-sm text-gray-400 mt-1">
                        Stock: {producto.stock}
                    </p>

                    <CantidadSelector
                        cantidad={cantidad}
                        setCantidad={setCantidad}
                        min={1}
                        max={producto.stock}
                    />

                    <button
                        className="
                            mt-4
                            w-full
                            bg-black
                            text-white
                            py-2
                            rounded-xl
                        "
                    >
                        Agregar al carrito
                    </button>

                </div>

            </div>

            <div className="bg-white p-6 rounded-2xl shadow">

                <div
                    className="
                    max-h-[400px]
                    overflow-y-auto
                    pr-2
                "
                >
                <ProductosRecomendados
                    productos={recomendados}
                />
                </div>
            </div>

        </div>
    )
}