
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useAuth } from "../../../contexts/AuthContext";

export const Logout = () => {
    const { currentUser, logout, takePrevUser } = useAuth();
    const navigate = useNavigate();
    console.log("LOGOUT");
    console.log(currentUser);
    takePrevUser(currentUser);

    logout()
        .then(() => {
            navigate('/login', { replace: true });
            toast.success('Successfull Logout!');

            console.log('logged out ' + currentUser.email);
        })
        .catch(() => {
            toast.error('Failed to logout');
            navigate('/', { replace: true });
        });

    return null;
}
