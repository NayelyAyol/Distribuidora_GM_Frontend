import { useNavigate } from "react-router-dom"
import { FiArrowLeft } from "react-icons/fi"
import { Input } from "@/components/ui/input"

export default function PedidoInfoForm({ form, handleChange }) {
    const navigate = useNavigate()
    
    const fechaHoy = new Date().toLocaleDateString('es-EC', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    }).split('/').reverse().join('-');

    return (
        <div className="bg-white/60 backdrop-blur-xl rounded-3xl border border-white/20 p-6 space-y-8">
            <div className="space-y-4">
                <div className="flex items-start gap-4">
                    <button onClick={() => navigate(-1)} className="w-11 h-11 rounded-xl bg-white shadow-sm border border-gray-100 flex items-center justify-center hover:bg-gray-50 transition shrink-0">
                        <FiArrowLeft className="text-xl text-gray-700" />
                    </button>
                    <div>
                        <h2 className="text-lg font-semibold text-gray-800">Información del pedido</h2>
                        <p className="text-sm text-gray-500">Completa la información necesaria</p>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                    <Input
                        placeholder="Nombre del pedido"
                        name="nombrePedido"
                        value={form.nombrePedido}
                        onChange={handleChange}
                        className="h-12 rounded-xl"
                    />

                <div className="h-12 rounded-xl border border-input bg-white/50 px-4 flex items-center text-gray-500 shadow-sm">
                        <span className=" text-black">
                            {new Date().toLocaleDateString('es-EC')}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}