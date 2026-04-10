import { useNavigate } from "react-router-dom";

export default function CTA() {
    const navigate = useNavigate()
    
    return (
        <section className="text-center py-20">

            <h2 className="text-4xl font-black text-emerald-950">
                ¿Listo para optimizar tu abastecimiento de oficina?
            </h2>

            <p className="mt-4 text-emerald-900">
                Mejora la gestión de suministros de tu empresa hoy mismo.
            </p>

            <button 
            onClick={() => navigate("/")}
            className="mt-8 bg-emerald-900 text-white px-10 py-3 rounded-2xl hover:bg-black">
                Contactar ventas
            </button>

        </section>
    )
}