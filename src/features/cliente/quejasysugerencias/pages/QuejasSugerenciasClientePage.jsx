import RecomendacionForm from "../../../vendedor/recomendaciones/components/RecomendacionForm"
import RecomendacionList from "../../../vendedor/recomendaciones/components/RecomendacionList"
import { crearQuejaSugerencia, obtenerMisQuejasSugerencias } from "../services/quejasSugerenciasService"
import { useState } from "react"

export default function QuejasSugerenciasClientePage() {
        const [recargar, setRecargar] = useState(false)


    return (
        <div className="p-6 space-y-6">

            <div>
                <p className="text-gray-500">
                    Este módulo te permite enviar tus quejas y sugerencias para mejorar el servicio
                </p>
            </div>

            <RecomendacionForm
                placeholderAsunto="Asunto de la queja"
                placeholderMensaje="Describe tu queja o sugerencia..."
                mensajeExito="Contenido enviado correctamente"
                onSubmit={async (data) => {
                    await crearQuejaSugerencia(data)
                    setRecargar(prev => !prev)
                }}
            />
            <RecomendacionList
                placeholder="Buscar queja o sugerencia..."
                recargar={recargar}
                onCargar={obtenerMisQuejasSugerencias}
                dataKey="quejasSugerencias"
            />

        </div>
    )
}