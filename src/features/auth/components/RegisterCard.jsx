import RegisterForm from "./RegisterForm";
import { useNavigate } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const RegisterCard = () => {
    const navigate = useNavigate();

    return (
        <div className="w-full max-w-2xl mx-auto bg-white/10 backdrop-blur-2xl border border-white/20 md:border-r-0 p-10 md:p-16 rounded-3xl flex flex-col justify-center min-h-[600px] md:min-h-[750px] shadow-2xl">

            <h2 className="text-5xl md:text-6xl font-black text-emerald-950 tracking-tighter mb-8 text-center">
                Crear Cuenta
            </h2>
            
            <RegisterForm />

            <div className="flex justify-between items-baseline mt-6">
                <Label className="font-bold text-lg text-emerald-950 ml-1">
                    ¿Ya tienes cuenta?
                </Label>
                <Button
                    variant="link"
                    onClick={() => navigate("/login")}
                    className="p-0 text-emerald-900 text-sm font-bold hover:no-underline hover:text-black transition-colors"
                >
                    Iniciar sesión
                </Button>
            </div>
            
        </div>
    );
};

export default RegisterCard;
