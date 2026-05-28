import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { FiX } from "react-icons/fi";

export default function ChatModal({ 
    isOpen, 
    onClose, 
    pedidoId, 
    role = "cliente", 
    userName = "Nayely", 
    otherUserName = "Carlos" 
}) {
    const [inputMensaje, setInputMensaje] = useState("");
    
    const [mensajes, setMensajes] = useState([
        { id: 1, from: "Carlos", body: "Hola", mine: false },
        { id: 2, from: "Nayely", body: "Hola, ¿cómo puedo ayudarte?", mine: true },
        { id: 3, from: "Carlos", body: "Necesito información del producto", mine: false },
        { id: 4, from: "Nayely", body: "Claro, dime cuál producto necesitas", mine: true },
        { id: 5, from: "Carlos", body: "El shampoo hidratante", mine: false }
    ]);

    useEffect(() => {
        if (isOpen) document.body.style.overflow = "hidden";
        else document.body.style.overflow = "unset";
        return () => { document.body.style.overflow = "unset"; };
    }, [isOpen]);

    if (!isOpen) return null;

    const handleEnviar = () => {
        if (!inputMensaje.trim()) return;
        setMensajes([...mensajes, {
            id: Date.now(),
            from: userName,
            body: inputMensaje,
            mine: true
        }]);
        setInputMensaje("");
    };

    return createPortal(
        <div className="fixed inset-0 w-screen h-screen bg-white/30 backdrop-blur-sm flex items-center justify-center z-[9999] p-4 m-0">
            
            <div className="w-full max-w-2xl h-[80vh] bg-white/60 backdrop-blur-xl rounded-2xl border border-white/20 overflow-hidden flex flex-col shadow-2xl">

                <div className="flex items-center justify-between gap-4 p-5 md:p-6 border-b border-gray-200 bg-white">
                    <div>
                        <p className="text-emerald-800 mt-1 text-lg">
                            <span className="font-bold text-emerald-950">{otherUserName}</span>
                            {" — "}
                            <span className="text-gray-500 font-medium">Pedido #{pedidoId}</span>
                        </p>
                    </div>
                    
                    <button 
                        onClick={onClose}
                        className="p-2 rounded-full hover:bg-gray-100 text-gray-500 transition"
                    >
                        <FiX className="text-xl" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto px-4 md:px-8 py-6 space-y-5 bg-gradient-to-b from-white to-emerald-50/40 custom-scroll">
                    {mensajes.map((mensaje) => (
                        <div
                            key={mensaje.id}
                            className={`flex ${mensaje.mine ? "justify-end" : "justify-start"}`}
                        >
                            <div className={`max-w-[90%] md:max-w-md px-5 py-4 rounded-3xl shadow-md break-words ${
                                mensaje.mine
                                    ? "bg-emerald-900 text-white rounded-br-md"
                                    : "bg-white border border-gray-200 text-gray-800 rounded-bl-md"
                            }`}>
                                <p className="text-xs font-bold mb-1 opacity-70">
                                    {mensaje.from}
                                </p>
                                <p className="leading-relaxed">
                                    {mensaje.body}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Input de Envío */}
                <div className="border-t border-gray-200 bg-white p-4 md:p-6">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <input
                            type="text"
                            value={inputMensaje}
                            onChange={(e) => setInputMensaje(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleEnviar()}
                            placeholder="Escribe un mensaje..."
                            className="flex-1 py-4 px-6 rounded-2xl bg-gray-100 border border-gray-200 outline-none focus:ring-2 focus:ring-emerald-500 text-gray-700"
                        />

                        <button 
                            onClick={handleEnviar}
                            className="py-4 px-8 rounded-2xl bg-emerald-900 hover:bg-black text-white font-bold transition-all active:scale-95 sm:w-44"
                        >
                            Enviar
                        </button>
                    </div>
                </div>

            </div>
        </div>,
        document.body
    );
}