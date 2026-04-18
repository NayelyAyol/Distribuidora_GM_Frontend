import { useNavigate } from "react-router-dom"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import LoginForm from "./LoginForm"

import {
    titleClass,
    footerLabelClass,
    linkButtonClass,
} from "@/utils/styles"

export default function LoginCard({ onLogin }) {
    const navigate = useNavigate()

    return (
        <Card className="w-full max-w-lg border-0 border-transparent bg-transparent shadow-none p-0 outline-none ring-0">
            <button
                onClick={() => navigate("/")}
                className="absolute top-6 left-6 text-sm text-gray-600 hover:text-emerald-600 transition"
            >
                ← Volver
            </button>
            <CardHeader className="flex justify-center p-0 pb-10">
                <CardTitle className={titleClass}>
                    Inicia Sesión
                </CardTitle>
            </CardHeader>

            <CardContent className="p-0">
                <LoginForm onSubmit={onLogin} />
            </CardContent>

            <CardFooter className="flex justify-between items-baseline">
                <Label className={footerLabelClass}>
                    ¿No tienes una cuenta?
                </Label>

                <Button
                    variant="link"
                    onClick={() => navigate("/register")}
                    className={linkButtonClass}
                >
                    Registrarse
                </Button>
            </CardFooter>

        </Card>
    )
}