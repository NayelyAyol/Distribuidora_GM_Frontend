export default function TransferenciaForm() {

    return (

        <div className="
            bg-white
            border
            rounded-2xl
            p-5
            flex flex-col gap-3
        ">

            <h3 className="font-bold text-lg">
                Datos bancarios
            </h3>

            <div>
                <p className="text-sm text-gray-500">
                    Banco
                </p>

                <p className="font-medium">
                    Banco Pichincha
                </p>
            </div>

            <div>
                <p className="text-sm text-gray-500">
                    Cuenta
                </p>

                <p className="font-medium">
                    2200456789
                </p>
            </div>

            <div>
                <p className="text-sm text-gray-500">
                    Titular
                </p>

                <p className="font-medium">
                    Distribuidora Moreno
                </p>
            </div>

        </div>
    )
}