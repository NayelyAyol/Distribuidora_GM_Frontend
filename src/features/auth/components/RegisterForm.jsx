import { useState } from "react";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import {
    inputClass,
    buttonPrimaryClass,
    labelClass
} from "@/utils/styles";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { registro } from "../services/authService";
import { toast } from "react-toastify";

const RegisterForm = () => {
    const [form, setForm] = useState({
        nombre: "",
        apellido: "",
        cedula: "",
        fecha_nacimiento: "",
        telefono: "",
        ciudad: "",
        direccion: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [errors, setErrors] = useState({
        nombre: "",
        apellido: "",
        cedula: "",
        fecha_nacimiento: "",
        telefono: "",
        ciudad: "",
        direccion: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const onlyLetters = (value) =>
        /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]*$/.test(value);

    const onlyNumbers = (value) =>
        /^\d*$/.test(value);

    const isValidEmail = (email) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const validatePassword = (password) => {
        return (
            /[a-z]/.test(password) &&
            /[A-Z]/.test(password) &&
            /\d/.test(password) &&
            /[^A-Za-z0-9]/.test(password) &&
            password.length >= 8 &&
            password.length <= 16
        );
    };

    const calculateAge = (birthDate) => {
        const today = new Date();
        const birth = new Date(birthDate);

        let age = today.getFullYear() - birth.getFullYear();
        const m = today.getMonth() - birth.getMonth();

        if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
            age--;
        }

        return age;
    };

// handleChange — reemplaza los bloques de nombre, apellido y dirección
const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "nombre") {
        if (!onlyLetters(value)) return;
        if (value.length > 15) return;       // era 50
    }

    if (name === "apellido") {
        if (!onlyLetters(value)) return;
        if (value.length > 20) return;       // era 50
    }

    if (name === "ciudad") {
        if (!onlyLetters(value)) return;
    }

    if (name === "direccion") {
        if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9\s#.,\-°]*$/.test(value)) return;  // agrega caracteres válidos
        if (value.length > 100) return;
    }

    if (name === "telefono" || name === "cedula") {
        if (!onlyNumbers(value)) return;
    }

    if (name === "telefono" && value.length > 10) return;
    if (name === "cedula" && value.length > 10) return;

    setForm(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: "" }));
};

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (loading) return;

        setErrors({
            nombre: "",
            apellido: "",
            cedula: "",
            fecha_nacimiento: "",
            telefono: "",
            ciudad: "",
            direccion: "",
            email: "",
            password: "",
            confirmPassword: "",
        });

        const newErrors = {};

// handleSubmit — reemplaza las validaciones de nombre, apellido y dirección
if (!form.nombre) {
    newErrors.nombre = "El nombre es obligatorio";
} else if (!onlyLetters(form.nombre)) {
    newErrors.nombre = "El nombre solo debe contener letras";
} else if (form.nombre.trim().length < 3) {
    newErrors.nombre = "El nombre debe tener mínimo 3 caracteres";   // nuevo
}

if (!form.apellido) {
    newErrors.apellido = "El apellido es obligatorio";
} else if (!onlyLetters(form.apellido)) {
    newErrors.apellido = "El apellido solo debe contener letras";
} else if (form.apellido.trim().length < 3) {
    newErrors.apellido = "El apellido debe tener mínimo 3 caracteres"; // nuevo
}

if (!form.direccion) {
    newErrors.direccion = "La dirección es obligatoria";
} else if (form.direccion.trim().length < 5) {
    newErrors.direccion = "La dirección debe tener mínimo 5 caracteres"; // nuevo
}

        if (!form.cedula) {
            newErrors.cedula = "La cédula es obligatoria";
        } else if (!/^\d{10}$/.test(form.cedula)) {
            newErrors.cedula = "La cédula debe tener 10 dígitos";
        }

        if (!form.fecha_nacimiento) {
            newErrors.fecha_nacimiento = "La fecha de nacimiento es obligatoria";
        } else if (calculateAge(form.fecha_nacimiento) < 18) {
            newErrors.fecha_nacimiento = "Debes ser mayor de edad";
        }

        if (!form.telefono) {
            newErrors.telefono = "El teléfono es obligatorio";
        } else if (!/^\d{10}$/.test(form.telefono)) {
            newErrors.telefono = "El teléfono debe tener 10 dígitos";
        }

        if (!form.ciudad) {
            newErrors.ciudad = "La ciudad es obligatoria";
        } else if (!onlyLetters(form.ciudad)) {
            newErrors.ciudad = "La ciudad solo debe contener letras";
        }

        if (!form.email) {
            newErrors.email = "El correo es obligatorio";
        } else if (!isValidEmail(form.email)) {
            newErrors.email = "Ingresa un correo válido";
        } else if (form.email.length > 200) {
            newErrors.email = "El correo es demasiado largo";
        }

        if (!form.password) {
            newErrors.password = "La contraseña es obligatoria";
        } else if (!validatePassword(form.password)) {
            newErrors.password =
                "Debe tener entre 8 y 16 caracteres, incluir mayúsculas, minúsculas, números y caracteres especiales";
        }

        if (!form.confirmPassword) {
            newErrors.confirmPassword = "Confirma tu contraseña";
        } else if (form.password !== form.confirmPassword) {
            newErrors.confirmPassword = "Las contraseñas no coinciden";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors((prev) => ({
                ...prev,
                ...newErrors
            }));
            return;
        }

        setLoading(true);

        try {
            const { confirmPassword, ...data } = form;

            await registro(data);
            toast.success("Registro exitoso");

            setForm({
                nombre: "",
                apellido: "",
                cedula: "",
                fecha_nacimiento: "",
                telefono: "",
                direccion: "",
                email: "",
                password: "",
                confirmPassword: "",
                ciudad: "",
            });

            setErrors({
                nombre: "",
                apellido: "",
                cedula: "",
                fecha_nacimiento: "",
                telefono: "",
                ciudad: "",
                direccion: "",
                email: "",
                password: "",
                confirmPassword: "",
            });

        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} noValidate className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div className="space-y-2">
                <Label 
                htmlFor="nombre"
                className={labelClass}>Nombre</Label>
                <Input
                    id="nombre"
                    name="nombre"
                    value={form.nombre}
                    onChange={handleChange}
                    placeholder="Carlos"
                    className={inputClass}
                    maxLength={15}
                />
                {errors.nombre && (
                    <p className="text-red-500 text-sm font-medium">
                        {errors.nombre}
                    </p>
                )}
            </div>

            <div className="space-y-2">
                <Label 
                htmlFor="apellido"
                className={labelClass}>Apellido</Label>
                <Input
                    id="apellido"
                    name="apellido"
                    value={form.apellido}
                    onChange={handleChange}
                    placeholder="Ruiz"
                    className={inputClass}
                    maxLength={20}
                />
                {errors.apellido && (
                    <p className="text-red-500 text-sm font-medium">
                        {errors.apellido}
                    </p>
                )}
            </div>

            <div className="space-y-2">
                <Label 
                htmlFor="cedula"
                className={labelClass}>Cédula</Label>
                <Input
                    id="cedula"
                    name="cedula"
                    value={form.cedula}
                    onChange={handleChange}
                    placeholder="1725841230"
                    className={inputClass}
                    maxLength={10}
                />
                {errors.cedula && (
                    <p className="text-red-500 text-sm font-medium">
                        {errors.cedula}
                    </p>
                )}
            </div>

            <div className="space-y-2">
                <Label 
                htmlFor="fecha_nacimiento"
                className={labelClass}>Fecha de nacimiento</Label>
                <Input
                    id="fecha_nacimiento"
                    type="date"
                    name="fecha_nacimiento"
                    value={form.fecha_nacimiento}
                    onChange={handleChange}
                    className={inputClass}
                />
                {errors.fecha_nacimiento && (
                    <p className="text-red-500 text-sm font-medium">
                        {errors.fecha_nacimiento}
                    </p>
                )}
            </div>

            <div className="space-y-2">
                <Label 
                htmlFor="telefono"
                className={labelClass}>Teléfono</Label>
                <Input
                    id="telefono"
                    name="telefono"
                    value={form.telefono}
                    onChange={handleChange}
                    placeholder="0984512367"
                    className={inputClass}
                    maxLength={10}
                />
                {errors.telefono && (
                    <p className="text-red-500 text-sm font-medium">
                        {errors.telefono}
                    </p>
                )}
            </div>

            <div className="space-y-2">
                <Label 
                htmlFor="ciudad"
                className={labelClass}>Ciudad</Label>
                <Input
                    id="ciudad"
                    name="ciudad"
                    value={form.ciudad}
                    onChange={handleChange}
                    placeholder="Quito"
                    className={inputClass}
                    maxLength={50}
                />
                {errors.ciudad && (
                    <p className="text-red-500 text-sm font-medium">
                        {errors.ciudad}
                    </p>
                )}
            </div>

            <div className="space-y-2">
                <Label 
                htmlFor="direccion"
                className={labelClass}>Dirección</Label>
                <Input
                    id="direccion"
                    name="direccion"
                    value={form.direccion}
                    onChange={handleChange}
                    placeholder="Av. de los Granados"
                    className={inputClass}
                    maxLength={50}
                />
                {errors.direccion && (
                    <p className="text-red-500 text-sm font-medium">
                        {errors.direccion}
                    </p>
                )}
            </div>

            <div className="space-y-2">
                <Label 
                htmlFor="email"
                className={labelClass}>Correo electrónico</Label>
                <Input
                    id="email"
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="correo@gmail.com"
                    className={inputClass}
                    maxLength={200}
                />
                {errors.email && (
                    <p className="text-red-500 text-sm font-medium">
                        {errors.email}
                    </p>
                )}
            </div>

            <div className="space-y-2 relative">
                <Label 
                htmlFor="password"
                className={labelClass}>Contraseña</Label>
                <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    className={`${inputClass} pr-12`}
                    maxLength={16}
                />
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-7 text-emerald-900"
                >
                    {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
                </button>
                {errors.password && (
                    <p className="text-red-500 text-sm font-medium">
                        {errors.password}
                    </p>
                )}
            </div>

            <div className="space-y-2 relative">
                <Label 
                htmlFor="confirmPassword"
                className={labelClass}>Confirmar contraseña</Label>
                <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    className={`${inputClass} pr-12`}
                    maxLength={16}
                />
                <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-7 text-emerald-900"
                >
                    {showConfirmPassword ? <MdVisibilityOff /> : <MdVisibility />}
                </button>
                {errors.confirmPassword && (
                    <p className="text-red-500 text-sm font-medium">
                        {errors.confirmPassword}
                    </p>
                )}
            </div>

            <div className="md:col-span-2 pt-4">
                <Button
                    disabled={loading}
                    className={`${buttonPrimaryClass} ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
                    type="submit"
                >
                    {loading ? "Creando..." : "Aceptar"}
                </Button>
            </div>

        </form>
    );
};

export default RegisterForm;