import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext"
import { toast } from "react-toastify";

export const AuthenticatedGuard = ({ children }) => {
    const { currentUser } = useAuth();
    if (!currentUser) {
        toast.error("You must join in your account or register!");
        document.title = 'login';
        return <Navigate to='/login' />
    }

    return children ? children : <Outlet />
}
