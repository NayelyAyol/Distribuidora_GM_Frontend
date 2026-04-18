import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

import {
    buttonPrimaryClass
} from "@/utils/styles"

export const Confirm = () => {
    const navigate = useNavigate()

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">

            <Card className="p-8 max-w-lg w-full text-center shadow-lg border-0 rounded-2xl">

                <div className="flex justify-center">
                    <img
                        src="/images/confirm/confirm.webp"
                        alt="Confirmación"
                        className="h-40 w-40 object-cover rounded-full border-4 border-gray-300 shadow-md"
                    />
                </div>

                {/* Texto */}
                <div className="mt-6">
                    <h1 className="text-4xl font-bold text-gray-800">
                        ¡Cuenta confirmada!
                    </h1>
                    <p className="text-lg text-gray-600 mt-4">
                        Muchas gracias por verificar tu cuenta.
                    </p>
                    <p className="text-gray-500 mt-2">
                        Ya puedes iniciar sesión en el sistema.
                    </p>
                </div>

                {/* Botón */}
                <Button
                    className={`${buttonPrimaryClass} mt-6 w-full`}
                    onClick={() => navigate("/login")}
                >
                    Ir al login
                </Button>

            </Card>
        </div>
    )
}

export default Confirm