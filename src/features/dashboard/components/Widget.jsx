import { Card } from "@/components/ui/card"

export default function Widget({
    icon,
    title,
    subtitle,
    notification = 0
}) {

    return (
        <Card className="relative flex flex-col items-center justify-center text-center gap-4 p-5 rounded-2xl border border-gray-200 bg-white/80 backdrop-blur-xl shadow-md hover:shadow-lg transition min-h-[150px]">

            <div className="relative flex items-center justify-center w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700">

                {notification > 0 && (
                    <span className="absolute -top-1 -right-1 flex h-3 w-3">
                        <span className="absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75 animate-ping"></span>

                        <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                    </span>
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