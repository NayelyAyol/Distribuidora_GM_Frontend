
export default function MainLayout({ children }) {

    return (
        <div className="min-h-screen bg-gradient-to-r from-[#7cfd5b] to-[#fffc2f]">

            {/* Navbar placeholder */}
            <div className="h-14 flex items-center px-4 bg-white/20 backdrop-blur">
                Navbar
            </div>

            <div className="flex">

                {/* Sidebar placeholder */}
                <div className="w-64 hidden md:block bg-white/10">
                    Sidebar
                </div>

                {/* Content */}
                <main className="flex-1 p-6">
                    {children}
                </main>

            </div>
        </div>
    )
}