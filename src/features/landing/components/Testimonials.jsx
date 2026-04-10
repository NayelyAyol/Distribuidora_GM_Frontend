export default function Testimonials() {

    const data = [
        "Entrega rápida y confiable para nuestra empresa.",
        "Excelente proveedor de suministros de oficina.",
        "Muy buena atención para pedidos grandes."
    ]

    return (
        <section id="testimonials" className="bg-emerald-50 py-20 px-10">

            <h2 className="text-3xl font-bold text-center mb-12">
                Opiniones de clientes
            </h2>

            <div className="grid md:grid-cols-3 gap-6">

                {data.map((t, i) => (
                    <div key={i} className="p-6 bg-white border rounded-2xl">
                        <p className="text-emerald-900">"{t}"</p>
                    </div>
                ))}

            </div>

        </section>
    )
}