import Navbar from "../layouts/Navbar"
import Hero from "../features/landing/components/Hero"
import Stats from "../features/landing/components/Stats"
import Features from "../features/landing/components/Features"
import About from "../features/landing/components/AboutServices"
import Testimonials from "../features/landing/components/Testimonials"
import FAQ from "../features/landing/components/FAQ"
import CTA from "../features/landing/components/CTA"
import Footer from "../features/landing/components/Footer"
import MejoresProductos from "../features/catalogo/components/MejoresProductos"

import { useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"

export default function Home() {

    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        if (location.hash) {
            const element = document.getElementById(location.hash.replace("#", ""))
            if (element) {
                element.scrollIntoView({ behavior: "smooth" })
            }
        }
    }, [location])

    const productosDestacados = [
        {
            _id: "1",
            nombre: "Laptop HP",
            descripcion: "Laptop oficina",
            stock: 5,
            imagen: "https://picsum.photos/300",
            categoriaId: "1"
        },
        {
            _id: "2",
            nombre: "Mouse",
            descripcion: "Mouse inteligente",
            stock: 5,
            imagen: "https://picsum.photos/301",
            categoriaId: "1"
        },
        {
            _id: "3",
            nombre: "Mouse Logitech",
            descripcion: "Inalámbrico",
            stock: 10,
            imagen: "https://picsum.photos/302",
            categoriaId: "2"
        },
        {
            _id: "4",
            nombre: "Escobas",
            descripcion: "Hogar",
            stock: 5,
            imagen: "https://picsum.photos/303",
            categoriaId: "1"
        }
    ]

    return (
        <>
            <Hero />
            <Stats />
            <Features />
            <About />
            <Testimonials />

            <MejoresProductos
                productos={productosDestacados}
                onSelectProducto={(p) =>
                    navigate(`/dashboard/producto/${p._id}`)
                }
            />

            <FAQ />
            <CTA />
            <Footer />
        </>
    )
}