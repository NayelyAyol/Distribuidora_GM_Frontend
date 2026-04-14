import { useState } from "react"
import Sidebar from "./Sidebar"
import Navbar from "./Navbar"

export default function MainLayout({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false)

    return (
        <div className="min-h-screen bg-white flex">

            <Sidebar
                open={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
            />

            <div className="flex-1 flex flex-col min-h-screen ml-0 xl:ml-64">

                <Navbar
                    title="Dashboard"
                    onOpenSidenav={() => setSidebarOpen(true)}
                />

                <main className="flex-1 p-6 bg-gray-50">
                    {children}
                </main>

            </div>
        </div>
    )
}