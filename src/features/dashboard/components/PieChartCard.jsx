import PieChart from "@/components/charts/PieChart"
import { Card } from "@/components/ui/card"

export default function PieChartCard({
    data = []
}) {

    const series = data.map(
        item => item.total
    )

    const options = {
        labels: data.map(
            item =>
                item.metodoPago
        ),

        legend: {
            show: true
        }
        ,

        tooltip: {
            enabled: true
        }
    }
    const topCategoria = data.reduce((max, item) => {
        return item.total > (max?.total || 0) ? item : max
    }, null)
    const totalGeneral = data.reduce((acc, item) => acc + item.total, 0)

    const porcentajeTop = topCategoria && totalGeneral
        ? ((topCategoria.total / totalGeneral) * 100).toFixed(0)
        : 0

    return (
        <Card className="bg-white/80 backdrop-blur-xl border border-gray-200 shadow-lg rounded-2xl pl-6 pr-6">

            <div className="flex justify-between items-center">

                <h4 className="text-lg font-bold text-gray-800">
                    Ventas por método de pago
                </h4>

                {/*<select className="text-sm border rounded-lg px-2 py-1">
                    <option>Mensual</option>
                    <option>Semanal</option>
                    <option>Anual</option>
                </select>
*/}
            </div>

            <div className="h-[150px] flex items-center justify-center">
                <PieChart
                    options={options}
                    series={series}
                />
            </div>

            <div className="flex justify-between bg-emerald-50 rounded-xl p-3">

                <div className="text-center">
                    <p className="text-sm text-gray-500">Método de pago top</p>
                    <div className="text-left">
                    <p className="font-bold text-gray-800">
                        {topCategoria?.metodoPago || "Sin datos"}
                    </p> 
                    </div>               
                </div>

                <div className="text-center">
                    <p className="text-sm text-gray-500">Porcentaje</p>
                    <p className="font-bold text-emerald-600">
                        {porcentajeTop}%
                    </p>
                </div>

            </div>

        </Card>
    )
}