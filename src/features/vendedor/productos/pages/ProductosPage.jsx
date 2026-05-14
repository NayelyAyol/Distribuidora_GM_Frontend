import { useParams, useNavigate } from "react-router-dom"
import { useState } from "react"

import ProductosGrid from "../components/ProductosGrid"

import { Button } from "@/components/ui/button"
import { buttonPrimaryClass } from "@/utils/styles"

export default function ProductosPage() {

    const { categoriaId } = useParams()
    const navigate = useNavigate()

    const [productos, setProductos] = useState([
        {
            id: 1,
            nombre: "Laptop HP",
            descripcion: "Laptop para oficina",
            stock: 5,
            imagen: "https://picsum.photos/300"
        },
        {
            id: 2,
            nombre: "Mouse Logitech",
            descripcion: "Mouse inalámbrico",
            stock: 8,
            imagen: "https://picsum.photos/301"
        }
    ])

    const aumentarStock = (id) => {
        setProductos((prev) =>
            prev.map((p) =>
                p.id === id
                    ? { ...p, stock: p.stock + 1 }
                    : p
            )
        )
    }

    const disminuirStock = (id) => {
        setProductos((prev) =>
            prev.map((p) =>
                p.id === id && p.stock > 0
                    ? { ...p, stock: p.stock - 1 }
                    : p
            )
        )
    }

    return (
        <div className="p-6 flex flex-col gap-6">

            <div>
                <p className="text-gray-500">
                    Gestiona el stock de los productos
                </p>
            </div>

            <div className="bg-white/60 rounded-2xl p-5 shadow-inner">

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">

    <div>

        <h2 className="text-2xl font-bold text-gray-800">
            Categoría{" "}
            <span className="text-emerald-700">
                Electrónica
            </span>
        </h2>

    </div>

    <div className="flex flex-wrap items-center justify-start lg:justify-end gap-3">

        <Button
            className={`${buttonPrimaryClass} whitespace-nowrap`}
        >
            + Agregar
        </Button>

        <Button
            variant="ghost"
            onClick={() => navigate("/dashboard/categorias")}
            className="
                whitespace-nowrap
                border border-gray-200
                hover:bg-gray-100
                px-5 py-2
                rounded-xl
            "
        >
            ← Volver
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
    )
}