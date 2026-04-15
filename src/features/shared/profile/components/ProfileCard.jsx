export default function ProfileCard({ user }) {

    if (!user) {
        return (
            <div className="bg-white/80 backdrop-blur-xl border border-gray-200 shadow-lg rounded-2xl p-6">
                <p className="text-gray-500 text-sm">
                    Cargando perfil...
                </p>
            </div>
        )
    }

    return (
        <div className="bg-white/80 backdrop-blur-xl border border-gray-200 shadow-lg rounded-2xl p-6 flex flex-col gap-6">

            <div className="flex items-center gap-4">

                <div className="relative">
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/4715/4715329.png"
                        alt="avatar"
                        className="w-20 h-20 rounded-full border-2 border-emerald-200"
                    />

                    <label className="absolute bottom-0 right-0 bg-emerald-600 text-white rounded-full p-1 text-xs cursor-pointer hover:scale-105 transition">
                        📷
                        <input type="file" className="hidden" />
                    </label>
                </div>

                <div>
                    <h2 className="text-xl font-bold text-gray-800">
                        {user?.nombre} {user?.apellido}
                    </h2>

                    <p className="text-sm text-gray-500">
                        {user?.rol || "Usuario"}
                    </p>
                </div>

            </div>

            {/* INFO */}
            <div className="grid grid-cols-2 gap-4 text-sm">

                <div className="bg-emerald-50/60 p-3 rounded-xl">
                    <p className="text-gray-500">Correo</p>
                    <p className="font-semibold">
                        {user?.email || "N/A"}
                    </p>
                </div>

                <div className="bg-emerald-50/60 p-3 rounded-xl">
                    <p className="text-gray-500">Celular</p>
                    <p className="font-semibold">
                        {user?.celular || "N/A"}
                    </p>
                </div>

                <div className="bg-emerald-50/60 p-3 rounded-xl col-span-2">
                    <p className="text-gray-500">Dirección</p>
                    <p className="font-semibold">
                        {user?.direccion || "N/A"}
                    </p>
                </div>

            </div>

        </div>
    )
}