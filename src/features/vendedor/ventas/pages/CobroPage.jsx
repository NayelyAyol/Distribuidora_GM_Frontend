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

    const validarIdentificacion = (numero = '') => {
        numero = String(numero).trim();
        if (!/^\d{10}$/.test(numero) && !/^\d{13}$/.test(numero)) return false;
        if (/^(\d)\1+$/.test(numero)) return false;
        const provincia = parseInt(numero.substring(0, 2), 10);
        if ((provincia < 1 || provincia > 24) && provincia !== 30) return false;
        const digitos = numero.substring(0, 9).split('').map(Number);
        const verificador = parseInt(numero.charAt(9), 10);
        const coeficientes = [2, 1, 2, 1, 2, 1, 2, 1, 2];
        let suma = 0;
        for (let i = 0; i < coeficientes.length; i++) {
            let valor = digitos[i] * coeficientes[i];
            suma += valor > 9 ? valor - 9 : valor;
        }
        const resultado = suma % 10 === 0 ? 0 : 10 - (suma % 10);
        if (numero.length === 10) {
            return resultado === verificador;
        }
        if (numero.length === 13) {
            const establecimiento = numero.substring(10, 13);
            return establecimiento !== '000' && resultado === verificador;
        }
        return false;
    };

    const validarDatos = () => {
        if (!datosFacturacion.nombreCompleto.trim()) {
            toast.error("Ingrese nombre completo");
            return false;
        }

        if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(datosFacturacion.nombreCompleto.trim())) {
            toast.error("El nombre solo puede contener letras");
            return false;
        }

        const id = datosFacturacion.identificacion.trim();
        if (id.length !== 10 && id.length !== 13) {
            toast.error("La identificación debe tener 10 o 13 dígitos");
            return false;
        }
        if (!validarIdentificacion(id)) {
            toast.error("Ingrese una cédula o RUC válido");
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

        if (!/^09\d{8}$/.test(datosFacturacion.telefono)) {
            toast.error("Ingrese un celular ecuatoriano válido (09XXXXXXXX)");
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

useEffect(() => {
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