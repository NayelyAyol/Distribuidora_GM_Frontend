import { useNavigate } from "react-router-dom"

export default function Navbar() {

    const navigate = useNavigate()

    return (
        <header className="flex justify-between items-center px-10 py-6 bg-white border-b">

            <h1 className="text-2xl font-black text-emerald-900">
                Distribuidora<span className="text-black">GM</span>
            </h1>

            <nav className="hidden md:flex gap-8 font-medium text-emerald-900">
                <a href="#features">Servicios</a>
                <a href="#about">Nosotros</a>
                <a href="#testimonials">Clientes</a>
                <a href="#faq">Preguntas Frecuentes</a>
            </nav>

            <button
                onClick={() => navigate("/")}
                className="bg-emerald-900 text-white px-6 py-2 rounded-xl hover:bg-black transition"
            >
                Iniciar sesión
            </button>

        </header>
    )
}