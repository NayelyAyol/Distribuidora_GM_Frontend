import CategoriaForm from "../components/CategoriaForm"
import CategoriasTable from "../components/CategoriaTable"

export default function CategoriaPage() {

    return (
        <div className="flex flex-col gap-6">

            <div>
                <p className="text-gray-500 text-sm">
                    Este módulo te permite administrar las categorías de productos del sistema
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                <div className="lg:col-span-1">
                    <CategoriaForm />
                </div>

                <div className="lg:col-span-2">
                    <CategoriasTable data={[]} />
                </div>

            </div>

        </div>
    )
}