import { Card } from "@/components/ui/card"
import FeedbackForm from "../components/FeedbackForm"
import FeedbackList from "../components/FeedbackList"

export default function FeedbackPage({ role = "cliente" }) {

    return (
        <div className="p-6 space-y-6">

            <div>
                <p className="text-gray-500">
                    En este módulo puedes conocer las ideas de los usuarios para mejorar el sistema
                </p>
            </div>
{/*
            <Card className="p-6 rounded-2xl shadow-md">
                <FeedbackForm />
            </Card>
*/}

            <Card className="p-6 rounded-2xl shadow-md bg-white">
                <FeedbackList role={role} />
            </Card>

        </div>
    )
}