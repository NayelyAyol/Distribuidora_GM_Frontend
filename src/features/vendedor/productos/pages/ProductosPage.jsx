import { useNavigate } from "react-router-dom"
import { useState } from "react"

import ProductosGrid from "../components/ProductosGrid"
import { Card } from "@/components/ui/card"
import ProductoForm from "../components/ProductosForm"
import { Button } from "@/components/ui/button"
import { buttonPrimaryClass } from "@/utils/styles"
import { FiArrowLeft } from "react-icons/fi"

export default function ProductosPage() {
    const navigate = useNavigate()
    const [openModal, setOpenModal] = useState(false)
    const [productoSeleccionado, setProductoSeleccionado] = useState(null)

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

    return (
        <>
            <div className="p-6 flex flex-col gap-6">

                <div>
                    <p className="text-gray-500">
                        Este módulo te permite gestionar el stock de los productos
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
                                    Electrónica
                                </span>
                            </h2>

                        </div>

                        <div className="flex flex-wrap items-center justify-start lg:justify-end gap-3">

                            <Button
                                onClick={() => {
                                    setProductoSeleccionado(null)
                                    setOpenModal(true)
                                }}
                                className={`${buttonPrimaryClass} whitespace-nowrap sm:w-[150px]`}
                            >
                                + Agregar
                            </Button>

                        </div>

                    </div>

                    <ProductosGrid
                        productos={productos}
                        onIncrease={aumentarStock}
                        onDecrease={disminuirStock}
                    />

                </div>

            </div>

            {openModal && (

                <div className="fixed top-0 left-0 right-0 bottom-0 bg-white/30 backdrop-blur-sm flex items-center justify-center z-50">

                    <Card
                        className="
                            w-[70%]
                            sm:w-[90%]
                            lg:max-w-3xl
                            max-h-[80vh]
                            overflow-y-auto
                            p-4
                            sm:p-6
                            bg-emerald-50
                            backdrop-blur-xl
                            border border-gray-200
                            shadow-xl
                            rounded-2xl
                        "
                    >
                        <h2 className="text-2xl font-bold text-gray-800 mb-5">

                            {productoSeleccionado
                                ? "Editar producto"
                                : "Agregar producto"}

                        </h2>

                        <ProductoForm
                            selectedProduct={productoSeleccionado}
                            setSelectedProduct={setProductoSeleccionado}
                            onClose={() => setOpenModal(false)}
                            onSave={(data) => {
                                console.log(data)
                            }}
                        />

                    </Card>

                </div>

            )}
        </>
    )
}