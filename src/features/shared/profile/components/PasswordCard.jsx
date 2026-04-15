import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { MdVisibility, MdVisibilityOff } from "react-icons/md"

import {
    inputClass,
    labelClass,
    buttonPrimaryClass
} from "@/utils/styles"

export default function PasswordCard() {

    const [showCurrent, setShowCurrent] = useState(false)
    const [showNew, setShowNew] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)

    return (
        <div className="bg-white/80 backdrop-blur-xl border border-gray-200 shadow-lg rounded-2xl p-6 mt-6">

            <h2 className="text-lg font-bold mb-4 text-gray-800 justify-center flex">
                Cambiar contraseña
            </h2>

            <form className="space-y-4">

                <div className="relative">
                    <Label className={labelClass}>Contraseña actual</Label>
                    <Input
                        type={showCurrent ? "text" : "password"}
                        required
                        className={inputClass + " pr-10"}
                    />

                    <button
                        type="button"
                        onClick={() => setShowCurrent(!showCurrent)}
                        className="absolute right-3 top-2/3 -translate-y-1/2 text-emerald-900"
                    >
                        {showCurrent ? <MdVisibilityOff /> : <MdVisibility />}
                    </button>
                </div>

                <div className="relative">
                    <Label className={labelClass}>Nueva contraseña</Label>
                    <Input
                        type={showNew ? "text" : "password"}
                        required
                        minLength={8}
                        maxLength={16}
                        className={inputClass + " pr-10"}
                    />

                    <button
                        type="button"
                        onClick={() => setShowNew(!showNew)}
                        className="absolute right-3 top-2/3 -translate-y-1/2 text-emerald-900"
                    >
                        {showNew ? <MdVisibilityOff /> : <MdVisibility />}
                    </button>
                </div>

                <div className="relative">
                    <Label className={labelClass}>Confirmar contraseña</Label>
                    <Input
                        type={showConfirm ? "text" : "password"}
                        required
                        className={inputClass + " pr-10"}
                    />

                    <button
                        type="button"
                        onClick={() => setShowConfirm(!showConfirm)}
                        className="absolute right-3 top-2/3 -translate-y-1/2 text-emerald-900"
                    >
                        {showConfirm ? <MdVisibilityOff /> : <MdVisibility />}
                    </button>
                </div>

                {/* BOTÓN */}
                <Button className={buttonPrimaryClass}>
                    Actualizar contraseña
                </Button>

            </form>
        </div>
    )
}