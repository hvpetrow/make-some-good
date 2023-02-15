import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "react-toastify";

export const UnAuthenticatedGuard = ({ children }) => {
    const { currentUser } = useAuth();

    if (currentUser) {
        toast.error("You are joined user!");
        document.title = 'Make Some Good';
        return <Navigate to='/' />
    }

    return children ? children : <Outlet />
}
