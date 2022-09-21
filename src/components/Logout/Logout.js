import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useAuth } from "../../contexts/AuthContext";

export const Logout = () => {
    const [error, setError] = useState('');
    const { currentUser,logout } = useAuth();
    const navigate = useNavigate();

    logout()
        .then(() => {
            navigate('/login', { replace: true });
            toast.success('Successfull Logout!');

            console.log('logged out ' + currentUser.email);
        })
        .catch(() => {
            setError('Failed to logout');
            navigate('/', { replace: true });
        });
 
        console.log(currentUser.email);
    return null;
}
