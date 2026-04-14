import { useNavigate, useLocation } from "react-router-dom"
import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { buttonPrimaryClass } from "@/utils/styles"
import { FaUserPlus, FaUserCircle } from "react-icons/fa"
import { HiX } from "react-icons/hi"

const Sidebar = ({ open, onClose }) => {
    const navigate = useNavigate()
    const location = useLocation()
    const fileInputRef = useRef(null)

    const user = JSON.parse(localStorage.getItem("user")) || {}

    const logout = () => {
        localStorage.removeItem("user")
        navigate("/login")
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (!file) return

        const reader = new FileReader()
        reader.onloadend = () => {
            const updatedUser = { ...user, avatar: reader.result }
            localStorage.setItem("user", JSON.stringify(updatedUser))
            window.location.reload()
        }

        reader.readAsDataURL(file)
    }

    const isActive = (path) => location.pathname === path

    return (
        <aside className={`
            fixed top-0 left-0
            h-screen w-64
            z-50
            bg-white/10 backdrop-blur-2xl
            border-r border-white/20
            p-6 flex flex-col justify-between
            transform transition-transform duration-300
            ${open ? "translate-x-0" : "-translate-x-full"}
            md:translate-x-0
        `}>

            {/* cerrar mobile */}
            <span
                className="absolute top-4 right-4 md:hidden cursor-pointer text-emerald-900"
                onClick={onClose}
            >
                <HiX size={20} />
            </span>

            {/* TOP */}
            <div>

                {/* USER */}
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
                        {user?.name || "Usuario"}
                    </p>

                    <p className="text-xs text-emerald-900/70">
                        {user?.role || "Rol"}
                    </p>
                </div>

                {/* MENU */}
                <div className="mt-10 flex flex-col gap-2">

                    {/* ITEM 1 */}
                    <div
                        onClick={() => navigate("/dashboard/vendedores")}
                        className={`relative flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-all duration-200
                            ${
                                isActive("/dashboard/vendedores")
                                    ? "text-emerald-900 font-semibold"
                                    : "text-gray-500 hover:text-emerald-900 hover:bg-white/10"
                            }
                        `}
                    >
                        {/* ICONO */}
                        <FaUserPlus
                            className={`transition-colors duration-200
                                ${
                                    isActive("/dashboard/vendedores")
                                        ? "text-emerald-900"
                                        : "text-gray-400"
                                }
                            `}
                        />

                        Nuevo vendedor

                        {/* BARRA LATERAL */}
                        <span
                            className={`absolute right-0 top-0 h-full w-1 rounded-l-full transition-all duration-300
                                ${
                                    isActive("/dashboard/vendedores")
                                        ? "bg-emerald-900 opacity-100"
                                        : "opacity-0"
                                }
                            `}
                        />
                    </div>

                    {/* ITEM 2 */}
                    <div
                        onClick={() => navigate("/dashboard/clientes")}
                        className={`relative flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-all duration-200
                            ${
                                isActive("/dashboard/clientes")
                                    ? "text-emerald-900 font-semibold"
                                    : "text-gray-500 hover:text-emerald-900 hover:bg-white/10"
                            }
                        `}
                    >
                        <FaUserPlus
                            className={`transition-colors duration-200
                                ${
                                    isActive("/dashboard/clientes")
                                        ? "text-emerald-900"
                                        : "text-gray-400"
                                }
                            `}
                        />

                        Nuevo cliente

                        <span
                            className={`absolute right-0 top-0 h-full w-1 rounded-l-full transition-all duration-300
                                ${
                                    isActive("/dashboard/clientes")
                                        ? "bg-indigo-600 opacity-100"
                                        : "opacity-0"
                                }
                            `}
                        />
                    </div>

                </div>
            </div>

            {/* BOTTOM */}
            <Button onClick={logout} className={buttonPrimaryClass}>
                Cerrar sesión
            </Button>

        </aside>
    )
}

export default Sidebar