import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import CarritoList from "../components/CarritoList";
import CarritoResumen from "../components/CarritoResumen";
import { obtenerCarrito } from "../services/carritoService";
import { actualizarCantidadCarrito, eliminarDelCarrito } from "../services/carritoService"; // Asegúrate de tener este servicio

export default function CarritoPage() {
    const [carrito, setCarrito] = useState(null);
    const [loading, setLoading] = useState(true);

    const cargarCarrito = async () => {
        try {
            setLoading(true);
            const data = await obtenerCarrito();
            setCarrito(data.carrito); 
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        cargarCarrito();
    }, []);

    const onCantidadChange = async (id, cantidad) => {
        try {
            const data = await actualizarCantidadCarrito(id, { cantidad });
            setCarrito(data.carrito);
            toast.success("Cantidad actualizada");
        } catch (error) {
            toast.error(error.message);
        }
    };

    const removeProducto = async (id) => {
        try {
            const data = await eliminarDelCarrito(id);
            setCarrito(data.carrito);
            toast.success("Producto eliminado del carrito");
        } catch (error) {
            toast.error(error.message);
        }
    };

    if (loading) return <p className="p-6">Cargando carrito...</p>;

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
                        carrito={carrito?.articulos || []}
                        onCantidadChange={onCantidadChange}
                        onRemove={removeProducto}
                    />
                </div>

                <CarritoResumen 
                    carrito={carrito} 
                />
            </div>
        </div>
    );
}