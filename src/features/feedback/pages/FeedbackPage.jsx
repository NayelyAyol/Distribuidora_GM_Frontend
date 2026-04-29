import { Card } from "@/components/ui/card"
import FeedbackList from "../components/FeedbackList"

export default function FeedbackPage() {

    return (
        <div className="p-6 space-y-6">

            <div>
                <p className="text-gray-500">
                    Este módulo te permite gestionar las quejas y sugerencias de los usuarios
                </p>
            </div>

            <Card className="p-6 rounded-2xl shadow-md bg-white">
                <FeedbackList />
            </Card>

        </div>
    )
}