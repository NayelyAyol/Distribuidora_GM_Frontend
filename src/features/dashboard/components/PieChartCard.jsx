import PieChart from "@/components/charts/PieChart"
import { Card } from "@/components/ui/card"

export default function PieChartCard() {

    const pieChartData = [40, 25, 20, 15]

    const pieChartOptions = {
        labels: ["Electrónica", "Ropa", "Hogar", "Otros"],
        colors: ["#064E3B", "#065F46", "#047857", "#10B981"],

        dataLabels: {
            enabled: false
        },

        plotOptions: {
            pie: {
                dataLabels: {
                    enabled: false
                }
            }
        },

        legend: {
            show: false
        },

        tooltip: {
            enabled: true
        }
    }

    return (
        <Card className="bg-white/80 backdrop-blur-xl border border-gray-200 shadow-lg rounded-2xl pl-6 pr-6">

            <div className="flex justify-between items-center">

                <h4 className="text-lg font-bold text-gray-800">
                    Ventas por categoría
                </h4>

                <select className="text-sm border rounded-lg px-2 py-1">
                    <option>Mensual</option>
                    <option>Semanal</option>
                    <option>Anual</option>
                </select>

            </div>

            <div className="h-[150px] flex items-center justify-center">
                <PieChart
                    options={pieChartOptions}
                    series={pieChartData}
                />
            </div>

            <div className="flex justify-between bg-emerald-50 rounded-xl p-3">

                <div className="text-center">
                    <p className="text-sm text-gray-500">Categoría top</p>
                    <p className="font-bold text-gray-800">Electrónica</p>
                </div>

                <div className="text-center">
                    <p className="text-sm text-gray-500">Porcentaje</p>
                    <p className="font-bold text-emerald-600">40%</p>
                </div>

            </div>

        </Card>
    )
}