import TotalSpentCard from "../components/TotalSpentCard"
import WeeklyRevenueCard from "../components/WeeklyRevenueCard"
import Widget from "../components/Widget"

import { MdBarChart, MdDashboard } from "react-icons/md"
import { IoMdHome } from "react-icons/io"
import { IoDocuments } from "react-icons/io5"

export default function DashboardPage() {

    return (
        <div className="flex flex-col gap-6 p-6">

            <div>
                <p className="text-gray-500">
                    En este módulo puede visualizar las estadísticas generales del sistema
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6 gap-5">

                <Widget
                    icon={<MdBarChart className="text-xl" />}
                    title="Ingresos"
                    subtitle="$340.5"
                />

                <Widget
                    icon={<IoDocuments className="text-xl" />}
                    title="Gastos del mes"
                    subtitle="$642.39"
                />

                <Widget
                    icon={<MdBarChart className="text-xl" />}
                    title="Ventas"
                    subtitle="$574.34"
                />

                <Widget
                    icon={<MdDashboard className="text-xl" />}
                    title="Balance"
                    subtitle="$1,000"
                />

                <Widget
                    icon={<MdBarChart className="text-xl" />}
                    title="Tareas"
                    subtitle="145"
                />

                <Widget
                    icon={<IoMdHome className="text-xl" />}
                    title="Proyectos"
                    subtitle="2433"
                />

            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

                <TotalSpentCard />
                <WeeklyRevenueCard />

            </div>

        </div>
    )
}