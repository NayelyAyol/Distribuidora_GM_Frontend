import CategoriaForm from "../components/CategoriaForm"
import CategoriasGrid from "../components/CategoriasGrid"

export default function CategoriaPage() {

    const data = [
        {
            id: 1,
            nombre: "Electrónica",
            descripcion: "Dispositivos electrónicos",
            imagen: "/images/notFound/notFound.webp"
        },
        {
            id: 2,
            nombre: "Ropa",
            descripcion: "Moda y accesorios",
            imagen: "/images/notFound/notFound.webp"
        },
        {
            id: 3,
            nombre: "Ropa",
            descripcion: "Moda y accesorios",
            imagen: "/images/notFound/notFound.webp"
        },
        {
            id: 4,
            nombre: "Ropa",
            descripcion: "Moda y accesorios",
            imagen: "/images/notFound/notFound.webp"
        }
    ]

    return (
        <div className="flex flex-col gap-6 p-6 h-screen">

            <p className="text-gray-500">
                En este módulo puedes administrar las categorías de productos
            </p>

            <div>
                <CategoriaForm />
            </div>

            <div className="flex-1 min-h-[300px] overflow-y-auto bg-white/60 rounded-2xl p-4 shadow-inner">

                <CategoriasGrid data={data} />

            </div>

        </div>
    )
}