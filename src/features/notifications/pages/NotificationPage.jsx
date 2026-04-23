import { Card } from "@/components/ui/card"
import NotificationItem from "../components/NotificationItem"

export default function NotificationPage() {

    const notifications = [
        "Comentarios en tus productos",
        "Reseñas de compradores",
        "Recordatorios de calificación",
        "Eventos cercanos",
        "Noticias de la empresa",
        "Nuevos lanzamientos",
        "Cambios mensuales",
        "Suscripción al boletín",
        "Nuevos seguidores"
    ]

    return (
        <div className="p-6 space-y-6">

            <div>
                <p className="text-gray-500">
                    Este módulo te permite gestionar las notificaciones dentro del sistema
                </p>
            </div>

            <Card className="p-6 rounded-2xl shadow-md bg-white">

                <div className="divide-y">

                    {notifications.map((item, index) => (
                        <NotificationItem
                            key={index}
                            id={`switch${index}`}
                            label={item}
                        />
                    ))}

                </div>

            </Card>

        </div>
    )
}