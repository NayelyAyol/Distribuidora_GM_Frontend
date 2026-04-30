import { useParams, useNavigate } from "react-router-dom"

export default function ProductosPage() {

    const { categoriaId } = useParams()
    const navigate = useNavigate()

    const categorias = [
        { id: 1, nombre: "Electrónica" },
        { id: 2, nombre: "Ropa" },
        { id: 3, nombre: "Hogar" },
        { id: 4, nombre: "Deportes" }
    ]

    const productos = [
        { id: 1, nombre: "Coca Cola", stock: 10 },
        { id: 2, nombre: "Pepsi", stock: 5 },
        { id: 3, nombre: "Laptop HP", stock: 3 },
        { id: 4, nombre: "Audífonos Sony", stock: 8 },
        { id: 5, nombre: "Mouse Logitech", stock: 15 },
        { id: 6, nombre: "Teclado mecánico", stock: 6 },
        { id: 7, nombre: "Monitor Samsung", stock: 4 },
        { id: 2, nombre: "Pepsi", stock: 5 },
        { id: 3, nombre: "Laptop HP", stock: 3 },
        { id: 4, nombre: "Audífonos Sony", stock: 8 },
        { id: 5, nombre: "Mouse Logitech", stock: 15 },
        { id: 6, nombre: "Teclado mecánico", stock: 6 },
        { id: 7, nombre: "Monitor Samsung", stock: 4 }
    ]

    const categoria = categorias.find(
        (c) => c.id === Number(categoriaId)
    )

    return (
        <div className="p-6 flex flex-col gap-4">

            <div>
                <p className="text-gray-500">
                    Este módulo te permite visualizar los productos de la categoría seleccionada
                </p>
            </div>

            <div className="flex-1 max-h-[65vh] overflow-y-auto bg-white/60 rounded-2xl p-5 shadow-inner flex flex-col gap-4">

                <div className="flex items-center justify-between">

                    <h2 className="text-xl font-bold">
                        Productos de la categoría{" "}
                        <span className="text-emerald-900">
                            {categoria?.nombre || "Desconocida"}
                        </span>
                    </h2>

                    <button
                        onClick={() => navigate("/dashboard/categorias")}
                        className="text-sm text-emerald-700 font-medium hover:underline"
                    >
                        ← Volver a categorías
                    </button>

                </div>

                {productos.length === 0 ? (
                    <div className="text-center py-10 text-gray-500">
                        No hay productos disponibles en esta categoría
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                        {productos.map((p) => (
                            <div
                                key={p.id}
                                onClick={() =>
                                    navigate(`/dashboard/categorias/${categoriaId}/productos/${p.id}`)
                                }
                                className="bg-white p-4 rounded-xl shadow cursor-pointer hover:shadow-lg transition"
                            >
                                <h2 className="font-bold">{p.nombre}</h2>

                                <p className="text-sm text-gray-500">
                                    Stock: {p.stock}
                                </p>
                            </div>
                        ))}

                    </div>
                )}

            </div>

        </div>
    )
}