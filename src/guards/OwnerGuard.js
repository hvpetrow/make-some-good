import { Navigate, Outlet } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../contexts/AuthContext"
import { useCausesContext } from "../contexts/CauseContext";

export const OwnerGuard = ({ children }) => {
    const { currentUser } = useAuth();
    const { cause } = useCausesContext()

console.log("Hi Owner Guard",currentUser.uid,cause.creator);

    if (currentUser.uid !== cause.creator) {
        toast.error("Forbidden! You are not the creator of the cause!");
        return <Navigate to='/' />
    }

    return children ? children : <Outlet />
}
