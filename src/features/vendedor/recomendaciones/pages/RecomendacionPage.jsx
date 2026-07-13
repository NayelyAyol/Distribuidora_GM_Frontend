import RecomendacionForm from "../components/RecomendacionForm"
import RecomendacionList from "../components/RecomendacionList"
import { crearRecomendacion, obtenerMisRecomendaciones } from "@/features/recommendations/service/recomendacionService";
import { useState, useEffect } from "react";
import socket from "@/utils/socket"
import useAuthStore from "@/context/useAuthStore"

export default function RecomendacionesPage() {
    const [recargar, setRecargar] = useState(false);
    const user = useAuthStore((state) => state.user)

    useEffect(() => {
        if (!user?.id) return;

        const unirse = () => socket.emit('unirse-mis-recomendaciones', user.id);
        unirse();
        socket.on('connect', unirse);

        socket.on('recomendacion-respondida', () => {
            setRecargar(prev => !prev);
        });

        return () => {
            socket.emit('salir-mis-recomendaciones', user.id);
            socket.off('connect', unirse);
            socket.off('recomendacion-respondida');
        };
    }, [user?.id]);

    return (
        <div className="p-6 space-y-6">

            <div>
                <p className="text-gray-500">
                    Este módulo te permite enviar tus recomendaciones para mejorar la plataforma
                </p>
            </div>

            <RecomendacionForm
                titulo="Enviar recomendación"
                placeholderAsunto="Título de la recomendación"
                placeholderMensaje="Escribe tu recomendación..."
                mensajeExito="Recomendación enviada correctamente"
                onSubmit={async (data) => {
                    await crearRecomendacion(data);
                    setRecargar(prev => !prev);
                }}
            />
            <RecomendacionList
                recargar={recargar}
                onCargar={obtenerMisRecomendaciones}
                dataKey="recomendaciones"
            />
        </div>
    );
}