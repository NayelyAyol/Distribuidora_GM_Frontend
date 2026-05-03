import TotalSpentCard from "../components/TotalSpentCard"
import WeeklyRevenueCard from "../components/WeeklyRevenueCard"
import Widget from "../components/Widget"
import PieChartCard from "../components/PieChartCard"
import { MdBarChart, MdDashboard } from "react-icons/md"
import { IoMdHome } from "react-icons/io"
import { IoDocuments } from "react-icons/io5"
import useAuthStore from "../../../context/useAuthStore"

export default function DashboardPage() {

    const user = useAuthStore((state) => state.user)
    const hydrated = useAuthStore((state) => state._hasHydrated)

    if (!hydrated) {
        return <p className="p-6">Cargando...</p>
    }

    if (!user) {
        return <p className="p-6">No hay usuario</p>
    }

    const rol = user?.rol
    const esVendedor = rol?.toUpperCase() === "VENDEDOR"

    const adminWidgets = [
        { icon: <MdBarChart className="text-xl" />, title: "Ingresos", subtitle: "$340.5" },
        { icon: <IoDocuments className="text-xl" />, title: "Gastos del mes", subtitle: "$642.39" },
        { icon: <MdBarChart className="text-xl" />, title: "Ventas", subtitle: "$574.34" },
        { icon: <MdDashboard className="text-xl" />, title: "Balance", subtitle: "$1,000" },
        { icon: <MdBarChart className="text-xl" />, title: "Tareas", subtitle: "145" },
        { icon: <IoMdHome className="text-xl" />, title: "Proyectos", subtitle: "2433" }
    ]

    const vendedorWidgets = [
        { icon: <MdBarChart className="text-xl" />, title: "Mis ventas", subtitle: "$574.34" },
        { icon: <MdBarChart className="text-xl" />, title: "Ventas del mes", subtitle: "$1200" },
        { icon: <MdBarChart className="text-xl" />, title: "Ventas de hoy", subtitle: "$120" }
    ]

    const widgets = esVendedor ? vendedorWidgets : adminWidgets

    const mensaje = esVendedor
        ? "Este módulo te permite visualizar las ventas realizadas"
        : "Este módulo te permite visualizar las estadísticas generales del sistema"

    return (
        <div className="flex flex-col gap-6 p-6">

            <div>
                <p className="text-gray-500">
                    {mensaje}
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6 gap-5">

                {widgets.map((w) => (
                    <Widget
                        key={w.title}
                        icon={w.icon}
                        title={w.title}
                        subtitle={w.subtitle}
                    />
                ))}

            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 items-stretch">

                <div className="h-full">
                    <TotalSpentCard isVendedor={esVendedor} />
                </div>

                <div className="w-full">
                    {!esVendedor ? (
                        <WeeklyRevenueCard />
                    ) : (
                        <PieChartCard />
                    )}
                </div>

            </div>
        </div>
    )
}