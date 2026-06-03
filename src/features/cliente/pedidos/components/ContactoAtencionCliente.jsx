import { FaWhatsapp } from "react-icons/fa";

export default function ContactoAtencionCliente() {
    return (
        <div className="bg-white/60 backdrop-blur-xl rounded-3xl border border-white/20 p-8 text-center space-y-4 shadow-sm h-full flex flex-col justify-center">
            <div className="mx-auto w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center">
                <FaWhatsapp className="text-3xl text-emerald-600" />
            </div>
            
            <div>
                <h2 className="text-lg font-bold text-gray-800">Atención al Cliente</h2>
                <p className="text-gray-500 text-sm mt-1">
                    ¿Dudas con tu pedido? 
                </p>
                <p className="text-gray-500 text-sm mt-1">
                    Escríbenos:
                </p>
            </div>

            <div className="bg-white/50 py-3 px-4 rounded-xl border border-emerald-100">
                <span className="text-emerald-700 font-bold text-xl tracking-wider">
                    +593 95 987 2730
                </span>
            </div>
        </div>
    );
}