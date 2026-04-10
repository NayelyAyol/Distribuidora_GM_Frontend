export default function Features() {

    const items = [
        "Suministro de papelería",
        "Pedidos al por mayor",
        "Entrega rápida nacional",
        "Gestión de inventario",
        "Soluciones corporativas personalizadas",
        "Atención a empresas"
    ]

    return (
        <section id="features" className="px-10 py-20">

            <h2 className="text-3xl font-bold text-center mb-12">
                Nuestros servicios
            </h2>

            <div className="grid md:grid-cols-3 gap-6">

                {items.map((item, i) => (
                    <div key={i} className="p-6 border rounded-2xl hover:shadow-md transition">
                        <h3 className="font-bold text-emerald-900">{item}</h3>
                    </div>
                ))}

            </div>

        </section>
    )
}