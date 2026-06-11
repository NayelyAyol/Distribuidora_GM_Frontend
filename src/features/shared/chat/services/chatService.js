import api from "@/utils/api";

export const obtenerChatPedido = async (pedidoId) => {
    try {
        const res = await api.get(`/chats-pedidos/${pedidoId}`); 
        return res.data;
    } catch (error) {
        console.error("Error al obtener el chat:", error);
        throw new Error(error.response?.data?.msg || "Error al obtener el chat");
    }
};

export const enviarMensajePedido = async (pedidoId, mensaje) => {
    try {
        const res = await api.post(`/chats-pedidos/mensajes/${pedidoId}`, { mensaje });
        return res.data;
    } catch (error) {
        console.error("Error al enviar el mensaje:", error);
        throw new Error(error.response?.data?.msg || "Error al enviar el mensaje");
    }
};

export const marcarChatLeido = async (pedidoId) => {
    try {
        const res = await api.patch(`/chats-pedidos/leer/${pedidoId}`);
        return res.data;
    } catch (error) {
        console.error("Error al marcar el chat:", error);
        throw new Error(error.response?.data?.msg || "Error al marcar el chat");
    }
};