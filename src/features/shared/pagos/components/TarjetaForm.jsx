export default function TarjetaForm() {

    return (

        <div className="
            bg-white
            border
            rounded-2xl
            p-5
            flex flex-col gap-4
        ">

            <h3 className="font-bold text-lg">
                Datos de tarjeta
            </h3>

            <input
                type="text"
                placeholder="Número de tarjeta"
                className="
                    border
                    rounded-xl
                    px-4 py-3
                    outline-none
                "
            />

            <div className="grid grid-cols-2 gap-4">

                <input
                    type="text"
                    placeholder="MM/AA"
                    className="
                        border
                        rounded-xl
                        px-4 py-3
                        outline-none
                    "
                />

                <input
                    type="text"
                    placeholder="CVV"
                    className="
                        border
                        rounded-xl
                        px-4 py-3
                        outline-none
                    "
                />

            </div>

        </div>
    )
}