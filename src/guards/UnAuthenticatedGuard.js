import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export const UnAuthenticatedGuard = () => {
    const { currentUser } = useAuth();
    console.log(currentUser);
    if (!currentUser?.uid) {
        return <Outlet />
    }

    return <Navigate to='/' replace />
}
