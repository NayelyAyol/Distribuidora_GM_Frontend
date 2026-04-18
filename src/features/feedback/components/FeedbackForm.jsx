import { useState } from "react"
import { Button } from "@/components/ui/button"
import { buttonPrimaryClass } from "@/utils/styles"

export default function FeedbackForm() {

    const [text, setText] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(text)
        setText("")
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">

            <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Escribe tu sugerencia..."
                className="w-full p-4 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                rows={4}
            />

            <Button className={`${buttonPrimaryClass} w-full`}>
                Enviar sugerencia
            </Button>

        </form>
    )
}