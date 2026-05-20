import RecomendacionForm from "../../../vendedor/recomendaciones/components/RecomendacionForm"
import RecomendacionList from "../../../vendedor/recomendaciones/components/RecomendacionList"

export default function QuejasSugerenciasClientePage() {
    return (
        <div className="p-6 space-y-6">

            <div>
                <p className="text-gray-500">
                    Este módulo te permite enviar tus quejas y sugerencias para mejorar el servicio
                </p>
            </div>

            <RecomendacionForm />
            <RecomendacionList />

        </div>
    )
}