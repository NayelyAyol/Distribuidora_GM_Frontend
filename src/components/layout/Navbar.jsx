import { useState } from "react"
import { FiAlignJustify, FiSearch } from "react-icons/fi"
import { RiMoonFill, RiSunFill } from "react-icons/ri"
import { IoMdNotificationsOutline } from "react-icons/io"
import { FiBox } from "react-icons/fi"
import { Input } from "@/components/ui/Input"
import { inputClass } from "@/utils/styles"

import Dropdown from "@/components/ui/Dropdown"

export default function Navbar({ onOpenSidenav, title = "Dashboard" }) {
    const [darkmode, setDarkmode] = useState(false)

    const toggleDarkMode = () => {
        document.body.classList.toggle("dark")
        setDarkmode(!darkmode)
    }

    return (
        <nav className="w-full px-4 md:px-6 pt-4 bg-emerald-50/60 border-gray-200/50">

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">

                <div>
                    <p className="text-sm text-gray-500">
                        Pages / <span className="text-gray-700 font-medium">{title}</span>
                    </p>

                    <h1 className="text-[28px] md:text-[34px] font-bold text-gray-900">
                        {title}
                    </h1>
                </div>

                <div className="
  flex items-center justify-between gap-3

  bg-white
  dark:bg-navy-800

  border border-gray-100 dark:border-white/10

  rounded-[40px]

  px-3 py-2

  w-full md:w-auto

  shadow-lg shadow-gray-200/40 dark:shadow-black/30

  backdrop-blur-xl
">
                    <div className="
                        flex items-center
                        bg-white
                        rounded-full
                        px-3 py-2
                        w-full md:w-[260px]
                        min-w-0
                    ">
                        <FiSearch className="text-gray-500 mr-2 flex-shrink-0" />
                        <Input
                            type="text"
                            placeholder="Buscar..."
                            className={`${inputClass} bg-emerald-50/60`}
                        />
                    </div>

                    <FiAlignJustify
                        className="text-xl text-gray-600 cursor-pointer block xl:hidden"
                        onClick={onOpenSidenav}
                    />

                    <div className="flex items-center gap-3">

                        <Dropdown
                            button={
                                <IoMdNotificationsOutline className="text-xl text-gray-600 cursor-pointer" />
                            }
                            classNames="right-0 mt-3 w-[300px]"
                        >
                            <div className="bg-white p-4 rounded-2xl shadow-xl">
                                <div className="flex justify-between mb-3">
                                    <p className="font-bold text-sm">Notificaciones</p>
                                    <p className="text-xs text-gray-500">Marcar todo</p>
                                </div>

                                <div className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-xl">
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
                                <RiSunFill className="text-xl text-emerald-50" />
                            ) : (
                                <RiMoonFill className="text-xl text-gray-600" />
                            )}
                        </button>

                        <Dropdown
                            button={
                                <div className="
                                    w-9 h-9 rounded-full
                                    bg-emerald-50
                                    flex items-center justify-center
                                    font-bold text-emerald-900
                                    cursor-pointer
                                    hover:scale-105 transition
                                ">
                                    U
                                </div>
                            }
                            classNames="right-0 mt-3 w-64"
                        >
                            <div className="flex flex-col bg-white rounded-2xl shadow-xl overflow-hidden">

                                <div className="p-4 flex items-center gap-3">
                                    <div className="
                                        w-10 h-10 rounded-full
                                        bg-emerald-50
                                        flex items-center justify-center
                                        font-bold text-emerald-900
                                    ">
                                        U
                                    </div>

                                    <div>
                                        <p className="text-sm font-bold text-gray-800">
                                            👋 Bienvenido, Usuario
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            usuario@email.com
                                        </p>
                                    </div>
                                </div>

                                <div className="h-px bg-gray-100" />

                                <div className="flex flex-col p-2 text-sm">
                                    <button className="px-3 py-2 text-left rounded-lg hover:bg-gray-50">
                                        👤 Perfil
                                    </button>

                                    <button className="px-3 py-2 text-left rounded-lg text-red-500 hover:bg-red-50">
                                        🚪 Cerrar sesión
                                    </button>
                                </div>

                            </div>
                        </Dropdown>

                    </div>
                </div>
            </div>
        </nav>
    )
}