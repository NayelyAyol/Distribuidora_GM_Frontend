import ProfileCard from "../../../shared/profile/components/ProfileCard"
import ProfileForm from "../../../shared/profile/components/ProfileForm"
import PasswordCard from "../../../shared/profile/components/PasswordCard"

export default function ProfilePage() {

    return (
        <div className="p-6 bg-emerald-50/60 min-h-screen">

            <div className="mb-6">
                <p className="text-gray-500">
                    Gestiona tu información personal y seguridad
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                <div className="lg:col-span-1">
                    <ProfileCard />
                </div>

                <div className="lg:col-span-2 space-y-6">
                    <ProfileForm />
                    <PasswordCard />
                </div>

            </div>

        </div>
    )
}