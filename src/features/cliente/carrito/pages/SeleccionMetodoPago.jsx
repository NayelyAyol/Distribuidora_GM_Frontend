import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { FiArrowLeft } from "react-icons/fi";
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

export default function SeleccionMetodoPagoPage() {
    const navigate = useNavigate();
    const location = useLocation();

    const {
        form,
        handleChange,
        metodoPago,
        setMetodoPago
    } = usePedidoForm();

    const tipoEntrega = location.state?.tipoEntrega || "local";
    const carrito = location.state?.carrito || [];
    const esPedidoFoto = location.state?.esPedidoFoto || false;

    const rutaConfirmacion = location.pathname.includes("/mis-pedidos")
        ? "/dashboard/mis-pedidos/pago/confirmar-pago"
        : "/dashboard/mi-carrito/pago/confirmar-pago";

    const validarFormulario = () => {
        if (!form.nombrePedido.trim()) {
            toast.error("Ingrese el nombre del pedido");
            return false;
        }

        if (form.nombrePedido.trim().length < 5) {
            toast.error("El nombre del pedido debe tener mínimo 5 caracteres");
            return false;
        }

        if (form.nombrePedido.trim().length > 60) {
            toast.error("El nombre del pedido no puede exceder los 60 caracteres");
            return false;
        }

        if (!form.nombreCompleto.trim()) { toast.error("Ingrese el nombre completo"); return false; }
        
        if (!form.identificacion.trim()) { toast.error("Ingrese la identificación"); return false; }
        
        if (!/^\d+$/.test(form.identificacion)) { toast.error("La identificación solo debe contener números"); return false; }
        
        if (form.identificacion.length !== 10 && form.identificacion.length !== 13) {
            toast.error("La identificación debe tener 10 si es una cédula o 13 dígitos si es un RUC");
            return false;
        }
        if (!form.correo.trim()) 
            { toast.error("Ingrese el correo"); return false; }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!emailRegex.test(form.correo)) 
            { toast.error("Ingrese un correo válido"); return false; }
        
        if (!form.telefono.trim()) 
            { toast.error("Ingrese el teléfono"); return false; }
        
        if (!/^\d{10}$/.test(form.telefono)) 
            { toast.error("El teléfono debe tener 10 dígitos"); return false; }

        if (tipoEntrega === "domicilio") {
            if (!form.direccion.trim()) { toast.error("Ingrese la dirección"); return false; }
            if (!form.referencia.trim()) { toast.error("Ingrese una referencia"); return false; }
        }

        if (!metodoPago) { toast.error("Seleccione un método de pago"); return false; }
        return true;
    };

    const handleContinuar = () => {
        if (!validarFormulario()) return;
        navigate(rutaConfirmacion, {
            state: { esPedidoFoto, tipoEntrega, metodoPago, datosPedido: form, carrito }
        });
    };

    return (
        <div className="p-4 md:p-6 max-w-7xl mx-auto flex flex-col gap-6">
                <div>

                    <p className="text-gray-500">
                        Este módulo te permite completar los datos de facturación y seleccionar un método de pago
                    </p>

                </div>

{/*
            <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-gray-600 hover:text-emerald-700 transition font-medium w-fit"
            >
                <FiArrowLeft size={20} />
                Volver al carrito
            </button>
*/}
                <PedidoInfoForm
                    form={form}
                    handleChange={handleChange}
                />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">

                <div className="lg:col-span-2 flex flex-col gap-6">
                    <div className="bg-white/60 backdrop-blur-xl rounded-3xl border border-white/20 p-6 shadow-sm">
                        <PedidoDatosForm form={form} handleChange={handleChange} />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {tipoEntrega === "domicilio" && (
                            <PedidoDireccionForm form={form} handleChange={handleChange} />
                        )}

                        <div className={`bg-white/60 backdrop-blur-xl rounded-3xl border border-white/20 p-6 shadow-sm ${tipoEntrega !== "domicilio" ? "md:col-span-2" : ""}`}>
                            <h2 className="text-lg font-semibold text-gray-800">Observaciones</h2>
                            <p className="text-sm text-gray-500 mb-4">Información adicional del pedido</p>
                            <textarea
                                name="observaciones"
                                value={form.observaciones}
                                onChange={handleChange}
                                placeholder="Ejemplo: Necesito entrega urgente..."
                                maxLength={150}
                                className="w-full rounded-2xl border border-gray-200 p-4 h-[120px] resize-none outline-none focus:ring-2 focus:ring-emerald-200"
                            />
                            <p className="text-xs text-gray-400 text-right mt-1">{form.observaciones.length}/150</p>
                        </div>
                    </div>

                    <div className="bg-white/60 backdrop-blur-xl rounded-3xl border border-white/20 p-6 shadow-sm">
                        <MetodoPagoSelector 
                            metodoSeleccionado={metodoPago} 
                            setMetodoSeleccionado={setMetodoPago} 
                        />
                        <div className="mt-6">
                            {metodoPago === "TRANSFERENCIA" && <TransferenciaForm />}
                            {metodoPago === "TARJETA" && <TarjetaForm />}
                        </div>
                    </div>
                </div>

                <div className="lg:sticky lg:top-6 flex flex-col gap-4">
                    <ResumenPago
                        carrito={carrito}
                        esPedidoFoto={esPedidoFoto}
                        tipoEntrega={tipoEntrega}
                    />
                    <Button
                        className={`${buttonPrimaryClass} w-full h-12 text-base`}
                        onClick={handleContinuar}
                    >
                        Continuar
                    </Button>
                </div>
            </div>
        </div>
    );
}