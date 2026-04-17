import VendedorForm from "../components/VendedorForm"

export default function VendedoresPage() {

    return (
        <div className="space-y-6">

            <div className="bg-white/60 backdrop-blur-xl p-6 rounded-2xl border border-white/20">
                <h2 className="text-xl font-bold mb-4">
                    Crear Vendedor
                </h2>

                <VendedorForm />
            </div>

        </div>
    )
}