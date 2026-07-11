import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { inputClass, buttonPrimaryClass } from "@/utils/styles"
import { FiSearch } from "react-icons/fi"
import { Html5QrcodeScanner } from "html5-qrcode"
import { Explorar } from "../../../catalogo/services/catalogoService"

export default function IngresoProducto({ onAdd }) {

    const [codigo, setCodigo] = useState("")
    const [scannerOpen, setScannerOpen] = useState(false)

    const [productos, setProductos] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {

        if (!scannerOpen) return

        const scanner = new Html5QrcodeScanner(
            "reader",
            { fps: 10, qrbox: 250 }
        )

        scanner.render(async (decodedText) => {

            try {

                const data = await Explorar({
                    buscar: decodedText,
                    page: 1,
                    limit: 20
                })

                const productoEncontrado = data?.productos?.[0]

                if (productoEncontrado) {
                    onAdd({
                        id: productoEncontrado._id,
                        nombre: productoEncontrado.nombre,
                        precio: productoEncontrado.precioVenta,
                        stock: productoEncontrado.stock,
                        tieneIva: productoEncontrado.tipoIVA === "15%",
                        precioMayorista: productoEncontrado.precioMayorista ?? 0,
                        cantidadMinimaMayorista: productoEncontrado.cantidadMinimaMayorista ?? 0,
                        imagen: productoEncontrado.imagen ?? null 
                    })
                }

            } catch (error) {
                console.error(error)
            }

            setScannerOpen(false)

            scanner.clear()
        })

        return () => {
            scanner.clear().catch(() => { })
        }

    }, [scannerOpen])

    useEffect(() => {

        const buscarProductos = async () => {

            const texto = codigo.trim()

            if (texto.length < 2) {
                setProductos([])
                return
            }

            try {

                setLoading(true)

                const data = await Explorar({
                    buscar: texto,
                    page: 1,
                    limit: 20
                })

                setProductos(data?.productos || [])

            } catch (error) {

                console.error(error)
                setProductos([])

            } finally {

                setLoading(false)

            }
        }

        const delay = setTimeout(() => {
            buscarProductos()
        }, 400)

        return () => clearTimeout(delay)

    }, [codigo])

    const seleccionarProducto = (producto) => {

        onAdd({
            id: producto._id,
            nombre: producto.nombre,
            precio: producto.precioVenta,
            stock: producto.stock,
            tieneIva: producto.tipoIVA === "15%",
            precioMayorista: producto.precioMayorista ?? 0,
            cantidadMinimaMayorista: producto.cantidadMinimaMayorista ?? 0,
            imagen: producto.imagen ?? null
        })

        setCodigo("")
        setProductos([])
    }

    const handleAgregar = () => {

        if (productos.length === 1) {
            seleccionarProducto(productos[0])
        }
    }

    return (
        <div className="bg-white/60 backdrop-blur-xl rounded-2xl border border-white/20 p-6 shadow-lg space-y-5">

            <h2 className="text-lg font-bold text-emerald-900">
                Ingreso de producto
            </h2>

            <div className="flex items-center bg-white rounded-full border border-gray-100 shadow-sm">

                <Input
                    value={codigo}
                        onChange={(e) => {
                        const value = e.target.value;
                        if (!/^[\p{L}\p{N}\s]*$/u.test(value)) return;
                        setCodigo(value);
                    }}
                    onKeyDown={(e) => e.key === "Enter" && handleAgregar()}
                    placeholder="Buscar producto por nombre..."
                    className={`${inputClass} bg-transparent border-0 focus:ring-0 placeholder:text-sm`}
                />

                <button
                    onClick={handleAgregar}
                    className="rounded-full flex items-center justify-center h-12 px-6 bg-emerald-700/10 hover:bg-emerald-100 text-emerald-800 transition"
                >
                    <FiSearch className="text-xl" />
                </button>

            </div>

            {productos.length > 0 && (
                <div className="bg-white border border-gray-200 rounded-xl shadow-sm max-h-64 overflow-y-auto">

                    {productos.map((producto) => (

                        <button
                            key={producto._id}
                            onClick={() => seleccionarProducto(producto)}
                            className="w-full text-left p-3 hover:bg-emerald-50 border-b transition"
                        >
                            <div className="flex items-center gap-3">

                                <img
                                    src={
                                        producto.imagen?.url ||
                                        "https://via.placeholder.com/60"
                                    }
                                    alt={producto.nombre}
                                    className="w-14 h-14 rounded-lg object-cover border"
                                />

                                <div>
                                    <p className="font-medium text-gray-800">
                                        {producto.nombre}
                                    </p>

                                    <p className="text-sm text-gray-500">
                                        ${producto.precioVenta}
                                    </p>

                                    <p className="text-xs text-gray-400">
                                        Stock: {producto.stock}
                                    </p>
                                </div>

                            </div>
                        </button>

                    ))}

                </div>
            )}

            {loading && (
                <p className="text-sm text-gray-500">
                    Buscando productos...
                </p>
            )}

            {/*
            <Button
                onClick={() => setScannerOpen(true)}
                className={`${buttonOutlineClass} py-5`}
            >
                Escanear con cámara
            </Button>
            */}

            <Button
                onClick={handleAgregar}
                className={buttonPrimaryClass}
            >
                Agregar
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