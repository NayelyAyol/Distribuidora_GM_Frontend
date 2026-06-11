import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

import MetodoPagoSelector from "../../../shared/pagos/components/MetodoPagoSelector";
import ResumenPagoVenta from "../components/ResumenPagoVenta";
import TarjetaForm from "../../../shared/pagos/components/TarjetaForm";
import TransferenciaForm from "../../../shared/pagos/components/TransferenciaForm";
import PedidoDatosForm from "@/features/cliente/pedidos/components/PedidoDatosForm";

import { buttonPrimaryClass } from "@/utils/styles";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";

import useVentaStore from "../context/useVentaStore";

export default function CobroPage() {

    const navigate = useNavigate();

    const {
        factura,
        pedidoSeleccionado,
        metodoPago,
        setMetodoPago,
        datosFacturacion,
        setDatosFacturacion
    } = useVentaStore();

    useEffect(() => {
        if (!factura || factura.length === 0) {
            navigate("/dashboard/ventas");
        }
    }, []);

    const [metodoSeleccionado, setMetodoSeleccionado] = useState(metodoPago || "");

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "nombreCompleto" && !/^[\p{L}\s]*$/u.test(value)) return;
        if (name === "telefono" && (!/^\d*$/.test(value) || value.length > 10)) return;
        if (name === "identificacion" && (!/^\d*$/.test(value) || value.length > 13)) return;

        setDatosFacturacion({
            ...datosFacturacion,
            [name]: value
        });
    };

    const validarDatos = () => {
        if (!datosFacturacion.nombreCompleto.trim()) {
            toast.error("Ingrese nombre completo");
            return false;
        }

        const id = datosFacturacion.identificacion.trim();
        if (id.length !== 10 && id.length !== 13) {
            toast.error("La identificación debe tener 10 o 13 dígitos");
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(datosFacturacion.correo)) {
            toast.error("Correo inválido");
            return false;
        }

        if (datosFacturacion.telefono.length !== 10) {
            toast.error("El teléfono debe tener 10 dígitos");
            return false;
        }

        if (!metodoSeleccionado) {
            toast.error("Seleccione un método de pago");
            return false;
        }

        return true;
    };

    const handleContinuar = () => {
        if (!validarDatos()) return;

        setMetodoPago(metodoSeleccionado);

        if (!pedidoSeleccionado) {
            navigate("/dashboard/ventas/cobro/confirmacion-venta");
        } else {
            navigate("/dashboard/ventas/cobro/confirmacion-venta");
        }
    };

    const esVentaDirecta = !pedidoSeleccionado;

    console.log("FACTURA:", factura);
console.log("PEDIDO:", pedidoSeleccionado);
console.log("METODO:", metodoPago);
console.log("DATOS:", datosFacturacion);

useEffect(() => {
    console.log("STORE COMPLETO", useVentaStore.getState());
}, []);
    return (
        <div className="p-6 flex flex-col gap-6">

            <p className="text-gray-500">
                Este módulo te permite completar los datos para realizar una venta
            </p>

            <button
                onClick={() => navigate(-1)}
                className="w-fit flex items-center gap-2 text-gray-600 hover:text-emerald-700 transition font-medium"
            >
                <FiArrowLeft size={20} />
                <span>Volver a Ventas</span>
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">

                <div className="lg:col-span-2 flex flex-col gap-6">

                    <div className="bg-white/60 backdrop-blur-xl rounded-3xl border border-white/20 p-6 shadow-sm">
                        <PedidoDatosForm
                            form={datosFacturacion}
                            handleChange={handleChange}
                        />
                    </div>

                    <MetodoPagoSelector
                        metodoSeleccionado={metodoSeleccionado}
                        setMetodoSeleccionado={setMetodoSeleccionado}
                        esVentaDirecta={esVentaDirecta}
                    />

                    {metodoSeleccionado === "TRANSFERENCIA" && <TransferenciaForm />}
                    {metodoSeleccionado === "TARJETA" && <TarjetaForm />}

                </div>

                <div className="flex flex-col gap-4">

                    <ResumenPagoVenta
                        factura={factura}
                        tipoEntrega={pedidoSeleccionado?.tipoEntrega}
                    />

                    {metodoSeleccionado && (
                        <Button
                            onClick={handleContinuar}
                            className={buttonPrimaryClass}
                        >
                            Continuar a Confirmación
                        </Button>
                    )}

                </div>

            </div>
        </div>
    );
}