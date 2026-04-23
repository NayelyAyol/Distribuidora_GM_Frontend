import Switch from "@/components/ui/switch"

export default function NotificationItem({ label, id }) {

    return (
        <div className="flex items-center justify-between py-4 px-2 rounded-lg hover:bg-emerald-700/10 transition">

            <p className="text-gray-700 font-medium">
                {label}
            </p>

            <Switch id={id} color = "emerald"/>

        </div>
    )
}