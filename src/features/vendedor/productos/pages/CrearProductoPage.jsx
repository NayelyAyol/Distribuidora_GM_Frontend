import { useNavigate } from "react-router-dom"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

import { FiArrowLeft } from "react-icons/fi"

import ProductoForm from "../components/ProductosForm"
import { crearProducto } from "../services/productoService"

export default function CrearProductoPage() {

    const navigate = useNavigate()

    const handleSave = async (data) => {

        try {
            await crearProducto(data);
            navigate(-1)
        } catch (error) {
            console.error("Error al crear producto", error);
        }
    }

    return (
        <div className="p-6 flex flex-col gap-6">

            <div>
                <p className="text-gray-500">
                    Este módulo te permite registrar nuevos productos
                </p>
            </div>

            <Card
                className="
                    bg-white/60
                    backdrop-blur-xl
                    border border-white/20
                    rounded-2xl
                    shadow-sm
                    p-6
                "
            >

                <div className="flex items-center gap-3 mb-6">

                    <Button
                        variant="ghost"
                        onClick={() => navigate(-1)}
                    >
                        <FiArrowLeft className="text-[20px]" />
                    </Button>

                    <div>

                        <h2 className="text-2xl font-bold text-gray-800">
                            Crear producto
                        </h2>

                    </div>

                </div>

                <ProductoForm
                    onClose={() => navigate(-1)}
                />

            </Card>

        </div>
    )
}