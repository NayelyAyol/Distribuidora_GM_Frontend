import ClientesTable from "../components/ClientesTable"

export default function ClientesPage() {

    const clientes = [
        {
            id: 1,
            nombre: "Juan",
            apellido: "Pérez",
            email: "juan@email.com",
            estado: true
        },
        {
            id: 2,
            nombre: "Ana",
            apellido: "Lopez",
            email: "ana@email.com",
            estado: false
        }
    ]

    return (
        <div className="flex flex-col gap-6">

            <div>
                <p className="text-sm text-gray-500">
                    Administra los clientes del sistema
                </p>
            </div>

            <ClientesTable data={clientes} />

        </div>
    )
}