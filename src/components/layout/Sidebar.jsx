import { useNavigate, useLocation, matchPath } from "react-router-dom";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { buttonPrimaryClass } from "@/utils/styles";
import {
    FaUserPlus,
    FaUserCircle,
    FaUsers,
    FaShoppingBag,
    FaChartBar,
    FaClipboardList,
    FaMoneyBillWave
} from "react-icons/fa";
import { HiX } from "react-icons/hi";
import useAuthStore from "@/context/useAuthStore";
import { MdLightbulbOutline, MdFeedback, MdInventory } from "react-icons/md";
import { MdAddShoppingCart } from "react-icons/md"
import { FiMessageSquare, FiGrid, FiMessageCircle, FiDollarSign  } from "react-icons/fi"

const Sidebar = ({ open, onClose }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const fileInputRef = useRef(null);

    const user = useAuthStore((state) => state.user);
    const hydrated = useAuthStore((state) => state._hasHydrated);
    const logout = useAuthStore((state) => state.logout);

    const role = user?.rol?.toUpperCase?.() || null;

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file || !user) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            const updatedUser = {
                ...user,
                avatar: reader.result,
            };

            useAuthStore.setState({ user: updatedUser });
        };

        reader.readAsDataURL(file);
    };

    const isActive = (path) =>
        matchPath({ path, end: true }, location.pathname);

    const menuItems = [
        {
            label: "Dashboard",
            path: "/dashboard",
            icon: FaChartBar,
            roles: ["ADMINISTRADOR", "VENDEDOR"],
        },
        {
            label: "Mi perfil",
            path: "/dashboard/perfil",
            icon: FaUserCircle,
            roles: ["ADMINISTRADOR", "VENDEDOR", "CLIENTE"],
        },
        {
            label: "Vendedores",
            path: "/dashboard/vendedores",
            icon: FaUserPlus,
            roles: ["ADMINISTRADOR"],
        },
        {
            label: "Pedidos pendientes",
            path: "/dashboard/pedidos",
            icon: FaClipboardList,
            roles: ["VENDEDOR"],
        },
        {
            label: "Usuarios",
            path: "/dashboard/usuarios",
            icon: FaUsers,
            roles: ["ADMINISTRADOR"],
        },
        {
            label: "Mis pedidos",
            path: "/dashboard/mis-pedidos",
            icon: MdInventory,
            roles: ["VENDEDOR", "CLIENTE"],
        },
        {
            label: "Ventas",
            path: "/dashboard/ventas",
            icon: FaMoneyBillWave,
            roles: ["VENDEDOR"],
        },
        {
            label: "Mis ventas",
            path: "/dashboard/mis-ventas",
            icon: FiDollarSign,
            roles: ["VENDEDOR"],
        },
        {
            label: "Categorías",
            path: "/dashboard/categorias",
            icon: FaShoppingBag,
            roles: ["ADMINISTRADOR", "VENDEDOR"],
        },
        {
            label: "Catálogo",
            path: "/dashboard/catalogo",
            icon: FiGrid,
            roles: ["CLIENTE"],
        },
        {
            label: "Mi carrito",
            path: "/dashboard/mi-carrito",
            icon: MdAddShoppingCart,
            roles: ["CLIENTE"],
        },
        {
            label: "Quejas y Sugerencias",
            path: "/dashboard/mis-quejas-y-sugerencias",
            icon: FiMessageSquare,
            roles: ["CLIENTE"],
        },
        {
            label: "Quejas y sugerencias",
            path: "/dashboard/quejas-sugerencias",
            icon: MdFeedback,
            roles: ["ADMINISTRADOR"],
        },
        {
            label: "Recomendaciones",
            path: "/dashboard/recomendaciones",
            icon: MdLightbulbOutline,
            roles: ["ADMINISTRADOR"],
        },
        {
            label: "Recomendaciones",
            path: "/dashboard/recomendaciones-vendedor",
            icon: MdLightbulbOutline,
            roles: ["VENDEDOR"],
        },
    ];

    const filteredItems = menuItems.filter(
        (item) => role && item.roles.includes(role)
    );

    if (!hydrated) return null;

    return (
        <aside
            className={`
        fixed top-0 left-0
        h-screen w-[300px]
        z-50 bg-white
        p-6 flex flex-col
        transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0
        `}
        >
            <span
                className="absolute top-4 right-4 md:hidden cursor-pointer text-emerald-900"
                onClick={onClose}
            >
                <HiX size={20} />
            </span>

            <div className="flex flex-col items-center gap-3">
                <div
                    className="w-24 h-24 rounded-full overflow-hidden cursor-pointer border-4 border-white/40"
                >
                    {user?.fotoUrl ? (
                        <img src={user.fotoUrl} alt="Avatar" className="w-full h-full object-cover" />
                    ) : (
                        <FaUserCircle className="w-full h-full text-emerald-900" />
                    )}
                </div>

                <p className="text-emerald-950 font-bold">
                    {[user?.nombre, user?.apellido].filter(Boolean).join(" ") ||
                        user?.email ||
                        "Usuario"}
                </p>

                <p className="text-xs text-emerald-900/70">
                    {user?.rol || "Rol"}
                </p>
            </div>

            <div className="mt-10 flex flex-col gap-2 flex-1 overflow-y-auto custom-scroll pr-2">
                {filteredItems.map((item) => {
                    const Icon = item.icon;
                    const active = isActive(item.path);

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
                    ${active ? "bg-emerald-600 opacity-100" : "opacity-0"}
                `}
                            />
                        </div>
                    );
                })}
            </div>

            <div className="pt-6 border-t border-gray-200">
                <Button onClick={logout} className={buttonPrimaryClass}>
                    Cerrar sesión
                </Button>
            </div>
        </aside>
    );
};

export default Sidebar;