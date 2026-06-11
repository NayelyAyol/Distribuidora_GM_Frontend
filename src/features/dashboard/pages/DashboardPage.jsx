import TotalSpentCard from "../components/TotalSpentCard"
import WeeklyRevenueCard from "../components/WeeklyRevenueCard"
import Widget from "../components/Widget"
import PieChartCard from "../components/PieChartCard"
import { MdBarChart, MdDashboard } from "react-icons/md"
import { IoDocuments } from "react-icons/io5"
import useAuthStore from "../../../context/useAuthStore"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import {
    obtenerDashboardAdmin,
    obtenerDashboardVendedor
} from "../services/dashboardService";

export default function DashboardPage() {

    const navigate = useNavigate()

    const user = useAuthStore((state) => state.user)
    const hydrated = useAuthStore((state) => state._hasHydrated)

    const [dashboard, setDashboard] = useState(null);

    if (!hydrated) {
        return <p className="p-6">Cargando...</p>
    }

    if (!user) {
        return <p className="p-6">No hay usuario</p>
    }

    const rol = user?.rol
    const esVendedor = rol?.toUpperCase() === "VENDEDOR"

    useEffect(() => {
            if (!user) return;


        const cargarDashboard = async () => {

            try {

                const response = esVendedor
                    ? await obtenerDashboardVendedor()
                    : await obtenerDashboardAdmin();

                console.log("Dashboard:", response);

                setDashboard(response);

            } catch (error) {

                toast.error(error.message);
            }
        };

        cargarDashboard();

    }, [esVendedor, user]);

    if (!dashboard) {
        return (
            <div className="p-6">
                Cargando dashboard...
            </div>
        );
    }

    const adminWidgets = [
        {
            icon: <MdBarChart className="text-xl" />,
            title: "Ingresos Totales",
            subtitle: `$${dashboard.resumen.ingresosTotales}`
        },
        {
            icon: <MdBarChart className="text-xl" />,
            title: "Ingresos del Mes",
            subtitle: `$${dashboard.resumen.ingresosMes}`
        },
        {
            icon: <MdBarChart className="text-xl" />,
            title: "Ingresos de Hoy",
            subtitle: `$${dashboard.resumen.ingresosHoy}`
        },
        {
            icon: <IoDocuments className="text-xl" />,
            title: "Quejas Pendientes",
            subtitle: dashboard.resumen.quejasPendientes,
            notification: dashboard.resumen.quejasPendientes,
            path: "/dashboard/quejas-sugerencias"
        },
        {
            icon: <IoDocuments className="text-xl" />,
            title: "Pedidos Pendientes",
            subtitle: dashboard.resumen.pedidosPendientes,
            notification: dashboard.resumen.pedidosPendientes,
        },
        {
            icon: <MdDashboard className="text-xl" />,
            title: "Productos",
            subtitle: dashboard.resumen.totalProductos
        }
    ];

    const vendedorWidgets = [
        {
            icon: <MdBarChart className="text-xl" />,
            title: "Mis Ventas",
            subtitle: `$${dashboard.resumen.misVentas}`
        },
        {
            icon: <MdBarChart className="text-xl" />,
            title: "Ventas del Mes",
            subtitle: `$${dashboard.resumen.ventasMes}`
        },
        {
            icon: <MdBarChart className="text-xl" />,
            title: "Ventas de Hoy",
            subtitle: `$${dashboard.resumen.ventasHoy}`
        },
        {
            icon: <IoDocuments className="text-xl" />,
            title: "Pedidos Pendientes",
            subtitle: dashboard.resumen.pedidosPendientes,
            notification: dashboard.resumen.pedidosPendientes,
            path: "/dashboard/pedidos"
        }
    ];

    const widgets = esVendedor
        ? vendedorWidgets
        : adminWidgets

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
                        notification={w.notification}
                        onClick={
                            w.path
                                ? () => navigate(w.path)
                                : undefined
                        }
                    />
                ))}

            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 items-stretch">

                <div className="h-full">
                    <TotalSpentCard isVendedor={esVendedor}
                    ventasPorMes={dashboard?.graficas?.ventasPorMes || []}
                    />
                </div>

<div className="w-full">
    {!esVendedor ? (
        <WeeklyRevenueCard
            data={dashboard?.graficas?.ventasPorMetodoPago || []}
        />
    ) : (
        <PieChartCard
            data={dashboard?.graficas?.ventasPorMetodoPago || []}
        />
    )}
</div>

            </div>
        </div>
    )
}