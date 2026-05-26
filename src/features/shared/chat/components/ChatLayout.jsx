export default function ChatLayout({
    role = "cliente",
    userName = "Nayely",
    otherUserName = "Carlos"
}) {

    const mensajes = [
        {
            id: 1,
            from: otherUserName,
            body: "Hola",
            mine: false
        },
        {
            id: 2,
            from: userName,
            body: "Hola, ¿cómo puedo ayudarte?",
            mine: true
        },
        {
            id: 3,
            from: otherUserName,
            body: "Necesito información del producto",
            mine: false
        },
        {
            id: 4,
            from: userName,
            body: "Claro, dime cuál producto necesitas",
            mine: true
        },
        {
            id: 5,
            from: otherUserName,
            body: "El shampoo hidratante",
            mine: false
        }
    ]

    return (

        <div className="p-6 space-y-6">

            <div>
                <p className="text-gray-500">
                    {
                        role === "vendedor"
                            ? "Este módulo te permite comunicarte con tus clientes"
                            : `Este módulo te permite comunicarte con el vendedor a cargo de tu pedido`
                    }
                </p>
            </div>

            <div className="
                w-full
                h-[calc(100vh-140px)]
                bg-white/60
                backdrop-blur-xl
                rounded-2xl
                border border-white/20
                overflow-hidden
                flex flex-col
            ">

                <div className="
                    flex flex-col md:flex-row
                    md:items-center
                    md:justify-between
                    gap-4
                    p-5 md:p-6
                    border-b border-gray-200
                    bg-white
                ">

                    <div>

                        <p className="text-emerald-800 mt-1">
                            Conversación activa con{" "}
                            <span className="font-bold">
                                {otherUserName}
                            </span>
                        </p>

                    </div>

                </div>

                <div className="
                    flex-1
                    overflow-y-auto
                    px-4 md:px-8
                    py-6
                    space-y-5
                    bg-gradient-to-b
                    from-white
                    to-emerald-50/40
                    custom-scroll
                ">

                    {
                        mensajes.map((mensaje) => (

                            <div
                                key={mensaje.id}
                                className={`flex ${
                                    mensaje.mine
                                        ? "justify-end"
                                        : "justify-start"
                                }`}
                            >

                                <div className={`
                                    max-w-[90%] md:max-w-md
                                    px-5 py-4
                                    rounded-3xl
                                    shadow-md
                                    break-words
                                    ${
                                        mensaje.mine
                                            ? "bg-emerald-900 text-white rounded-br-md"
                                            : "bg-white border border-gray-200 text-gray-800 rounded-bl-md"
                                    }
                                `}>

                                    <p className="
                                        text-xs
                                        font-bold
                                        mb-1
                                        opacity-70
                                    ">
                                        {mensaje.from}
                                    </p>

                                    <p className="leading-relaxed">
                                        {mensaje.body}
                                    </p>

                                </div>

                            </div>

                        ))
                    }

                </div>

                <div className="
                    border-t border-gray-200
                    bg-white
                    p-4 md:p-6
                ">

                    <div className="
                        flex flex-col sm:flex-row
                        gap-4
                    ">

                        <input
                            type="text"
                            placeholder="Escribe un mensaje..."
                            className="
                                flex-1
                                py-4 px-6
                                rounded-2xl
                                bg-gray-100
                                border border-gray-200
                                outline-none
                                focus:ring-2
                                focus:ring-emerald-500
                                text-gray-700
                            "
                        />

                        <button className="
                            py-4 px-8
                            rounded-2xl
                            bg-emerald-900
                            hover:bg-black
                            text-white
                            font-bold
                            transition-all
                            active:scale-95
                            sm:w-44
                        ">
                            Enviar
                        </button>

                    </div>

                </div>

            </div>

        </div>
    )
}