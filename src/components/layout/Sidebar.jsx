import { useNavigate, useLocation } from "react-router-dom"
import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { buttonPrimaryClass } from "@/utils/styles"
import { FaUserPlus, FaUserCircle } from "react-icons/fa"
import { HiX } from "react-icons/hi"
import useAuthStore from "@/context/useAuthStore"

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
            // opcional: actualizar solo UI (NO backend)
            const updatedUser = {
                ...user,
                avatar: reader.result
            }

            useAuthStore.setState({ user: updatedUser })
        }

        reader.readAsDataURL(file)
    }

    const isActive = (path) => location.pathname.startsWith(path)

    const menuItems = [
        {
            label: "Mi perfil",
            path: "/dashboard/perfil",
            icon: FaUserCircle,
            color: "blue"
        },{
            label: "Nuevo vendedor",
            path: "/dashboard/vendedores",
            icon: FaUserPlus,
            color: "emerald"
        },
        {
            label: "Nuevo cliente",
            path: "/dashboard/clientes",
            icon: FaUserPlus,
            color: "indigo"
        },
        
    ]

    return (
        <aside className={`
        fixed top-0 left-0
        h-screen
        w-[300px]
        z-50
        bg-white
        p-6 flex flex-col justify-between
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

            <div>

                <div className="flex flex-col items-center gap-3">

                    <div
                        className="w-24 h-24 rounded-full overflow-hidden cursor-pointer border-4 border-white/40"
                        onClick={() => fileInputRef.current.click()}
                    >
                        {user?.avatar ? (
                            <img
                                src={user.avatar}
                                className="w-full h-full object-cover"
                            />
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
                        {user?.name || "Usuario"}
                    </p>

                    <p className="text-xs text-emerald-900/70">
                        {user?.role || "Rol"}
                    </p>
                </div>

                <div className="mt-10 flex flex-col gap-2">

                    {menuItems.map((item) => {
                        const Icon = item.icon
                        const active = isActive(item.path)

                        return (
                            <div
                                key={item.path}
                                onClick={() => navigate(item.path)}
                                className={`relative flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-all duration-200
                                    ${
                                        active
                                            ? "text-emerald-900 font-semibold"
                                            : "text-gray-500 hover:text-emerald-900 hover:bg-white/10"
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
                                        ${
                                            active
                                                ? `bg-${item.color}-600 opacity-100`
                                                : "opacity-0"
                                        }
                                    `}
                                />
                            </div>
                        )
                    })}

                </div>
            </div>

            <Button onClick={logout} className={buttonPrimaryClass}>
                Cerrar sesión
            </Button>

        </aside>
    )
}

export default Sidebar