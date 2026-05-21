import { useState } from "react"

import Switch from "@/components/ui/switch"
import { Button } from "@/components/ui/button"

export default function NotificationItem({
    label,
    id,
    showButton = false
}) {

    const [active, setActive] = useState(true)

    const handleExecute = () => {

        console.log("Proceso ejecutado")

        setActive(false)
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
                    onChange={() => setActive(!active)}
                />

            </div>

        </div>
    )
}