import { useNavigate, Link } from "react-router-dom"
import { useState } from "react"
import { FiMenu, FiX } from "react-icons/fi"

export default function Navbar() {

    const navigate = useNavigate()
    const [open, setOpen] = useState(false)
    const mobileLinkClass ="w-full px-6 py-4 rounded-xl text-emerald-900 font-medium text-center hover:bg-emerald-100 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"

    return (
        <header className="flex justify-between items-center px-6 md:px-10 py-6 bg-white border-b relative z-50">

            <h1 className="text-2xl font-black text-emerald-900">
                Distribuidora<span className="text-black">GM</span>
            </h1>

            <nav className="hidden md:flex gap-8 font-medium text-emerald-900">
                <a href="/#features">Servicios</a>
                <a href="/#about">Nosotros</a>
                <a href="/#testimonials">Clientes</a>
                <a href="/#destacados">Productos destacados</a>
                <a href="/#faq">Preguntas Frecuentes</a>

                <Link to="/catalogo">
                    Ver productos
                </Link>
            </nav>

            <button
                onClick={() => navigate("/login")}
                className="hidden md:block bg-emerald-900 text-white px-6 py-2 rounded-xl hover:bg-black transition"
            >
                Iniciar sesión
            </button>

            <button
                aria-label="Abrir menú"
                className="md:hidden fixed top-5 right-5 z-50 bg-white shadow-xl border rounded-full p-3 text-emerald-900 hover:scale-105 transition"
                onClick={() => setOpen(!open)}
            >
                {open ? <FiX /> : <FiMenu />}
            </button>

            {open && (
                <div
                    className="fixed inset-0 bg-black/30 z-40"
                    onClick={() => setOpen(false)}
                />
            )}

            <div
                className={`
                    fixed top-0 right-0 h-full w-3/4 max-w-sm bg-white
                    shadow-2xl border-l border-gray-200
                    flex flex-col items-center justify-center gap-4
                    z-50 text-center
                    transition-transform duration-300
                    ${open ? "translate-x-0" : "translate-x-full"}
                `}
            >

                <a
                    href="/#features"
                    className={mobileLinkClass}
                    onClick={() => setOpen(false)}
                >
                    Servicios
                </a>

                <a
                    href="/#about"
                    className={mobileLinkClass}
                    onClick={() => setOpen(false)}
                >
                    Nosotros
                </a>

                <a
                    href="/#testimonials"
                    className={mobileLinkClass}
                    onClick={() => setOpen(false)}
                >
                    Clientes
                </a>

                <a
                    href="/#destacados"
                    className={mobileLinkClass}
                    onClick={() => setOpen(false)}
                >
                    Productos destacados
                </a>

                <a
                    href="/#faq"
                    className={mobileLinkClass}
                    onClick={() => setOpen(false)}
                >
                    Preguntas Frecuentes
                </a>

                <Link
                    to="/catalogo"
                    className={mobileLinkClass}
                    onClick={() => setOpen(false)}
                >
                    Ver productos
                </Link>

                <button
                    onClick={() => {
                        setOpen(false)
                        navigate("/login")
                    }}
                    className="bg-emerald-900 text-white px-6 py-3 rounded-xl hover:bg-black transition"
                >
                    Iniciar sesión
                </button>

            </div>
        </header>
    )
}