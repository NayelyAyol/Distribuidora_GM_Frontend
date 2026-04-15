import VendedorForm from "../components/VendedorForm"
import VendedoresTable from "../components/VendedorTable"

export default function VendedoresPage() {
    return (
        <div className="space-y-6">

            <div className="bg-white/60 backdrop-blur-xl p-6 rounded-2xl border border-white/20">
                <h2 className="text-xl font-bold mb-4">
                    Crear Vendedor
                </h2>
                <VendedorForm />
            </div>

            <div className="bg-white/60 backdrop-blur-xl p-6 rounded-2xl border border-white/20">
                <h2 className="text-xl font-bold mb-4">
                    Lista de Vendedores
                </h2>
                <VendedoresTable data={[]} />
            </div>

        </div>
    )
}