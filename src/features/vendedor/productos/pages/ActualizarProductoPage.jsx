import { useNavigate, useParams, useLocation } from "react-router-dom"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FiArrowLeft } from "react-icons/fi"
import { toast } from "react-toastify"
import ProductoForm from "../components/ProductosForm"
import { actualizarProducto } from "../services/productoService"

export default function ActualizarProductoPage() {
    const navigate = useNavigate()
    const { id } = useParams()
    const location = useLocation()
    const productoInicial = location.state?.productoSelec || null

    const handleSave = async (formData) => {
        try {
            return await actualizarProducto(id, formData)
        } catch (error) {
            toast.error(error.message)
            throw error 
        }
    }

    return (
        <div className="p-6 flex flex-col gap-6">
            <p className="text-gray-500">
                Este módulo te permite actualizar productos
            </p>

            <Card className="bg-white/60 backdrop-blur-xl border border-white/20 rounded-2xl shadow-sm p-6">
                <div className="flex items-center gap-3 mb-6">
                    <Button variant="ghost" onClick={() => navigate(-1)}>
                        <FiArrowLeft className="text-[20px]" />
                    </Button>
                    <h2 className="text-2xl font-bold text-gray-800">
                        Actualizar producto
                    </h2>
                </div>

                {productoInicial ? (
                    <ProductoForm
                        selectedProduct={productoInicial}
                        onSave={handleSave}
                        onClose={() => navigate(-1)}
                    />
                ) : (
                    <p className="text-center text-gray-500 py-4">
                        No se encontraron los datos del producto.
                    </p>
                )}
            </Card>
        </div>
    )
}