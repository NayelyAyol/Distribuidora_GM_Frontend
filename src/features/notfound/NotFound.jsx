import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

import {
    buttonPrimaryClass
} from "@/utils/styles"


export const NotFound = () => {
    const navigate = useNavigate()

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">

            <Card className="p-8 max-w-lg w-full text-center shadow-lg border-0 rounded-2xl">

                <div className="flex justify-center">
                    <img
                        src="/images/notFound/notFound.webp"
                        alt="Not Found"
                        className="h-40 w-40 object-cover rounded-full border-4 border-gray-300 shadow-md"
                    />
                </div>

                {/* Texto */}
                <div className="mt-6">
                    <h1 className="text-4xl font-bold text-gray-800">404</h1>
                    <p className="text-xl text-gray-700 mt-2">Página no encontrada</p>
                    <p className="text-gray-500 mt-2">
                        Lo sentimos, la página que buscas no existe o fue movida.
                    </p>
                </div>


                <Button className={buttonPrimaryClass}
                    onClick={() => navigate("/")}
                >
                    Volver al inicio
                </Button>


            </Card>
        </div>
    )
}

export default NotFound