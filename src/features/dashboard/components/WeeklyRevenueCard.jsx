import { Card } from "@/components/ui/card"
import { MdBarChart } from "react-icons/md"
import BarChart from "@/components/charts/BarChart"

import {
    barChartDataWeeklyRevenue,
    barChartOptionsWeeklyRevenue
} from "../data/charts"

export default function WeeklyRevenueCard() {

    return (
        <Card className="bg-white/80 backdrop-blur-xl border border-gray-200 shadow-lg rounded-2xl p-6">

            {/* HEADER */}
            <div className="flex justify-between items-center mb-4">

                <h2 className="text-lg font-bold text-gray-800">
                    Ingresos Semanales
                </h2>

                <button className="p-2 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-gray-100 transition">
                    <MdBarChart className="text-xl" />
                </button>

            </div>

            {/* CHART */}
            <div className="w-full h-[260px]">
                <BarChart
                    chartData={barChartDataWeeklyRevenue}
                    chartOptions={barChartOptionsWeeklyRevenue}
                />
            </div>

        </Card>
    )
}