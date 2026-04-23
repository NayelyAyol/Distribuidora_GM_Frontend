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
        <div className="flex flex-col gap-6 p-6">

            <p className="text-gray-500">
                En este módulo puedes administrar las categorías de productos
            </p>

            <div>
                <CategoriaForm />
            </div>

            <div className="flex-1 max-h-[60vh] overflow-y-auto bg-white/60 rounded-2xl p-4 shadow-inner">

                <CategoriasGrid data={data} />

            </div>

        </div>
    )
}