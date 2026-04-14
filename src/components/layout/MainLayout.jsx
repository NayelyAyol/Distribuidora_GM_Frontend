import { useState } from "react"
import Sidebar from "./Sidebar"
import Navbar from "./Navbar"

export default function MainLayout({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false)

    return (
        <div className="min-h-screen bg-gray-50 flex">

            {/* BACKDROP MOBILE */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/40 z-40 xl:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* SIDEBAR */}
            <Sidebar
                open={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
            />

            {/* MAIN CONTENT */}
            <div className="flex-1 flex flex-col min-h-screen xl:ml-[300px]">

                {/* NAVBAR */}
                <Navbar
                    title="Dashboard"
                    onOpenSidenav={() => setSidebarOpen(true)}
                />

                {/* PAGE CONTENT */}
                <main className="flex-1 p-4 md:p-6 lg:p-8">
                    {children}
                </main>

            </div>
        </div>
    )
}