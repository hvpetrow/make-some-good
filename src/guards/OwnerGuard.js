import { useEffect, useState } from "react";
import { Navigate, Outlet, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../contexts/AuthContext"
import { getOneCause } from "../services/causesService";

export const OwnerGuard = ({ children }) => {
    const { currentUser } = useAuth();

    const [cause, setCause] = useState();
    const { causeId } = useParams();

    useEffect(() => {
        getOneCause(causeId)
            .then(doc => {
                console.log(doc);
                console.log(doc.data());
                setCause(doc.data())
            })
    }, []);

    if (cause) {
        if (currentUser.uid !== cause.creator) {
            toast.error("Forbidden! You are not creator of the cause!");
            document.title = 'Make Some Good';
            return <Navigate to='/' />
        } else {
            return children ? children : <Outlet />
        }
    }
}
