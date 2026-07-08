import { uploadProfileImage } from "../../../shared/profile/services/profileService";
import { toast } from "react-toastify";
import { Camera } from "lucide-react";

export default function ProfileCard({ user, fotoUrl, setFotoUrl }) { 

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("imagen", file);

        const loadingToast = toast.loading("Subiendo foto...");

        try {
            const data = await uploadProfileImage(formData); 
            const nuevaUrl = data.imagen.url;
            setFotoUrl(nuevaUrl);
            toast.dismiss(loadingToast);
            toast.success("Foto de perfil subida correctamente");            
        } catch (error) {
            toast.dismiss(loadingToast);
            toast.error(error.message || "No fue posible subir la foto");
        }
    };

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
        <div className="bg-white/80 backdrop-blur-xl border border-gray-200 shadow-lg rounded-2xl p-4 sm:p-6 flex flex-col gap-6">

            <div className="flex flex-col sm:flex-row items-center sm:items-center gap-4 text-center sm:text-left">

                <div className="relative shrink-0">
                    <img
                        src={fotoUrl || "https://cdn-icons-png.flaticon.com/512/4715/4715329.png"}
                        alt="avatar"
                        className="w-20 h-20 rounded-full border-2 border-emerald-200 object-cover"
                    />

                    <label className="absolute bottom-0 right-0 bg-emerald-600 text-white rounded-full p-2 text-xs cursor-pointer hover:scale-105 transition">
                        <Camera size={16} />
                        <input 
                            type="file" 
                            className="hidden" 
                            onChange={handleFileChange} 
                            accept="image/*" 
                        />
                    </label>
                </div>

                <div className="min-w-0 w-full">
                    <h2 className="text-lg sm:text-xl font-bold text-gray-800 break-words">
                        {user?.nombre} {user?.apellido}
                    </h2>

                    <p className="text-sm text-gray-500">
                        {user?.rol || "Usuario"}
                    </p>
                </div>

            </div>

            <div className="flex flex-col gap-4 text-sm w-full">

                <div className="bg-emerald-50/60 p-3 rounded-xl">
                    <p className="text-gray-500">Correo</p>
                    <p className="font-semibold break-all">
                        {user?.email || "N/A"}
                    </p>
                </div>

                <div className="bg-emerald-50/60 p-3 rounded-xl">
                    <p className="text-gray-500">Celular</p>
                    <p className="font-semibold break-all">
                        {user?.telefono || "N/A"}
                    </p>
                </div>

                <div className="bg-emerald-50/60 p-3 rounded-xl">
                    <p className="text-gray-500">Dirección</p>
                    <p className="font-semibold break-all">
                        {user?.direccion || "N/A"}
                    </p>
                </div>

            </div>
        </div>
    )
}