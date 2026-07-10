import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import CarritoList from "../components/CarritoList";
import CarritoResumen from "../components/CarritoResumen";
import { obtenerCarrito, actualizarCantidadCarrito, eliminarDelCarrito, vaciarCarrito } from "../services/carritoService";
import { buttonOutlineClass, buttonPrimaryClass } from "@/utils/styles";
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function CarritoPage() {
    const [carrito, setCarrito] = useState(null);
    const [loading, setLoading] = useState(true);
    const [tipoEntrega, setTipoEntrega] = useState("local");
    const [isModalOpen, setIsModalOpen] = useState(false)

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
            setCarrito((prev) => ({
                ...prev,
                articulos: data.carrito.articulos,
                subtotalGeneral: data.carrito.subtotalGeneral,
                ivaGeneral: data.carrito.ivaGeneral,
                totalGeneral: data.carrito.totalGeneral,
            }));
        } catch (error) {
            toast.error(error.message, {
                toastId: "cantidad-error"
            });
            await cargarCarritoSilencioso();
        }
    };

    const removeProducto = async (id) => {
        try {
            const data = await eliminarDelCarrito(id);
            setCarrito((prev) => ({
                ...prev,
                articulos: data.carrito.articulos,
                subtotalGeneral: data.carrito.subtotalGeneral,
                ivaGeneral: data.carrito.ivaGeneral,
                totalGeneral: data.carrito.totalGeneral,
            }));
            toast.success("Producto eliminado del carrito");
        } catch (error) {
            toast.error(error.message, {
                toastId: "cantidad-error"
            });
        }
    };

    const handleVaciarCarrito = async () => {
        try {
            await vaciarCarrito();
            setCarrito(null);
            toast.success("Carrito vaciado correctamente");
            setIsModalOpen(false)
        } catch (error) {
            toast.error(error.message);
        }
    };

    const cargarCarritoSilencioso = async () => {
        try {
            const data = await obtenerCarrito();
            setCarrito(data.carrito);
        } catch (error) {
            toast.error(error.message);
        }
    };

    const hayProblemasStock = (carrito?.articulos || []).some(
        (item) => item.cantidad > (item.stockDisponible ?? Infinity)
    );

    if (loading) return <p className="p-6">Cargando carrito...</p>;

    return (
        <div className="p-6 flex flex-col gap-6">
            <div>
                <p className="text-gray-500">
                    Este módulo te permite visualizar los productos en tu carrito
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <CarritoList
                        carrito={carrito?.articulos || []}
                        onCantidadChange={onCantidadChange}
                        onRemove={removeProducto}
                        onVaciar={() => setIsModalOpen(true)}
                    />
                </div>

                <CarritoResumen
                    carrito={carrito}
                    tipoEntrega={tipoEntrega}
                    setTipoEntrega={setTipoEntrega}
                    disabledPago={hayProblemasStock}
                />
            </div>

            {isModalOpen && (
                <div className="fixed top-0 left-0 right-0 bottom-0 bg-white/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <Card className="w-full max-w-md p-6 bg-emerald-50 border border-emerald-100 shadow-xl rounded-2xl">
                        <h2 className="text-lg font-bold text-gray-800 mb-2">
                            Vaciar carrito
                        </h2>
                        <p className="text-[15px] text-gray-500 mb-6">
                            ¿Está seguro de que desea eliminar todos los productos de su carrito? Esta acción no se puede deshacer.
                        </p>
                        <div className="flex justify-end gap-3">
                            <Button
                                variant="ghost"
                                className={`max-w-[100px] py-[22px] ${buttonOutlineClass}`}
                                onClick={() => setIsModalOpen(false)}
                            >
                                Cancelar
                            </Button>
                            <Button
                                onClick={handleVaciarCarrito}
                                className={`max-w-[100px] ${buttonPrimaryClass}`}
                            >
                                Aceptar
                            </Button>
                        </div>
                    </Card>
                </div>
            )}
        </div>
    );
}