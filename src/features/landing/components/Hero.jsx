import { useNavigate } from "react-router-dom"

export default function Hero() {
    const navigate = useNavigate()

    return (
        <section className="grid md:grid-cols-2 items-center px-10 py-20">

            {/* TEXTO */}
            <div>
                <h1 className="text-5xl md:text-6xl font-black text-emerald-950">
                    Distribución inteligente de útiles escolares
                </h1>

                <p className="mt-6 text-lg text-emerald-900">
                    Gestiona y optimiza la compra de suministros escolares y de oficina de forma rápida y eficiente.
                </p>

                <button
                    onClick={() => navigate("/login")}
                    className="mt-8 bg-emerald-900 text-white px-8 py-3 rounded-2xl hover:bg-black"
                >
                    Comenzar ahora
                </button>
            </div>

            {/* IMAGEN */}
            <div className="h-[400px] flex items-center justify-center">
                <img 
                    src="/office.png" 
                    alt="hero"
                    className="w-full h-full object-contain"
                />
            </div>

        </section>
    )
}