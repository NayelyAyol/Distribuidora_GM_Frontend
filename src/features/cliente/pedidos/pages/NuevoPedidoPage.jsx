import { Button } from "@/components/ui/button"
import { buttonPrimaryClass } from "@/utils/styles"
import PedidoInfoForm from "../components/PedidoInfoForm"
import PedidoImagenForm from "../components/PedidoImagenForm"
import PedidoDatosForm from "../components/PedidoDatosForm"
import PedidoObservacionesForm from "../components/PedidoObservacionesForm"
import usePedidoForm from "../hooks/usePedidoForm"
import PedidoEntregaForm from "../components/PedidoEntregaForm"
import ContactoAtencionCliente from "../components/ContactoAtencionCliente"
import PedidoDireccionForm from "../components/PedidoDireccionForm"
import { useNavigate } from "react-router-dom"

export default function NuevoPedidoPage() {
    const pedidoForm = usePedidoForm()
    const navigate = useNavigate()


    const {
        form,
        loading,
        preview,
        fileInputRef,
        handleChange,
        handleImagenChange,
        handleSubmit,
        errors
    } = pedidoForm

    const handleEnviarFormulario = async () => {
        const esExitoso = await handleSubmit()
        if (esExitoso) {
            navigate(-1)
        }
    }

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
                    errors={errors}
                />

                <div
                    className="
                        bg-white/60
                        backdrop-blur-xl
                        rounded-3xl
                        border border-white/20
                        p-6
                        space-y-8
                    "
                >

                    <div
                        className="
                            grid grid-cols-1
                            xl:grid-cols-[1fr_340px]
                            gap-6
                            items-stretch
                        "
                    >

                        <PedidoImagenForm
                            preview={preview}
                            fileInputRef={fileInputRef}
                            handleImagenChange={handleImagenChange}
                            errors={errors}
                        />

                        <div className="space-y-6">

                            <PedidoDatosForm
                                form={form}
                                handleChange={handleChange}
                                errors={errors}
                            />

                            <PedidoObservacionesForm
                                form={form}
                                handleChange={handleChange}
                            />

                        </div>

                    </div>

                </div>

                <div
                    className="
                        grid
                        grid-cols-1
                        lg:grid-cols-[1fr_400px]
                        gap-6
                        items-start
                    "
                >

                    <ContactoAtencionCliente
                        className="h-full"
                    />

                    <div className="space-y-6">

                        <PedidoEntregaForm
                            form={form}
                            handleChange={handleChange}
                        />

                        {form.tipoEntrega === "ENVIO_DOMICILIO" && (
                            <PedidoDireccionForm
                                form={form}
                                handleChange={handleChange}
                                errors={errors}
                            />
                        )}

                    </div>

                </div>

                <div
                    className="
                        bg-white/60
                        backdrop-blur-xl
                        rounded-3xl
                        border border-white/20
                        p-6
                        space-y-6
                    "
                >

                    <Button
                        type="button"
                        onClick={handleEnviarFormulario}
                        disabled={loading}
                        className={buttonPrimaryClass}
                    >
                        {loading ? "Enviando":"Enviar"}
                    </Button>

                </div>

            </div>

        </div>
    )
}