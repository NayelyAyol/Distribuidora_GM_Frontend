export default function FAQ() {

    const faqs = [
        ["¿Hacen descuentos por volumen?", "Sí, para empresas y compras grandes."],
        ["¿Realizan entregas a nivel nacional?", "Sí, cubrimos todo el país."],
        ["¿Puedo abrir una cuenta empresarial?", "Sí, contacta a nuestro equipo comercial."]
    ]

    return (
        <section id="faq" className="px-10 py-20">

            <h2 className="text-3xl font-bold text-center mb-10">
                Preguntas frecuentes
            </h2>

            <div className="max-w-3xl mx-auto space-y-4">

                {faqs.map(([q, a], i) => (
                    <div key={i} className="p-4 border rounded-xl bg-white">
                        <p className="font-bold">{q}</p>
                        <p className="text-emerald-900">{a}</p>
                    </div>
                ))}

            </div>

        </section>
    )
}