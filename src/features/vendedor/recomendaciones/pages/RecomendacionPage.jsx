import RecomendacionForm from "../components/RecomendacionForm"
import RecomendacionList from "../components/RecomendacionList"

export default function RecomendacionesPage() {
    return (
        <div className="p-6 space-y-6">

            <div>
                <p className="text-gray-500">
                    Este módulo te permite enviar tus sugerencias y recomendaciones para mejorar la plataforma
                </p>
            </div>

            <RecomendacionForm
                titulo="Enviar recomendación"
                placeholderAsunto="Título de la recomendación"
                placeholderMensaje="Escribe tu recomendación..."
                mensajeExito="Recomendación enviada correctamente"
            />
            <RecomendacionList />
        </div>
    );
}