import { useNavigate, useLocation } from "react-router-dom"
import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { buttonPrimaryClass } from "@/utils/styles"
import { FaUserPlus, FaUserCircle, FaUsers, FaShoppingBag, FaChartBar } from "react-icons/fa"
import { HiX } from "react-icons/hi"
import useAuthStore from "@/context/useAuthStore"
import { MdLightbulbOutline, MdNotifications, MdFeedback } from "react-icons/md"

const Sidebar = ({ open, onClose }) => {
    const navigate = useNavigate()
    const location = useLocation()
    const fileInputRef = useRef(null)

    const user = useAuthStore((state) => state.user)
    const logout = useAuthStore((state) => state.logout)

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (!file) return

        const reader = new FileReader()
        reader.onloadend = () => {
            const updatedUser = {
                ...user,
                avatar: reader.result
            }

            useAuthStore.setState({ user: updatedUser })
        }

        reader.readAsDataURL(file)
    }

    const isActive = (path) =>
        location.pathname === path ||
        (path !== "/dashboard" && location.pathname.startsWith(path))

    const menuItems = [
        {
            label: "Mi perfil",
            path: "/dashboard/perfil",
            icon: FaUserCircle,
            color: "emerald",
            roles: ["ADMINISTRADOR", "VENDEDOR"]
        },
        {
            label: "Vendedores",
            path: "/dashboard/vendedores",
            icon: FaUserPlus,
            color: "emerald",
            roles: ["ADMINISTRADOR"]
        },
        {
            label: "Clientes",
            path: "/dashboard/clientes",
            icon: FaUsers,
            color: "emerald",
            roles: ["VENDEDOR"]
        },
        {
            label: "Usuarios",
            path: "/dashboard/usuarios",
            icon: FaUsers,
            color: "emerald",
            roles: ["ADMINISTRADOR"]
        },
        {
            label: "Categorías",
            path: "/dashboard/categorias",
            icon: FaShoppingBag,
            color: "emerald",
            roles: ["ADMINISTRADOR"]
        },
        {
            label: "Quejas y sugerencias",
            path: "/dashboard/quejas-sugerencias",
            icon: MdFeedback,
            color: "emerald",
            roles: ["ADMINISTRADOR", "VENDEDOR"]

        },
                {
            label: "Recomendaciones",
            path: "/dashboard/recomendaciones",
            icon: MdLightbulbOutline,
            color: "emerald",
            roles: ["ADMINISTRADOR"]

        },
        {
            label: "Notificaciones",
            path: "/dashboard/notificaciones",
            icon: MdNotifications,
            color: "emerald",
            roles: ["ADMINISTRADOR", "VENDEDOR"]

        },
        {
            label: "Dashboard",
            path: "/dashboard",
            icon: FaChartBar,
            color: "emerald",
            roles: ["ADMINISTRADOR", "VENDEDOR"]
        },
    ]

    const filteredItems = menuItems.filter(item =>
        item.roles.includes(user?.role)
    )

    return (
        <aside className={`
    fixed top-0 left-0
    h-screen w-[300px]
    z-50 bg-white
    p-6 flex flex-col
    transform transition-transform duration-300
    ${open ? "translate-x-0" : "-translate-x-full"}
    md:translate-x-0
`}>

            <span
                className="absolute top-4 right-4 md:hidden cursor-pointer text-emerald-900"
                onClick={onClose}
            >
                <HiX size={20} />
            </span>

            <div className="flex flex-col items-center gap-3">
                <div
                    className="w-24 h-24 rounded-full overflow-hidden cursor-pointer border-4 border-white/40"
                    onClick={() => fileInputRef.current.click()}
                >
                    {user?.avatar ? (
                        <img src={user.avatar} className="w-full h-full object-cover" />
                    ) : (
                        <FaUserCircle className="w-full h-full text-emerald-900" />
                    )}
                </div>

                <input
                    type="file"
                    className="hidden"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                />

                <p className="text-emerald-950 font-bold">
                    {user?.nombre
                        ? `${user.nombre.charAt(0).toUpperCase() + user.nombre.slice(1)} ${user.apellido || ""}`
                        : "Usuario"}
                </p>

                <p className="text-xs text-emerald-900/70">
                    {user?.role || "Rol"}
                </p>
            </div>

            <div className="mt-10 flex flex-col gap-2 flex-1 overflow-y-auto custom-scroll pr-2">

                {filteredItems.map((item) => {
                    const Icon = item.icon
                    const active = isActive(item.path)

                    return (
                        <div
                            key={item.path}
                            onClick={() => navigate(item.path)}
                            className={`relative flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-all duration-200
                        ${active
                                    ? "text-emerald-900 font-semibold"
                                    : "text-gray-500 hover:text-emerald-900 hover:bg-emerald-50"
                                }
                    `}
                        >
                            <Icon
                                className={`transition-colors duration-200
                            ${active ? "text-emerald-900" : "text-gray-400"}
                        `}
                            />

                            {item.label}

                            <span
                                className={`absolute right-0 top-0 h-full w-1 rounded-l-full transition-all duration-300
                            ${active
                                        ? "bg-emerald-600 opacity-100"
                                        : "opacity-0"
                                    }
                        `}
                            />
                        </div>
                    )
                })}

            </div>

            <div className="pt-6 border-t border-gray-200">
                <Button onClick={logout} className={buttonPrimaryClass}>
                    Cerrar sesión
                </Button>
            </div>

        </aside>
    )
}

export default Sidebar