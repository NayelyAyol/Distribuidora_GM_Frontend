import { useState } from "react"
import { toast } from "react-toastify"

import CategoriaForm from "../components/CategoriaForm"
import CategoriasGrid from "../components/CategoriasGrid"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { buttonPrimaryClass, buttonOutlineClass } from "@/utils/styles"

export default function CategoriaPage() {

    const [selectedCategory, setSelectedCategory] = useState(null)

    const data = [
        {
            id: 1,
            nombre: "Electrónica",
            descripcion: "Dispositivos electrónicos",
            imagen: "/images/notFound/notFound.webp"
        },
        {
            id: 2,
            nombre: "Ropa",
            descripcion: "Moda y accesorios",
            imagen: "/images/notFound/notFound.webp"
        },
        {
            id: 3,
            nombre: "Hogar",
            descripcion: "Artículos para el hogar",
            imagen: "/images/notFound/notFound.webp"
        },
        {
            id: 4,
            nombre: "Deportes",
            descripcion: "Artículos deportivos",
            imagen: "/images/notFound/notFound.webp"
        }
    ]

    const handleOpenDelete = (cat) => {
        setSelectedCategory(cat)
    }

    const handleCloseDelete = () => {
        setSelectedCategory(null)
    }

    const handleConfirmDelete = () => {
        toast.success(`Categoría ${selectedCategory.nombre} eliminada`)
        setSelectedCategory(null)
    }

    return (
        <div className="flex flex-col gap-6 p-6">

            <p className="text-gray-500">
                Este módulo te permite administrar las categorías de productos
            </p>

            <CategoriaForm />

            <div className="flex-1 max-h-[60vh] overflow-y-auto bg-white/60 rounded-2xl p-4 shadow-inner">

                <CategoriasGrid
                    data={data}
                    onDelete={handleOpenDelete}
                />

            </div>

            {selectedCategory && (
                <div className="fixed top-0 left-0 right-0 bottom-0 bg-white/30 backdrop-blur-sm flex items-center justify-center z-50">

                    <Card className="w-full max-w-md p-6 bg-emerald-50 backdrop-blur-xl border border-gray-200 shadow-xl rounded-2xl">

                        <h2 className="text-lg font-bold text-gray-800 mb-2">
                            Confirmar eliminación
                        </h2>

                        <p className="text-[15px] text-gray-500 mb-4">
                            ¿Está seguro que desea eliminar la categoría{" "}
                            <span className="font-semibold text-emerald-800">
                                {selectedCategory.nombre}
                            </span>
                            ?
                        </p>

                        <div className="flex justify-end gap-3">

                            <Button
                                variant="ghost"
                                className={`max-w-[100px] py-[22px] ${buttonOutlineClass}`}
                                onClick={handleCloseDelete}
                            >
                                Cancelar
                            </Button>

                            <Button
                                onClick={handleConfirmDelete}
                                className={`max-w-[100px] ${buttonPrimaryClass}`}
                            >
                                Eliminar
                            </Button>

                        </div>

                    </Card>

                </div>
            )}

        </div>
    )
}