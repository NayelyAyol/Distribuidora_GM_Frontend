import { useState, useEffect } from "react"
import { Elements } from "@stripe/react-stripe-js"

export default function StripeWrapper({ children }) {
    const [stripePromise, setStripePromise] = useState(null)

    useEffect(() => {
        import("@stripe/stripe-js").then(({ loadStripe }) => {
            setStripePromise(loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY))
        })
    }, [])

    if (!stripePromise) return <div className="p-6 text-gray-500">Cargando...</div>

    return (
        <Elements stripe={stripePromise}>
            {children}
        </Elements>
    )
}