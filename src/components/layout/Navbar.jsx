import { FiAlignJustify } from "react-icons/fi"

export default function Navbar({ onOpenSidenav }) {
    return (
        <div className="
            fixed top-0 left-0 right-0 z-40
            h-14 flex items-center justify-between
            px-4

            bg-white/10 backdrop-blur-2xl
            border-b border-white/20
        ">

            {/* MENU BUTTON (mobile) */}
            <FiAlignJustify
                className="w-6 h-6 text-emerald-950 cursor-pointer md:hidden"
                onClick={onOpenSidenav}
            />

            {/* TITLE PLACEHOLDER */}
            <h1 className="text-emerald-950 font-bold">
                Dashboard
            </h1>

            {/* EMPTY RIGHT SIDE (por ahora) */}
            <div />
        </div>
    )
}