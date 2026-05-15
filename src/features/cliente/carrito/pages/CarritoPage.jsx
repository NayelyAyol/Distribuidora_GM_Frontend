import CarritoList from "../components/CarritoList"
import { useState } from "react"
import CarritoResumen from "../components/CarritoResumen"

export default function CarritoPage() {
    const [carrito, setCarrito] = useState([
        { id: 1, nombre: "Producto A", precio: 10, cantidad: 2 },
        { id: 2, nombre: "Producto B", precio: 20, cantidad: 1 },
    ])


    const onCantidadChange = (id, cantidad) => {
        setCarrito(prev =>
            prev.map(p =>
                p.id === id ? { ...p, cantidad } : p
            )
        );
    };

    const removeProducto = (id) => {
        setCarrito(prev => prev.filter(p => p.id !== id));
    };

    return (

        <div className="p-6 flex flex-col gap-6">

            <div>
                <p className="text-gray-500">
                    Este módulo te permite visualizar productos en tu carrito
                </p>
            </div>


            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                <div className="lg:col-span-2">
                    <CarritoList
                        carrito={carrito}
                        onCantidadChange={onCantidadChange}
                        onRemove={removeProducto}
                    />
                </div>

                <CarritoResumen carrito={carrito} />

            </div>
        </div>
    )
}