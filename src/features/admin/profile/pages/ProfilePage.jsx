import ProfileCard from "../../../shared/profile/components/ProfileCard"
import ProfileForm from "../../../shared/profile/components/ProfileForm"
import PasswordCard from "../../../shared/profile/components/PasswordCard"
import { getProfile } from "../../../shared/profile/services/profileService"
import { useEffect, useState } from "react"

export default function ProfilePage() {
    const [user, setUser] = useState(null)

    useEffect(() => {
    const load = async () => {
        try {
            const data = await getProfile()
            const userData = {
                nombre: data.perfil?.nombre,
                apellido: data.perfil?.apellido,
                email: data.usuario?.email,
                direccion: data.perfil?.direccion,
                telefono: data.perfil?.telefono,
                rol: data.usuario?.rol
            }
            setUser(userData)
        } catch (error) {
            console.error("Error al cargar perfil:", error)
        }
    }

    load()
}, [])

    return (
        <div className="p-6 bg-emerald-50/60 min-h-screen">

            <div className="mb-6">
                <p className="text-gray-500">
                    Gestiona tu información personal y seguridad
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                <div className="lg:col-span-1">
                    <ProfileCard user={user} />
                </div>

                <div className="lg:col-span-2 space-y-6">
                    <ProfileForm user={user} />
                    <PasswordCard />
                </div>

            </div>

        </div>
    )
}