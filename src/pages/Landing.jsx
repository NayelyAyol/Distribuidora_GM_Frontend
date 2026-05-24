import Hero from "../features/landing/components/Hero"
import Stats from "../features/landing/components/Stats"
import Features from "../features/landing/components/Features"
import About from "../features/landing/components/AboutServices"
import Testimonials from "../features/landing/components/Testimonials"
import FAQ from "../features/landing/components/FAQ"
import CTA from "../features/landing/components/CTA"
import Footer from "../features/landing/components/Footer"
import MejoresProductos from "../features/catalogo/components/MejoresProductos"

import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"

import { Catalogo } from "../features/catalogo/services/catalogoService"

export default function Home() {

    const location = useLocation()
    const navigate = useNavigate()

    const [productos, setProductos] = useState([])

    useEffect(() => {

        if (location.hash) {

            const element = document.getElementById(
                location.hash.replace("#", "")
            )

            if (element) {
                element.scrollIntoView({
                    behavior: "smooth"
                })
            }
        }

    }, [location])

    useEffect(() => {

        const cargarProductos = async () => {

            try {

                const data = await Catalogo()

                setProductos(data)

            } catch (error) {

                console.error(error)
            }
        }

        cargarProductos()

    }, [])

    const productosDestacados = productos.slice(0, 5)

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
                    navigate(`/producto/${p._id}`, {
                        state: {
                            from: "/#destacados"
                        }
                    })                
                }
            />
            <FAQ />
            <CTA />
            <Footer />
        </>
    )
}