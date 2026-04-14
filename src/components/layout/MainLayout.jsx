import { useState } from "react"
import Sidebar from "./Sidebar"

export default function MainLayout({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false)

    return (
        <div className="min-h-screen bg-white">

            {/* SIDEBAR */}
            <Sidebar
                open={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
            />

            {/* MAIN CONTENT */}
            <div className="md:ml-64 flex flex-col min-h-screen">

                {/* TOP BAR (placeholder navbar) */}
                <div className="h-14 flex items-center justify-between px-6 
                                bg-white/70 backdrop-blur-md border-b border-gray-200">
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="text-emerald-900 font-semibold md:hidden"
                    >
                        ☰
                    </button>

                    <h1 className="text-emerald-900 font-bold">
                        Dashboard
                    </h1>
                </div>

                {/* CONTENT */}
                <main className="flex-1 p-6 bg-gray-50">
                    {children}
                </main>
            </div>
        </div>
    )
}