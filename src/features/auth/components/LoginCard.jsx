import { useNavigate } from "react-router-dom"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
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
            <div className="relative flex items-center justify-center pt-2 mb-5">

                <button
                    onClick={() => navigate("/")}
                    className="
                        absolute left-0
                        w-10 h-10 rounded-xl
                        bg-white shadow-sm
                        border border-gray-100
                        flex items-center justify-center
                        hover:bg-emerald-50 transition
                    "
                >
                    <FiArrowLeft className="text-xl text-gray-700" />
                </button>

                <CardHeader className="p-0">
                    <CardTitle className={titleClass}>
                        Inicia Sesión
                    </CardTitle>
                </CardHeader>

            </div>

            <CardContent className="p-0">
                <LoginForm onSubmit={onLogin} />
            </CardContent>

            <CardFooter className="flex justify-between items-baseline">
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