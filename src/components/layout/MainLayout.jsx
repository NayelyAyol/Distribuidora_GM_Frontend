import { useState } from "react"
import { Outlet } from "react-router-dom"
import Sidebar from "./Sidebar"
import Navbar from "./Navbar"

export default function MainLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(false)

    return (
        <div className="min-h-screen bg-emerald-50/60 flex overflow-x-hidden">

            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/40 z-40 xl:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            <Sidebar
                open={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
            />

            <div className="flex-1 flex flex-col min-h-screen min-w-0 xl:ml-[300px]">

                <Navbar
                    onOpenSidenav={() => setSidebarOpen(true)}
                />

                <main className="flex-1 p-4 md:p-6 lg:p-8 w-full min-w-0 overflow-x-hidden">
                    <Outlet />
                </main>

            </div>
        </div>
    )
}