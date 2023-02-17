import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "react-toastify";


export const UnAuthenticatedGuard = () => {
    const { currentUser } = useAuth();

    if (!currentUser?.uid) {
        return <Outlet />
    }

    // toast.error("You are joined user!");
    return <Navigate to='/' replace />
}
