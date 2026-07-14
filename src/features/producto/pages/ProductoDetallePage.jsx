import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import CantidadSelector from "../CantidadSelector"
import ProductosRecomendados from "../ProductosRecomendados"
import { useNavigate } from "react-router-dom"
import { FiArrowLeft } from "react-icons/fi"
import useAuthStore from "@/context/useAuthStore"
import { Explorar } from "@/features/catalogo/services/catalogoService"
import { useLocation } from "react-router-dom"
import { agregarAlCarrito } from "../../cliente/carrito/services/carritoService"
import { toast } from "react-toastify"

export default function ProductoDetallePage() {
    const user = useAuthStore((state) => state.user)
    const navigate = useNavigate()
    const { id } = useParams()
    const location = useLocation()
    const [cantidad, setCantidad] = useState(1)

    const [productos, setProductos] = useState([])
    const [loading, setLoading] = useState(true)

    const basePath = user
        ? "/dashboard/catalogo"
        : "/catalogo"

    const from = location.state?.from || basePath


    const handleAgregarAlCarrito = async () => {
        if (!user) {
            navigate("/registro");
            return;
        }

        try {
            const respuesta = await agregarAlCarrito(id, cantidad);
            
            toast.success(respuesta.msg || "Producto agregado al carrito");
            
        } catch (error) {
            toast.error(error.message);
        }
    };

    useEffect(() => {

        const cargarProductos = async () => {

            try {
                const data = await Explorar()
                
                setProductos(data?.productos || [])

            } catch (error) {

                console.error(error)

            } finally {

                setLoading(false)
            }
        }

        cargarProductos()

    }, [])

    useEffect(() => {

        window.scrollTo(0, 0)
        setCantidad(1)

    }, [id])

    const producto = productos.find(
        (p) => String(p._id) === String(id)
    )

    if (loading) {
        return <p>Cargando...</p>
    }

    if (!producto) {
        return (
            <p className="p-6">
                Producto no encontrado
            </p>
        )
    }

const maxPermitido = producto.stock
const sinStock = producto.stock === 0

    return (
        <div className="p-6 flex flex-col gap-8">
        {user && (
            <p className="text-gray-500">
                Este módulo te permite visualizar
                un producto seleccionado
            </p>)
        }

            <div className="
                relative
                grid
                grid-cols-1
                lg:grid-cols-2
                gap-6 lg:gap-8
                bg-white
                p-4 sm:p-6
                rounded-2xl
                shadow
            ">

                <div className="absolute pt-8 px-8">

                    <button
                        onClick={() =>
                            navigate(from)
                        }
                        className="
                            w-11 h-11 rounded-xl
                            bg-white shadow-sm
                            border border-gray-100
                            flex items-center justify-center
                            hover:bg-emerald-100 transition
                            shrink-0
                        "
                    >

                        <FiArrowLeft
                            className="
                                text-xl
                                text-gray-700
                            "
                        />

                    </button>

                </div>

                <img
                    src={producto.imagen?.url || "/images/categories/default.webp"}
                    className="
                        w-full
                        h-[420px]
                        object-cover
                        rounded-xl
                    "
                />

                <div>

                    <h1 className="text-3xl font-bold">
                        {producto.nombre}
                    </h1>

                    <p className="text-gray-500 mt-2 text-justify">
                        {producto.descripcion}
                    </p>

                    <p className="text-xl font-semibold mt-4">
                        ${producto.precioVenta}
                    </p>

                    <p className="text-sm text-gray-400 mt-1">
                        Stock: {producto.stock}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-2">

                        <span className="
                            px-4 py-2 rounded-xl
                            bg-emerald-100 text-emerald-700
                            text-sm font-medium
                        ">
                            Marca: {producto.marca}
                        </span>

                        {/*<span className="
                            px-4 py-2 rounded-xl
                            bg-gray-100 text-gray-700
                            text-sm font-medium
                        ">
                            Color: {producto.color}
                        </span>*/}

                        <span className="
                            px-4 py-2 rounded-xl
                            bg-gray-100 text-gray-700
                            text-sm font-medium
                        ">
                            IVA: {producto.tipoIVA}
                        </span>

                        {/*<span className="
                            px-4 py-2 rounded-xl
                            bg-gray-100 text-gray-700
                            text-sm font-medium
                        ">
                            Tamaño: {producto.tamanio}
                        </span>^*/}

                        <span className="
                            px-4 py-2 rounded-xl
                            bg-gray-100 text-gray-700
                            text-sm font-medium
                        ">
                            Categoría: {producto.categoria?.nombre}
                        </span>

                        <span className="
                            px-4 py-2 rounded-xl
                            bg-gray-100 text-gray-700
                            text-sm font-medium
                        ">
                            Unidad: {producto.unidadMedida}
                        </span>

                        {/*<span className="
                            px-4 py-2 rounded-xl
                            bg-gray-100 text-gray-700
                            text-sm font-medium
                        ">
                            Presentación: {producto.presentacion}
                        </span>*/}


                        {/*<span className="
                            px-4 py-2 rounded-xl
                            bg-gray-100 text-gray-700
                            text-sm font-medium
                        ">
                            Material: {producto.material}
                        </span>*/}

                    </div>

                    <CantidadSelector
                        key={producto._id}
                        cantidad={cantidad}
                        setCantidad={setCantidad}
                        min={1}
                        max={maxPermitido}
                    />

                    <button
                        onClick={handleAgregarAlCarrito}
                        disabled={sinStock}
                        className={`
                            mt-4 w-full py-2 rounded-xl
                            text-white transition
                            ${sinStock
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-black hover:bg-gray-800"
                            }
                        `}
                    >
                        {sinStock ? "Sin disponibilidad" : "Agregar al carrito"}
                    </button>

                </div>

            </div>

            <div className="bg-white p-6 rounded-2xl shadow">
                <div className="max-h-[450px] overflow-y-auto custom-scroll pr-2">
                    <ProductosRecomendados productoId={id} />
                </div>
            </div>

        </div>
    )
}