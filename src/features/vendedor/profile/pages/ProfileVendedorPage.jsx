import ProfileCard from "../../../shared/profile/components/ProfileCard"
import ProfileForm from "../../../shared/profile/components/ProfileForm"
import PasswordCard from "../../../shared/profile/components/PasswordCard"

export default function ProfileVendedorPage({ user }) {

    return (
        <div className="p-6 bg-emerald-50/60 min-h-screen">

            <div>
                <p className="text-gray-500 mb-6">
                    En este módulo puedes gestionar tu información personal y de seguridad
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