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

export default function NuevoPedidoPage() {
    const pedidoForm = usePedidoForm()

    const {
        form,
        preview,
        fileInputRef,
        handleChange,
        handleImagenChange,
        handleSubmit
    } = pedidoForm

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
                            items-start
                        "
                    >

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

                        {form.tipoEntrega === "envio" && (
                            <PedidoDireccionForm
                                form={form}
                                handleChange={handleChange}
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