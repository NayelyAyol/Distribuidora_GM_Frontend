import RecomendacionForm from "../components/RecomendacionForm"
import RecomendacionList from "../components/RecomendacionList"
import { crearRecomendacion, obtenerMisRecomendaciones } from "@/features/recommendations/service/recomendacionService";
import { useState } from "react";

export default function RecomendacionesPage() {
    const [recargar, setRecargar] = useState(false);

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