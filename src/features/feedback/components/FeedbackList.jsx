import FeedbackCard from "./FeedbackCard"

export default function FeedbackList({ role }) {

    const data = [
        { id: 1, text: "Agregar modo oscuro", user: "Cliente 1" },
        { id: 2, text: "Mejorar rendimiento", user: "Cliente 2" }
    ]

    return (
        <div className="grid gap-4">

            {data.map(item => (
                <FeedbackCard key={item.id} item={item} role={role} />
            ))}

        </div>
    )
}