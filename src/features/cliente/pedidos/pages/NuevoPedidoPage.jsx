import { Button } from "@/components/ui/button"
import { buttonPrimaryClass } from "@/utils/styles"
import MetodoPagoSelector from "../../../shared/pagos/components/MetodoPagoSelector"
import TarjetaForm from "../../../shared/pagos/components/TarjetaForm"
import TransferenciaForm from "../../../shared/pagos/components/TransferenciaForm"
import PedidoInfoForm from "../components/PedidoInfoForm"
import PedidoImagenForm from "../components/PedidoImagenForm"
import PedidoDatosForm from "../components/PedidoDatosForm"
import PedidoObservacionesForm from "../components/PedidoObservacionesForm"
import usePedidoForm from "../hooks/usePedidoForm"

export default function NuevoPedidoPage() {
    const pedidoForm = usePedidoForm()

    const {
        form,
        metodoPago,
        setMetodoPago,
        preview,
        fileInputRef,
        handleChange,
        handleImagenChange,
        handleSubmit
    } = pedidoForm
    const mostrarFormulariosPago = false

    return (

        <div className="p-6 space-y-6">

            <p className="text-gray-500">
                Este módulo te permite subir
                una foto con la lista de productos
                requeridos
            </p>

            <div className="grid grid-cols-1 gap-6">

                <PedidoInfoForm
                    form={form}
                    handleChange={handleChange}
                />

                <div className="
                    bg-white/60
                    backdrop-blur-xl
                    rounded-3xl
                    border border-white/20
                    p-6
                    space-y-8
                ">

                    <div className="
                        grid grid-cols-1
                        xl:grid-cols-[1fr_340px]
                        gap-6
                        items-start
                    ">

                        <PedidoImagenForm
                            preview={preview}
                            fileInputRef={fileInputRef}
                            handleImagenChange={handleImagenChange}
                        />

                        <div className="space-y-6">

                            <PedidoDatosForm
                                form={form}
                                handleChange={handleChange}
                            />

                            <PedidoObservacionesForm
                                form={form}
                                handleChange={handleChange}
                            />

                        </div>

                    </div>

                </div>

                <div className="
                    bg-white/60
                    backdrop-blur-xl
                    rounded-3xl
                    border border-white/20
                    p-6
                    space-y-6
                ">

                    <div>

                        <h2 className="text-lg font-semibold text-gray-800">
                            Método de pago
                        </h2>

                        <p className="text-sm text-gray-500">
                            Selecciona cómo deseas pagar
                        </p>

                    </div>

                    <MetodoPagoSelector
                        metodoSeleccionado={metodoPago}
                        setMetodoSeleccionado={setMetodoPago}
                    />

                    {mostrarFormulariosPago && metodoPago === "tarjeta" && (
                        <div className="pt-4">
                            <TarjetaForm />
                        </div>
                    )}

                    {mostrarFormulariosPago && metodoPago === "transferencia" && (
                        <div className="pt-4">
                            <TransferenciaForm />
                        </div>
                    )}

                    {metodoPago === "efectivo" && (
                        <div className="
                            mt-4
                            rounded-2xl
                            bg-emerald-50
                            border
                            border-emerald-100
                            p-4
                        ">
                            <p className="text-sm text-emerald-800">
                                El pago se realizará al momento de la entrega.
                            </p>
                        </div>
                    )}

                </div>

                <div className="
                    bg-white/60
                    backdrop-blur-xl
                    rounded-3xl
                    border border-white/20
                    p-6
                    space-y-6
                ">

                    <Button
                        onClick={handleSubmit}
                        className={buttonPrimaryClass}
                    >
                        Enviar
                    </Button>

                </div>

            </div>

        </div>
    )
}