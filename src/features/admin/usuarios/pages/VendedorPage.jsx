import VendedorForm from "../components/VendedorForm"

export default function VendedoresPage({ tipo = "VENDEDOR" }) {

    const isVendedor = tipo === "VENDEDOR"

    return (
        <div className="p-6 space-y-6">

            <div>
                <p className="text-gray-500">
                    Este módulo te permite crear {isVendedor ? "vendedores" : "clientes"} 
                </p>
            </div>

            <div className="bg-white/60 backdrop-blur-xl p-6 rounded-2xl border border-white/20">
                <h2 className="text-xl font-bold mb-4">
                    Crear {isVendedor ? "Vendedor" : "Cliente"}
                </h2>

                <VendedorForm tipo={tipo}/>
            </div>

        </div>
    )
}