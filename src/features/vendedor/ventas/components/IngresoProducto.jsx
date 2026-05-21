import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { inputClass, buttonPrimaryClass, buttonOutlineClass } from "@/utils/styles"
import { FiSearch } from "react-icons/fi"
import { Html5QrcodeScanner } from "html5-qrcode"


export default function IngresoProducto({ onAdd }) {

    const [codigo, setCodigo] = useState("")
    const [scannerOpen, setScannerOpen] = useState(false)

    useEffect(() => {

        if (!scannerOpen) return

        const scanner = new Html5QrcodeScanner(
            "reader",
            { fps: 10, qrbox: 250 }
        )

        scanner.render((decodedText) => {

            const producto = {
                id: decodedText,
                nombre: "Producto " + decodedText,
                precio: 10
            }

            onAdd(producto)
            setScannerOpen(false)

            scanner.clear()
        })

        return () => {
            scanner.clear().catch(() => { })
        }

    }, [scannerOpen])

    const handleAgregar = () => {

        if (!codigo.trim()) return

        const producto = {
            id: codigo,
            nombre: "Producto " + codigo,
            precio: 10
        }

        onAdd(producto)
        setCodigo("")
    }

    return (
        <div className="bg-white/60 backdrop-blur-xl rounded-2xl border border-white/20 p-6 shadow-lg space-y-5">

            <h2 className="text-lg font-bold text-emerald-900">
                Ingreso de producto
            </h2>

            <p className="text-sm text-gray-500">
                Escanea o ingresa el código manualmente
            </p>

            <div className="flex items-center bg-white rounded-full border border-gray-100 shadow-sm">

                <Input
                    value={codigo}
                    onChange={(e) => setCodigo(e.target.value.replace(/\D/g, ""))}
                    onKeyDown={(e) => e.key === "Enter" && handleAgregar()}
                    placeholder="Código de barras o manual"
                    className={`${inputClass} bg-transparent border-0 focus:ring-0`}
                />

                <button
                    onClick={handleAgregar}
                    className="rounded-full flex items-center justify-center h-12 px-6 bg-emerald-700/10 hover:bg-emerald-100 text-emerald-800 transition"
                >
                    <FiSearch className="text-xl" />
                </button>

            </div>
            {/*
            <Button
                onClick={() => setScannerOpen(true)}
                className={`${buttonOutlineClass} py-5`}
            >
                Escanear con cámara
            </Button>*/}

            <Button
                onClick={handleAgregar}
                className={buttonPrimaryClass}
            >
                Agregar producto
            </Button>

            {scannerOpen && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[9999]">

                    <div className="bg-white p-6 rounded-2xl w-[350px] space-y-4">

                        <h2 className="font-bold text-emerald-900">
                            Escanear producto
                        </h2>

                        <div id="reader" className="w-full" />

                        <Button
                            onClick={() => setScannerOpen(false)}
                            className="w-full bg-emerald-100 text-gray-700 hover:bg-emerald-200 transition"
                        >
                            Cerrar
                        </Button>

                    </div>

                </div>
            )}

        </div>
    )
}