import { useNavigate, Link } from "react-router-dom"
import { useState, useEffect } from "react"
import { FiMenu, FiX } from "react-icons/fi"

const LINKS = [
    { href: "/#features", label: "Servicios" },
    { href: "/#about", label: "Nosotros" },
    { href: "/#testimonials", label: "Clientes" },
    { href: "/#destacados", label: "Productos destacados" },
    { href: "/#faq", label: "Preguntas Frecuentes" },
]

export default function Navbar() {

    const navigate = useNavigate()
    const [open, setOpen] = useState(false)
    const mobileLinkClass = "w-full px-6 py-4 rounded-xl text-emerald-900 font-medium text-center hover:bg-emerald-100 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"

    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : ""
        return () => { document.body.style.overflow = "" }
    }, [open])

    return (
        <header className="flex justify-between items-center px-4 sm:px-6 md:px-10 py-4 md:py-6 bg-white border-b relative z-50">

        <Link
            to="/"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="text-xl md:text-2xl font-black text-emerald-900 shrink-0"
        >
            Distribuidora<span className="text-emerald-900">GM</span>
        </Link>

            <nav className="hidden lg:flex items-center gap-5 xl:gap-8 font-medium text-emerald-900 text-sm xl:text-base whitespace-nowrap">
                {LINKS.map((link) => (
                    <a key={link.href} href={link.href} className="relative py-1 group">
                        {link.label}
                        <span className="absolute left-0 -bottom-0.5 h-0.5 w-full bg-emerald-900 scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
                    </a>
                ))}

                <Link to="/catalogo" className="relative py-1 group">
                    Ver productos
                    <span className="absolute left-0 -bottom-0.5 h-0.5 w-full bg-emerald-900 scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
                </Link>
            </nav>

            <button
                onClick={() => navigate("/login")}
                className="hidden lg:block bg-emerald-900 text-white px-6 py-2 rounded-xl hover:bg-black transition shrink-0"
            >
                Inicia sesión
            </button>

            <button
                aria-label={open ? "Cerrar menú" : "Abrir menú"}
                aria-expanded={open}
                className="lg:hidden fixed top-5 right-5 z-[60] bg-white shadow-xl border rounded-full p-3 text-emerald-900 hover:scale-105 transition"
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
                inert={!open ? "" : undefined}
                className={`
                    fixed top-0 right-0 h-full w-3/4 max-w-sm bg-white
                    shadow-2xl border-l border-gray-200
                    flex flex-col items-center justify-center gap-4
                    z-50 text-center
                    transition-transform duration-300
                    ${open ? "translate-x-0" : "translate-x-full"}
                `}
            >

                {LINKS.map((link) => (
                    <a
                        key={link.href}
                        href={link.href}
                        className={mobileLinkClass}
                        onClick={() => setOpen(false)}
                    >
                        {link.label}
                    </a>
                ))}

                <Link to="/catalogo" className={mobileLinkClass} onClick={() => setOpen(false)}>
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