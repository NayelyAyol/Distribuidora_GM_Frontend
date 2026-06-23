import { useNavigate } from "react-router-dom"

export default function Hero() {

    const navigate = useNavigate()

    return (
        <section className="grid md:grid-cols-2 items-center gap-10 md:gap-16 px-8 sm:px-10 md:px-16 md:py-[70px] lg:py-[70px] xl:py-[70px] 2xl:py-[70px] min-h-[80vh]">
            <div className="flex flex-col justify-center">
                <h1 className="text-5xl md:text-6xl font-black text-emerald-950 leading-tight">
                    Distribución inteligente de artículos de oficina
                </h1>
                <p className="mt-6 text-lg text-emerald-900/80">
                    Proveemos papelería, suministros de oficina y soluciones corporativas con entregas rápidas y seguras.
                </p>
                <div className="mt-8 flex gap-4">
                    <button
                        onClick={() => navigate("/login")}
                        className="bg-emerald-900 text-white px-8 py-3 rounded-2xl hover:bg-black transition-colors"
                    >
                        Solicitar cotización
                    </button>
                </div>
            </div>

            <div className="h-[280px] md:h-[500px] rounded-3xl overflow-hidden shadow-xl">
                <img
                    src="/images/landing/ImgLanding.webp"
                    alt="Distribuidora Grupo Moreno"
                    loading="eager"
                    fetchPriority="high"
                    className="w-full h-full object-cover object-center"
                />
            </div>

        </section>
    )
}