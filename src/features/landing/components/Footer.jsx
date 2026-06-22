import { FaFacebook, FaTiktok } from "react-icons/fa6"

export default function Footer() {
    return (
        <footer className="bg-white border-t py-10 px-10">

            <div className="flex justify-between items-center flex-wrap gap-6">

                <h3 className="text-2xl font-black text-emerald-950">
                    DistribuidoraGM
                </h3>

                <div className="flex gap-4 text-xl">
                    <a
                        href="https://www.facebook.com/grupomorenoecuador/?locale=es_LA"
                        aria-label="Facebook"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <FaFacebook />
                    </a>

                    <a
                        href="https://www.tiktok.com/@distribuidoragrupomoreno?_r=1&_t=ZS-96eL0VI0Crx"
                        aria-label="TikTok"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <FaTiktok />
                    </a>
                </div>

            </div>

            <p className="text-center mt-8 text-gray-500">
                © 2026 DistribuidoraGM - Todos los derechos reservados
            </p>

        </footer>
    )
}