import { useState } from "react"
import Sidebar from "./Sidebar"
import Navbar from "./Navbar"

export default function MainLayout({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false)

    return (
        <div className="min-h-screen flex bg-emerald-50/60">

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

            <div className="flex-1 flex flex-col min-h-screen xl:ml-[300px]">

                <Navbar
                    title="Dashboard"
                    onOpenSidenav={() => setSidebarOpen(true)}
                />

                <main className="flex-1 p-4 md:p-6 lg:p-8">
                    {children}
                </main>

            </div>
        </div>
    )
}