import { Card } from "@/components/ui/card"

export default function Widget({ icon, title, subtitle }) {
    return (
        <Card className="flex items-center gap-4 p-5 rounded-2xl border border-gray-200 bg-white/80 backdrop-blur-xl shadow-md hover:shadow-lg transition">

            {/* ICON */}
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700">
                {icon}
            </div>

            {/* TEXT */}
            <div className="flex flex-col">
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