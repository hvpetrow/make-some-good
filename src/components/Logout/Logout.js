import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export const Logout = () => {
    const [error, setError] = useState('');
    const { currentUser,logout } = useAuth();
    const navigate = useNavigate();

    logout()
        .then(() => {
            navigate('/login', { replace: true });
            console.log('logged out ' + currentUser.email);
        })
        .catch(() => {
            setError('Failed to logout');
            navigate('/', { replace: true });
        });
 
        console.log(currentUser.email);
    return null;
}
