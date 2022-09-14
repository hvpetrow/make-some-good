import { createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { useContext } from 'react';
import { auth } from '../firebase';

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            console.log("mounted authContext");
        });

        return unsubscribe;
    }, [])

    function signUp(email, password) {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const value = {
        currentUser,
        signUp
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
