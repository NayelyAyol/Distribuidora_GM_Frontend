import { Card } from "@/components/ui/card"
import NotificationItem from "../components/NotificationItem"

export default function NotificationPage() {

    const notifications = [
        "Sugerencias de productos automáticas",
        "Recomendaciones por ventas",
        "Alertas de stock bajo",
        "Productos más vendidos",
        "Clientes frecuentes",
        "Promociones sugeridas",
        "Análisis de comportamiento",
        "Recomendaciones mensuales"
    ]

    return (
        <div className="space-y-4">

            <Card className="p-6 rounded-2xl">

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