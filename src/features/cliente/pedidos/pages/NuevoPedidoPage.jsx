import { FiImage } from "react-icons/fi"

import { Button } from "@/components/ui/button"
import { buttonPrimaryClass } from "@/utils/styles"

import MetodoPagoSelector
from "../../../shared/pagos/components/MetodoPagoSelector"

import ResumenPago
from "../../../shared/pagos/components/ResumenPago"

import TarjetaForm
from "../../../shared/pagos/components/TarjetaForm"

import TransferenciaForm
from "../../../shared/pagos/components/TransferenciaForm"

import PedidoInfoForm
from "../components/PedidoInfoForm"

import PedidoImagenForm
from "../components/PedidoImagenForm"

import PedidoDireccionForm
from "../components/PedidoDireccionForm"

import PedidoObservacionesForm
from "../components/PedidoObservacionesForm"

import usePedidoForm
from "../hooks/usePedidoForm"

export default function NuevoPedidoPage() {

    const pedidoForm = usePedidoForm()

    const {
        form,

        metodoPago,
        setMetodoPago,

        imagen,

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

            <div className="
                grid grid-cols-1
                gap-6
            ">

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

                            <PedidoDireccionForm
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

                        <h2 className="
                            text-lg
                            font-semibold
                            text-gray-800
                        ">
                            Método de pago
                        </h2>

                        <p className="
                            text-sm
                            text-gray-500
                        ">
                            Selecciona cómo deseas pagar
                        </p>

                    </div>

                    <MetodoPagoSelector
                        metodoSeleccionado={metodoPago}
                        setMetodoSeleccionado={setMetodoPago}
                    />

                    {
                        metodoPago === "tarjeta"
                        && (
                            <div className="pt-4">
                                <TarjetaForm />
                            </div>
                        )
                    }

                    {
                        metodoPago === "transferencia"
                        && (
                            <div className="pt-4">
                                <TransferenciaForm />
                            </div>
                        )
                    }

                    {
                        metodoPago === "efectivo"
                        && (

                            <div
                                className="
                                    mt-4
                                    rounded-2xl
                                    bg-emerald-50
                                    border
                                    border-emerald-100
                                    p-4
                                "
                            >

                                <p className="
                                    text-sm
                                    text-emerald-800
                                ">
                                    El pago se realizará
                                    al momento de la entrega.
                                </p>

                            </div>

                        )
                    }

                </div>

                <div className="
                    bg-white/60
                    backdrop-blur-xl
                    rounded-3xl
                    border border-white/20
                    p-6
                    space-y-6
                ">

                    <div
                        className="
                            rounded-2xl
                            bg-emerald-50
                            p-4
                            flex items-center gap-4
                        "
                    >

                        <div
                            className="
                                w-12
                                h-12
                                rounded-xl
                                bg-emerald-100
                                flex items-center
                                justify-center
                            "
                        >

                            <FiImage
                                className="
                                    text-xl
                                    text-emerald-700
                                "
                            />

                        </div>

                        <div>

                            <p className="
                                font-medium
                                text-gray-800
                            ">
                                Imagen subida
                            </p>

                            <p className="
                                text-sm
                                text-gray-500
                            ">
                                {
                                    imagen
                                        ? imagen.name
                                        : "Sin archivo seleccionado"
                                }
                            </p>

                        </div>

                    </div>

                    <ResumenPago productos={[]} />

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