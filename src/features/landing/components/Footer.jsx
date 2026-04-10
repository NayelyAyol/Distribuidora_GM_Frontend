import { FaFacebook, FaInstagram, FaXTwitter } from "react-icons/fa6"

export default function Footer() {
    return (
        <footer className="bg-white border-t py-10 px-10">

            <div className="flex justify-between items-center flex-wrap gap-6">

                <h3 className="text-2xl font-black text-emerald-950">
                    DistribuidoraGM
                </h3>

                <div className="flex gap-4 text-xl">
                    <FaFacebook />
                    <FaInstagram />
                    <FaXTwitter />
                </div>

            </div>

            <p className="text-center mt-8 text-gray-500">
                © 2026 DistribuidoraGM - Todos los derechos reservados
            </p>

        </footer>
    )
}