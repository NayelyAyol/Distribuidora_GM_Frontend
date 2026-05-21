import { Card } from "@/components/ui/card"
import { MdNotifications } from "react-icons/md"

export default function Widget({
    icon,
    title,
    subtitle,
    notification = 0,
    onClick
}) {

    return (
        <Card
            onClick={onClick}
            className="
                relative flex flex-col
                items-center justify-center
                text-center gap-4
                p-5 rounded-2xl
                border border-gray-200
                bg-white/80 backdrop-blur-xl
                shadow-md hover:shadow-lg
                transition min-h-[150px]
            "
        >

            <div
                className="
                    relative flex items-center justify-center
                    w-12 h-12 rounded-xl
                    bg-emerald-50 text-emerald-700
                "
            >

                {notification > 0 && (

                    <MdNotifications
                        className="
                            absolute
                            -top-1
                            -right-2
                            text-[20px]
                            text-red-600
                            animate-pulse
                        "
                    />

                )}

                {icon}

            </div>

            <div className="flex flex-col items-center justify-center">

                <p className="text-sm text-gray-500 font-medium">
                    {title}
                </p>

                <h4 className="text-xl font-bold text-gray-800">
                    {subtitle}
                </h4>

            </div>

        </Card>
    )
}