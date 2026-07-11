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

import { Explorar } from "../features/catalogo/services/catalogoService"

export default function Home() {

    const location = useLocation()
    const navigate = useNavigate()

    const [productosDestacados, setProductosDestacados] = useState([])
    const [cargandoDestacados, setCargandoDestacados] = useState(true) // 👈 nuevo estado

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

            setCargandoDestacados(true) // 👈 inicia carga

            try {
                const data = await Explorar()
                
                const listaProductos = data?.productos || []

                const filtrados = listaProductos.filter(p => p?.destacado === true)

                setProductosDestacados(filtrados)

            } catch (error) {
                console.error("Error al cargar los productos destacados en Home:", error)
            } finally {
                setCargandoDestacados(false) 
            }
        }

        cargarProductos()

    }, [])

    return (
        <>
            <Hero />
            <Stats />
            <Features />
            <About />
            <Testimonials />

            {cargandoDestacados ? (
                <div className="text-center py-10 text-gray-500">
                    Cargando...
                </div>
            ) : productosDestacados.length === 0 ? (
                <div className="text-center py-10 text-gray-500">
                    No hay productos favoritos
                </div>
            ) : (
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
            )}

            <FAQ />
            <CTA />
            <Footer />
        </>
    )
}