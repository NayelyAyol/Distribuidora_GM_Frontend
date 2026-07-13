import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { buttonPrimaryClass } from "@/utils/styles";
import MetodoPagoSelector from "../../../shared/pagos/components/MetodoPagoSelector";
import TransferenciaForm from "../../../shared/pagos/components/TransferenciaForm";
import TarjetaForm from "../../../shared/pagos/components/TarjetaForm";
import PedidoInfoForm from "../../../cliente/pedidos/components/PedidoInfoForm";
import PedidoDireccionForm from "../../../cliente/pedidos/components/PedidoDireccionForm";
import PedidoDatosForm from "../../../cliente/pedidos/components/PedidoDatosForm";
import ResumenPago from "@/features/shared/pagos/components/ResumenPago";
import usePedidoForm from "../../../cliente/pedidos/hooks/usePedidoForm";
import { useState, useEffect } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { pagarCarritoTarjeta } from "../services/carritoService";
import { FiArrowLeft } from "react-icons/fi";
import validarIdentificacion from "@/utils/validarIdentificacion";

export default function SeleccionMetodoPagoPage() {
    const navigate = useNavigate();
    const location = useLocation();

    const [datosTarjeta, setDatosTarjeta] = useState({
        numero: "",
        mmAA: "",
        cvv: ""
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const stripe = useStripe();
    const elements = useElements();

    const {
        form,
        setForm,
        handleChange,
        metodoPago,
        setMetodoPago,
        errors,
        setErrors
    } = usePedidoForm();

    const checkout = location.state?.checkout || {};

    const {
        pedido,
        carrito = [],
        resumenPago = {},
        esPedidoFoto = false,
        tipoEntrega,
        metodoPago: metodoPagoInicial
    } = checkout;

    const totalPedidoFoto =
        checkout?.resumenPago?.totalPagar || 0;

    const pedidoId = checkout?.pedidoId;

    const [resumenOriginal, setResumenOriginal] = useState(null);


    useEffect(() => {
        if (metodoPagoInicial) {
            setMetodoPago(metodoPagoInicial);
        }
    }, [metodoPagoInicial]);

    useEffect(() => {
        const df = checkout?.pedido?.datosFacturacion || {};
        const de = checkout?.pedido?.direccionEntrega || {};

        setForm(prev => ({
            ...prev,
            nombreCompleto: df.nombreCompleto || "",
            identificacion: df.identificacion || "",
            correo: df.correo || "",
            telefono: df.telefono || "",
            direccion: de.direccion || "",
            referencia: de.referencia || "",
            observaciones: checkout?.pedido?.observaciones || "",
            nombrePedido: checkout?.pedido?.nombrePedido || ""
        }));
    }, []);


    const rutaConfirmacion = location.pathname.includes("/mis-pedidos")
        ? "/dashboard/mis-pedidos/pago/confirmar-pago"
        : "/dashboard/mi-carrito/pago/confirmar-pago";

    const validarFormulario = () => {
        const newErrors = {}

        if (!form.nombrePedido.trim())
            newErrors.nombrePedido = "Ingrese el nombre del pedido"
        else if (form.nombrePedido.trim().length < 5)
            newErrors.nombrePedido = "El nombre del pedido debe tener mínimo 5 caracteres"
        else if (!/^[A-Za-z0-9ÁÉÍÓÚáéíóúÑñ\s,.;]+$/.test(form.nombrePedido.trim()))            
            newErrors.nombrePedido = "Solo se permiten letras, números, espacios, comas, puntos y punto y coma";

        if (!form.nombreCompleto.trim())
            newErrors.nombreCompleto = "Ingrese el nombre completo"
        else if (form.nombreCompleto.trim().length < 3)
            newErrors.nombreCompleto = "El nombre completo debe tener mínimo 3 caracteres"
        else if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(form.nombreCompleto.trim()))
            newErrors.nombreCompleto = "El nombre solo puede contener letras"

        if (!form.identificacion.trim())
            newErrors.identificacion = "Ingrese la identificación"
        else if (!/^\d+$/.test(form.identificacion))
            newErrors.identificacion = "Solo debe contener números"
        else if (form.identificacion.length !== 10 && form.identificacion.length !== 13)
            newErrors.identificacion = "Debe tener 10 (cédula) o 13 (RUC) dígitos"
        else if (!validarIdentificacion(form.identificacion))
            newErrors.identificacion = "Ingrese una cédula o RUC válido"

        if (!form.correo.trim())
            newErrors.correo = "Ingrese el correo"
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.correo))
            newErrors.correo = "Ingrese un correo válido"

        if (!form.telefono.trim())
            newErrors.telefono = "Ingrese el teléfono"
        else if (!/^\d{10}$/.test(form.telefono))
            newErrors.telefono = "El teléfono debe tener 10 dígitos"
        else if (!/^09\d{8}$/.test(form.telefono))
            newErrors.telefono = "Ingrese un celular ecuatoriano válido (09XXXXXXXX)"

        if (tipoEntrega === "domicilio") {
            if (!form.direccion.trim())
                newErrors.direccion = "Ingrese la dirección"
            else if (form.direccion.trim().length < 3)
                newErrors.direccion = "La dirección debe tener mínimo 3 caracteres"

            if (!form.referencia.trim())
                newErrors.referencia = "Ingrese una referencia"
            else if (form.referencia.trim().length < 3)
                newErrors.referencia = "La referencia debe tener mínimo 3 caracteres"
        }

        if (!metodoPago) {
            toast.error("Seleccione un método de pago") 
        }

        if (Object.keys(newErrors).length > 0) {
            toast.error("Revisa los campos en rojo, falta completar o corregir información")
        }

        if (Object.keys(newErrors).length > 0 || !metodoPago) {
            setErrors(newErrors)
            return false
        }

        return true
    }

    const handleContinuar = () => {
        if (!validarFormulario()) return;

        setIsSubmitting(true);

        try {
            navigate(rutaConfirmacion, {
                state: {
                    esPedidoFoto,
                    tipoEntrega,
                    metodoPago,
                    datosPedido: form,
                    carrito
                }
            });
        } catch (error) {
            toast.error("Ocurrió un error al procesar la solicitud");
            setIsSubmitting(false);
        }
    };

    const handleConfirmarPago = async () => {
        if (!stripe || !elements) return;

        setIsSubmitting(true);

        const cardElement = elements.getElement(CardElement);

        const { error, paymentMethod } =
            await stripe.createPaymentMethod({
                type: "card",
                card: cardElement
            });

        if (error) {
            toast.error(error.message);
            setIsSubmitting(false);
            return;
        }

        try {
            const payload = {
                ...form,
                paymentMethodId: paymentMethod.id,
                carrito
            };

            await pagarCarritoTarjeta(payload);

            toast.success("Pago realizado con éxito");
            navigate("/dashboard/gracias");
        } catch (err) {
            toast.error(err.message || "Error al procesar el pago");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleAccionBoton = async () => {
        if (!validarFormulario()) return;

        setIsSubmitting(true);

        try {
            let paymentMethodId = null;

            if (metodoPago === "TARJETA") {
                const { error, paymentMethod } =
                    await stripe.createPaymentMethod({
                        type: "card",
                        card: elements.getElement(CardElement)
                    });

                if (error) throw new Error(error.message);
                paymentMethodId = paymentMethod.id;
            }

            navigate(rutaConfirmacion, {
                state: {
                    checkout: {
                        ...checkout,
                        metodoPago,
                        paymentMethodId,
                        form
                    }
                },
                replace: true
            });
        } catch (err) {
            toast.error(err.message || "Error al procesar el pago");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="p-4 md:p-6 max-w-7xl mx-auto flex flex-col gap-6">
            <div>
                <p className="text-gray-500">
                    Este módulo te permite completar los datos de facturación y seleccionar un método de pago
                </p>
            </div>

            {!esPedidoFoto && (
                <PedidoInfoForm
                    form={form}
                    handleChange={handleChange}
                    errors={errors}
                />
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                <div className="lg:col-span-2 flex flex-col gap-6">

                    <div className="bg-white/60 backdrop-blur-xl rounded-3xl border border-white/20 p-6 shadow-sm">
                        {esPedidoFoto ? (
                            <div className="bg-white/60 rounded-3xl">
                                <div className="flex items-center gap-4 mb-6">
                                    <button
                                        onClick={() => navigate(-1)}
                                        className="w-11 h-11 rounded-xl bg-white shadow-sm border border-gray-100 flex items-center justify-center hover:bg-gray-50 transition shrink-0"
                                    >
                                        <FiArrowLeft className="text-xl text-gray-700" />
                                    </button>
                                    <h2 className="text-xl font-bold text-gray-800">
                                        Datos para facturación
                                    </h2>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-9 gap-y-6 pl-3">
                                    <div>
                                        <p className="text-sm text-gray-500">Nombre</p>
                                        <p className="font-semibold text-gray-800">
                                            {form.nombreCompleto}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-sm text-gray-500">Identificación</p>
                                        <p className="font-semibold text-gray-800">
                                            {form.identificacion}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-sm text-gray-500">Teléfono</p>
                                        <p className="font-semibold text-gray-800">
                                            {form.telefono}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-sm text-gray-500">Dirección</p>
                                        <p className="font-semibold text-gray-800">
                                            {form.direccion || "N/A"}
                                        </p>
                                    </div>
                                </div>

                                <p className="text-xs text-emerald-600 mt-6 italic pl-3">
                                    * Los datos de facturación fueron cargados de tu pedido original.
                                </p>
                            </div>
                        ) : (
                            <PedidoDatosForm
                                form={form}
                                handleChange={handleChange}
                                errors={errors}
                            />
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {tipoEntrega === "domicilio" && (
                            <PedidoDireccionForm
                                form={form}
                                handleChange={handleChange}
                                errors={errors}
                            />
                        )}

                        <div className={`bg-white/60 backdrop-blur-xl rounded-3xl border border-white/20 p-6 shadow-sm ${tipoEntrega !== "domicilio" ? "md:col-span-2" : ""}`}>
                            <h2 className="text-lg font-semibold text-gray-800">
                                Observaciones
                            </h2>

                            {esPedidoFoto ? (
                                <p className="mt-2 text-sm text-gray-600 bg-gray-50 p-4 rounded-xl border border-gray-100">
                                    {form.observaciones || "Sin observaciones adicionales."}
                                </p>
                            ) : (
                                <textarea
                                    name="observaciones"
                                    value={form.observaciones}
                                    onChange={handleChange}
                                    placeholder="Ejemplo: Necesito entrega urgente..."
                                    maxLength={150}
                                    className="w-full rounded-2xl border border-gray-200 p-4 h-[120px] mt-2 resize-none outline-none focus:ring-2 focus:ring-emerald-200"
                                />
                            )}
                        </div>
                    </div>

                    <div className="bg-white/60 backdrop-blur-xl rounded-3xl border border-white/20 p-6 shadow-sm">
                        <MetodoPagoSelector
                            metodoSeleccionado={metodoPago}
                            setMetodoSeleccionado={setMetodoPago}
                        />

                        <div className="mt-6">
                            {metodoPago === "TRANSFERENCIA" && (
                                <TransferenciaForm />
                            )}
                            {metodoPago === "TARJETA" && (
                                <TarjetaForm onUpdate={setDatosTarjeta} />
                            )}
                        </div>
                    </div>
                </div>

                <div className="lg:sticky lg:top-6 flex flex-col gap-4">
                    <ResumenPago
                        carrito={carrito}
                        esPedidoFoto={esPedidoFoto}
                        tipoEntrega={tipoEntrega}
                        resumenDatos={checkout.resumenPago || checkout.pedido?.resumenPago}
                        totalPedidoFoto={totalPedidoFoto}
                    />

                    <Button
                        className={`${buttonPrimaryClass} w-full h-12 text-base`}
                        onClick={handleAccionBoton}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Procesando..." : "Continuar"}
                    </Button>
                </div>
            </div>
        </div>
    );
}