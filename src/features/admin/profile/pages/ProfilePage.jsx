import ProfileCard from "../../../shared/profile/components/ProfileCard"
import ProfileForm from "../../../shared/profile/components/ProfileForm"
import PasswordCard from "../../../shared/profile/components/PasswordCard"
import { getProfile } from "../../../shared/profile/services/profileService"
import { useEffect, useState } from "react"
import useAuthStore from "@/context/useAuthStore"

export default function ProfilePage() {
    const [user, setUser] = useState(null)
    const setAuth = useAuthStore((state) => state.setAuth)
    const token = useAuthStore((state) => state.token)

    const fetchProfile = async () => {
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
            setAuth({
                token,
                rol: data.usuario?.rol,
                user: {
                    ...useAuthStore.getState().user,
                    nombre: data.perfil?.nombre,
                    apellido: data.perfil?.apellido,
                    email: data.usuario?.email
                }
            })
        } catch (error) {
            console.error("Error al cargar perfil:", error)
        }
    }

    useEffect(() => {
        fetchProfile()
    }, [])

    return (
        <div className="p-6 bg-emerald-50/60 min-h-screen">

            <div>
                <p className="text-gray-500 mb-6">
                    Este módulo te permite gestionar tu información personal y de seguridad
                </p>
            </div>


            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                <div className="lg:col-span-1">
                    <ProfileCard user={user} />
                </div>

                <div className="lg:col-span-2 space-y-6">
                    <ProfileForm user={user}
                        onRefresh={fetchProfile} />
                    <PasswordCard />
                </div>

            </div>

        </div>
    )
}