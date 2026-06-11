import { MdArrowDropUp, MdOutlineCalendarToday, MdBarChart } from "react-icons/md"
import { Card } from "@/components/ui/card"
import LineChart from "@/components/charts/LineChart"

export default function TotalSpentCard({
    isVendedor,
    ventasPorMes = []
}) {

    const series = [
        {
            name: "Ventas",
            data: ventasPorMes.map(
                item => item.total
            )
        }
    ]

    const options = {
        chart: {
            toolbar: {
                show: false
            }
        },

        xaxis: {
            categories:
                ventasPorMes.map(
                    item => item.mes
                )
        }
    }

    const total =
        ventasPorMes.reduce(
            (acc, item) =>
                acc + item.total,
            0
        )

    return (
        <Card className="bg-white/80 backdrop-blur-xl border border-gray-200 shadow-lg rounded-2xl p-6">

            <div className="flex justify-between items-center mb-4">

                <button className="flex items-center gap-2 rounded-lg bg-emerald-50 px-3 py-2 text-gray-600 hover:bg-gray-100 transition">
                    <MdOutlineCalendarToday />
                    <span className="text-sm font-medium">Este mes</span>
                </button>

                <button className="p-2 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-gray-100 transition">
                    <MdBarChart className="text-xl" />
                </button>

            </div>

            <div className="flex flex-col md:flex-row gap-4">

                <div className="flex flex-col justify-center">

                    <p className="text-3xl font-bold text-gray-800">
                        ${total.toFixed(2)}
                    </p>

                    <p className="text-sm text-gray-500 mt-2">
                        {isVendedor ? "Mis ventas" : "Total ventas"}
                    </p>

                    <div className="flex items-center gap-1 mt-1">
                        <MdArrowDropUp className="text-green-500 text-xl" />
                        <span className="text-green-500 text-sm font-bold">
                            +2.45%
                        </span>
                    </div>

                </div>

                <div className="w-full h-[220px]">
                    <LineChart
                        options={options}
                        series={series}
                    />
                </div>

            </div>

        </Card>
    )
}