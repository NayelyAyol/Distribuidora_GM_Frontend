import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { FiAlignJustify } from "react-icons/fi"
import { RiMoonFill, RiSunFill } from "react-icons/ri"
import { IoMdNotificationsOutline } from "react-icons/io"
import { FiBox } from "react-icons/fi"
import Dropdown from "@/components/ui/Dropdown"
import useAuthStore from "@/context/useAuthStore"
import { useEffect } from "react"

export default function Navbar({ onOpenSidenav }) {
    const [darkmode, setDarkmode] = useState(false)
    const location = useLocation()
    const navigate = useNavigate()
    const user = useAuthStore((state) => state.user)
    const logout = useAuthStore((state) => state.logout)


    const toggleDarkMode = () => {
        document.documentElement.classList.toggle("dark")

        const isDark = document.documentElement.classList.contains("dark")
        localStorage.setItem("theme", isDark ? "dark" : "light")

        setDarkmode(isDark)
    }

    const getTitle = () => {

        if (location.pathname === "/dashboard") return "Dashboard"
        if (location.pathname === "/dashboard/vendedores") return "Vendedores"
        if (location.pathname === "/dashboard/categorias") return "Categorías"
        if (location.pathname.startsWith("/dashboard/categorias/") && location.pathname.includes("/productos"))
            return "Productos"
        if (location.pathname === "/dashboard/usuarios") return "Usuarios"
        if (location.pathname === "/dashboard/perfil") return "Mi perfil"
        if (location.pathname === "/dashboard/quejas-sugerencias") return "Quejas y Sugerencias"
        if (location.pathname === "/dashboard/recomendaciones") return "Recomendaciones"
        if (location.pathname === "/dashboard/notificaciones") return "Notificaciones"
        if (location.pathname === "/dashboard/clientes") return "Clientes"

        return "Dashboard"
    }

    const title = getTitle()

    useEffect(() => {
        const theme = localStorage.getItem("theme")

        if (theme === "dark") {
            document.documentElement.classList.add("dark")
            setDarkmode(true)
        } else {
            document.documentElement.classList.remove("dark")
            setDarkmode(false)
        }
    }, [])

    return (
        <nav className="w-full pt-4">
            <div className="px-4 md:px-6 lg:px-10">

                <div className="flex items-center justify-between flex-nowrap gap-6">

                    <div className="min-w-[200px]">
                        <p className="text-sm text-gray-500 whitespace-nowrap">
                            Pages /{" "}
                            <span className="text-gray-700 font-medium">
                                {title}
                            </span>
                        </p>

                        <h1 className="text-[28px] md:text-[34px] font-bold text-gray-900 whitespace-nowrap">
                            {title}
                        </h1>
                    </div>

                    <div className="flex items-center gap-3">

                        <div className="flex items-center gap-2 sm:gap-3 bg-white dark:bg-navy-800 border border-gray-100 dark:border-white/10
                        rounded-[40px] px-3 py-2 shadow-lg shadow-gray-200/40 dark:shadow-black/30 backdrop-blur-xl
                        flex-nowrap shrink min-w-0 relative z-50">

                            <FiAlignJustify
                                className="text-xl text-gray-600 cursor-pointer block xl:hidden"
                                onClick={onOpenSidenav}
                            />

                            <Dropdown
                                button={
                                    <IoMdNotificationsOutline className="text-xl text-gray-600 cursor-pointer" />
                                }
                                classNames="right-0 mt-3 w-[300px]"
                            >
                                <div className="bg-white p-4 rounded-2xl shadow-xl">
                                    <div className="flex justify-between mb-3">
                                        <p className="font-bold text-sm">Alertas</p>
                                    </div>

                                    <div
                                        onClick={() => navigate("/dashboard/recomendaciones")}
                                        className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-xl cursor-pointer"
                                    >
                                        <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-emerald-900 text-white">
                                            <FiBox />
                                        </div>

                                        <div>
                                            <p className="text-sm font-bold">
                                                Alerta de Stock
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                Agendas están por agotarse
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </Dropdown>

                            <button onClick={toggleDarkMode}>
                                {darkmode ? (
                                    <RiSunFill className="text-xl text-gray-600" />
                                ) : (
                                    <RiMoonFill className="text-xl text-gray-600" />
                                )}
                            </button>

                            <Dropdown
                                button={
                                    <div className="w-9 h-9 rounded-full bg-emerald-50 flex items-center justify-center font-bold text-emerald-900 cursor-pointer hover:scale-105 transition">
                                        U
                                    </div>
                                }
                                classNames="right-0 mt-3 w-64"
                            >
                                <div className="flex flex-col bg-white rounded-2xl shadow-xl overflow-hidden">

                                    <div className="p-4 flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center font-bold text-emerald-900">
                                            U
                                        </div>

                                        <div>
                                            <p className="text-sm font-bold text-gray-800">
                                                Bienvenido,
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                {user?.email}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="h-px bg-gray-100" />

                                    <div className="flex flex-col p-2 text-sm">
                                        <button className="px-3 py-2 text-left font-semibold rounded-lg hover:bg-emerald-50"
                                            onClick={() => navigate("/dashboard/perfil")}>
                                            Perfil
                                        </button>

                                        <button className="px-3 py-2 text-left font-bold rounded-lg text-emerald-900 hover:bg-emerald-50"
                                            onClick={() => {
                                                logout()
                                                navigate("/login")
                                            }}
                                        >
                                            Cerrar sesión
                                        </button>
                                    </div>

                                </div>
                            </Dropdown>

                        </div>

                    </div>

                </div>

            </div>

        </nav>
    )
}