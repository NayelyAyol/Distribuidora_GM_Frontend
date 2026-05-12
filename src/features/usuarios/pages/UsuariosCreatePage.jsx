import UsuarioForm from "../components/UsuarioForm"

export default function UsuariosCreatePage() {

    return (
        <div className="p-6 space-y-6">

            <div>
                <p className="text-gray-500">
                    Este módulo te permite crear vendedores
                </p>
            </div>

            <div className="bg-white/60 backdrop-blur-xl p-6 rounded-2xl border border-white/20">
                <h2 className="text-xl font-bold mb-4">
                    Crear Vendedor
                </h2>

                <UsuarioForm />

            </div>

        </div>
    )
}