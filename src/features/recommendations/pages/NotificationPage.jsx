import { Card } from "@/components/ui/card"
import NotificationItem from "../components/NotificationItem"

export default function NotificationPage() {

    const notifications = [
        "Promociones sugeridas",
        "Nueva mercadería",
        "Bajo número de ventas",
        "Pago al SRI",
        "Promoción por fechas festivas"
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