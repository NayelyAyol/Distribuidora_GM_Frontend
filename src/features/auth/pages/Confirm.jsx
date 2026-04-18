import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { toast } from "react-toastify"
import { buttonPrimaryClass } from "@/utils/styles"
import { confirmAccountRequest } from "../services/authService"

export const Confirm = () => {
    const navigate = useNavigate()
    const { token } = useParams()

    const [status, setStatus] = useState("loading")

    useEffect(() => {
        const verifyToken = async () => {
            try {
                const data = await confirmAccountRequest(token)

                setStatus("success")
                toast.success(data?.msg || "Cuenta confirmada correctamente")

            } catch (error) {
                setStatus("error")
                toast.error(error.message || "Error al confirmar cuenta")
            }
        }

        if (token) verifyToken()
    }, [token])

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">

            <Card className="p-8 max-w-lg w-full text-center shadow-lg border-0 rounded-2xl">

                {status === "loading" && (
                    <>
                        <div className="flex justify-center">
                            <img
                                src="/images/confirm/loading.gif"
                                alt="Cargando"
                                className="h-40 w-40 object-contain rounded-full border-4 border-gray-300 shadow-md p-5"
                            />
                        </div>

                        <h1 className="text-2xl font-bold text-gray-700 mt-6">
                            Verificando cuenta...
                        </h1>
                    </>
                )}

                {status === "success" && (
                    <>
                        <div className="flex justify-center">
                            <img
                                src="/images/confirm/success.webp"
                                alt="Éxito"
                                className="h-40 w-40 object-cover rounded-full border-4 border-green-400 shadow-md"
                            />
                        </div>

                        <div className="mt-6">
                            <h1 className="text-4xl font-bold text-gray-800">
                                ¡Cuenta confirmada!
                            </h1>
                            <p className="text-gray-500 mt-2">
                                Ya puedes iniciar sesión.
                            </p>
                        </div>

                        <Button
                            className={`${buttonPrimaryClass} mt-6 w-full`}
                            onClick={() => navigate("/login")}
                        >
                            Ir al login
                        </Button>
                    </>
                )}

                {status === "error" && (
                    <>
                        <div className="flex justify-center">
                            <img
                                src="/images/confirm/error.webp"
                                alt="Error"
                                className="h-40 w-40 object-cover rounded-full border-4 border-red-400 shadow-md"
                            />
                        </div>

                        <div className="mt-6">
                            <h1 className="text-3xl font-bold text-red-500">
                                Error al confirmar
                            </h1>
                            <p className="text-gray-500 mt-2">
                                El enlace es inválido o ha expirado.
                            </p>
                        </div>

                        <Button
                            className={`${buttonPrimaryClass} mt-6 w-full`}
                            onClick={() => navigate("/login")}
                        >
                            Volver al login
                        </Button>
                    </>
                )}

            </Card>
        </div>
    )
}

export default Confirm