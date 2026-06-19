import Switch from "@/components/ui/switch"
import { Button } from "@/components/ui/button"

export default function NotificationItem({
    label,
    id,
    tipo,
    estado,
    showButton = false,
    onFinalizar,
    onEjecutar
}) {

    const active = estado === "PENDIENTE"

    const handleExecute = () => {
        onEjecutar?.(tipo)
    }

    const handleChange = () => {
        // Solo se permite apagar (finalizar). Encenderse de nuevo
        // depende de que el evento vuelva a estar vigente (backend/n8n).
        if (active && !showButton) {
            onFinalizar?.(tipo)
        }
    }

    return (
        <div
            className="
                flex items-center justify-between
                py-4 px-2 rounded-lg
                hover:bg-emerald-700/10
                transition
            "
        >
            <p className="text-gray-700 font-medium">
                {label}
            </p>

            <div className="flex items-center gap-3">

                {showButton && active && (
                    <Button
                        variant="ghost"
                        onClick={handleExecute}
                        className="
                            h-7
                            px-4
                            rounded-lg
                            text-sm
                            font-medium
                            text-emerald-700
                            hover:bg-emerald-100
                            hover:text-emerald-800
                            border border-emerald-200
                            transition
                        "
                    >
                        Ejecutar
                    </Button>
                )}

                <Switch
                    id={id}
                    color="emerald"
                    checked={active}
                    disabled={!active || showButton}
                    onChange={handleChange}
                />

            </div>

        </div>
    )
}