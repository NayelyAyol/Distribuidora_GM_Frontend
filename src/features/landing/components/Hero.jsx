import { useNavigate } from "react-router-dom"

export default function Hero() {

    const navigate = useNavigate()

    return (
        <section className="grid md:grid-cols-2 items-center px-10 py-20">

            <div>
                <h1 className="text-5xl md:text-6xl font-black text-emerald-950">
                    Distribución inteligente de artículos de oficina
                </h1>

                <p className="mt-6 text-lg text-emerald-900">
                    Proveemos papelería, suministros de oficina y soluciones corporativas con entregas rápidas y seguras.
                </p>

                <button
                    onClick={() => navigate("/login")}
                    className="mt-8 bg-emerald-900 text-white px-8 py-3 rounded-2xl hover:bg-black"
                >
                    Solicitar cotización
                </button>
            </div>

            <div className="h-[420px]">
                <img src="/office.png" className="w-full h-full object-contain" />
            </div>

        </section>
    )
}