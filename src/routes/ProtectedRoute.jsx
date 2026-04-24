import { Navigate } from "react-router-dom"
import useAuthStore from "@/context/useAuthStore"

const ProtectedRoute = ({ children, roles }) => {
    const token = useAuthStore((state) => state.token)
    const user = useAuthStore((state) => state.user)

    if (!token) {
        return <Navigate to="/login" replace />
    }

    if (roles && !roles.includes(user.role)){
        return <Navigate to = "/dashboard" replace/>
    }

    return children
}

export default ProtectedRoute