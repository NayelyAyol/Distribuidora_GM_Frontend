import { Navigate } from "react-router-dom"
import useAuthStore from "@/context/useAuthStore"

const ProtectedRoute = ({ children, roles }) => {
    const token = useAuthStore((state) => state.token)
    const user = useAuthStore((state) => state.user)
    const hydrated = useAuthStore((state) => state._hasHydrated)

    if (!hydrated) return null

    if (!token || !user) {
        return <Navigate to="/login" replace />
    }

    if (roles && !roles.includes(user.rol)){
        return <Navigate to = "/dashboard" replace/>
    }

    return children
}

export default ProtectedRoute