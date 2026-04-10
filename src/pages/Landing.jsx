import Navbar from "../layouts/Navbar"
import Hero from "../features/landing/components/Hero"
import Stats from "../features/landing/components/Stats"
import Features from "../features/landing/components/Features"
import About from "../features/landing/components/AboutServices"
import Testimonials from "../features/landing/components/Testimonials"
import FAQ from "../features/landing/components/FAQ"
import CTA from "../features/landing/components/CTA"
import Footer from "../features/landing/components/Footer"

export default function Home() {
    return (
        <>
            <Navbar />
            <Hero />
            <Stats />
            <Features />
            <About />
            <Testimonials />
            <FAQ />
            <CTA />
            <Footer />
        </>
    )
}