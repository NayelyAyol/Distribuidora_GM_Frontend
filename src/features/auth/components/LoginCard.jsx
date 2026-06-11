import { useNavigate } from "react-router-dom"
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardFooter
} from "@/components/ui/card"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import LoginForm from "./LoginForm"
import { FiArrowLeft } from "react-icons/fi"

import {
    titleClass,
    footerLabelClass,
    linkButtonClass,
} from "@/utils/styles"

export default function LoginCard({ onLogin }) {
    const navigate = useNavigate()

    return (
        <Card className="w-full max-w-lg border-0 border-transparent bg-transparent shadow-none p-0 outline-none ring-0">

            <div className="relative flex items-center justify-center pt-2 mb-5 px-2 sm:px-0">

                <button
                    onClick={() => navigate("/")}
                    className="
                        absolute
                        left-0
                        sm:left-0

                        w-10 h-10
                        sm:w-11 sm:h-11

                        rounded-xl
                        bg-white
                        shadow-sm
                        border border-gray-100
                        flex items-center justify-center

                        hover:bg-emerald-50
                        transition
                        z-10
                    "
                >
                    <FiArrowLeft className="text-lg sm:text-xl text-gray-700" />
                </button>

                <CardHeader className="p-0 text-center">

                    <CardTitle className={`
                        ${titleClass}
                        text-4xl
                        sm:text-5xl
                        md:text-6xl
                        leading-tight
                    `}>
                        Inicia Sesión
                    </CardTitle>
                </CardHeader>

            </div>

            <CardContent className="p-0 w-full">
                <LoginForm onSubmit={onLogin} />
            </CardContent>

            <CardFooter className="flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0 text-center  sm:text-left ">
                <Label className={footerLabelClass}>
                    ¿No tienes una cuenta?
                </Label>

                <Button
                    variant="link"
                    onClick={() => navigate("/registro")}
                    className={linkButtonClass}
                >
                    Registrarse
                </Button>
            </CardFooter>

        </Card>
    )
}