import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { FiX } from "react-icons/fi";
import { obtenerChatPedido, enviarMensajePedido, marcarChatLeido } from "../services/chatService";
import { toast } from "react-toastify";
import useAuthStore from "@/context/useAuthStore";
import { io } from "socket.io-client";

const socket = io(import.meta.env.VITE_BACKEND_URL.replace("/api", ""));

export default function ChatModal({ isOpen, onClose, pedidoId, otherUserName, pedidoNombre }) {
    const [inputMensaje, setInputMensaje] = useState("");
    const [mensajes, setMensajes] = useState([]);
    const user = useAuthStore((state) => state.user);


useEffect(() => {
    return () => {
        socket.off("connect");
        socket.off("disconnect");
        socket.off("connect_error");
    };
}, []);

    useEffect(() => {
    if (!isOpen || !pedidoId) return;

    socket.emit("unirse-chat-pedido", pedidoId);

    const handleNuevoMensaje = (nuevoMensaje) => {
        setMensajes((prev) => [...prev, nuevoMensaje]);
    };

    socket.on("nuevo-mensaje-pedido", handleNuevoMensaje);

    const cargarChat = async () => {
        try {
            const data = await obtenerChatPedido(pedidoId);
            setMensajes(data.mensajes);
            marcarChatLeido(pedidoId);
        } catch (error) {
            toast.error("Error al cargar el chat");
        }
    };

    cargarChat();

    return () => {
        socket.emit("salir-chat-pedido", pedidoId);
        socket.off("nuevo-mensaje-pedido", handleNuevoMensaje);
    };
}, [isOpen, pedidoId]);

    const handleEnviar = async () => {
        if (!inputMensaje.trim()) return;
        
        try {
            const res = await enviarMensajePedido(pedidoId, inputMensaje);
            const nuevoMensaje = res.mensaje;

            if (!nuevoMensaje.emisor || typeof nuevoMensaje.emisor !== 'object') {
                nuevoMensaje.emisor = { _id: user?.id, nombre: user?.nombre };
            }

            setInputMensaje("");
        } catch (error) {
            toast.error(error.message || "No se pudo enviar el mensaje");
        }
    };

    if (!isOpen) return null;

    return createPortal(
        <div className="fixed inset-0 w-screen h-screen bg-white/30 backdrop-blur-sm flex items-center justify-center z-[9999] p-4 m-0">
            <div className="w-full max-w-2xl h-[80vh] bg-white/60 backdrop-blur-xl rounded-2xl border border-white/20 overflow-hidden flex flex-col shadow-2xl">
                <div className="flex items-center justify-between gap-4 p-5 border-b border-gray-200 bg-white">
                    <div>
                        <p className="text-emerald-800 font-bold text-lg">{otherUserName}</p>
                        <p className="text-xs text-gray-500 font-medium">
                            Pedido: <span className="text-emerald-600 font-semibold">{pedidoNombre || "ID: " + pedidoId.slice(-6)}</span>
                        </p>
                    </div>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100"><FiX /></button>
                </div>

                <div className="flex-1 overflow-y-auto px-4 py-6 space-y-5 bg-gradient-to-b from-white to-emerald-50/40">
                    {mensajes.map((msg, index) => {
                        const msgId = msg._id || msg.id || `msg-${index}`;
                        const contenido = msg.mensaje || msg.texto;
                        const emisorId = typeof msg.emisor === 'object' ? msg.emisor?._id : msg.emisor;
                        const isMine = emisorId === user?.id;
                        return (
                            <div key={msgId} className={`flex ${isMine ? "justify-end" : "justify-start"}`}>
                                <div className={`max-w-[80%] px-5 py-3 rounded-2xl ${isMine ? "bg-emerald-900 text-white" : "bg-white border"}`}>
                                    <p className="text-xs opacity-70 mb-1">{isMine ? "Tú" : otherUserName}</p>
                                    <p className="text-sm">{contenido}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="border-t bg-white p-4 flex gap-2">
                    <input
                        value={inputMensaje}
                        onChange={(e) => setInputMensaje(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleEnviar()}
                        placeholder="Escribe algo..."
                        className="flex-1 p-3 rounded-xl border outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                    <button onClick={handleEnviar} className="px-6 bg-emerald-900 text-white rounded-xl">Enviar</button>
                </div>
            </div>
        </div>,
        document.body
    );
}