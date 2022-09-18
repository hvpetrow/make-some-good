import { createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, updateEmail, updatePassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { useContext } from 'react';
import { auth, db } from '../firebase';

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false);
            console.log("mounted authContext and setted user");
        });

        return unsubscribe;
    }, [])

    function signUp(email, password) {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    function logIn(email, password) {
        return signInWithEmailAndPassword(auth, email, password);
    }

    function logout() {
        return signOut(auth);
    }

    function resetPassword(email) {
        return sendPasswordResetEmail(auth,email);
    }

    function updateEmailForCurrentUser(email) {
        return updateEmail(currentUser,email);
    }

    function updatePasswordForCurrentUser(password) {
        return updatePassword(currentUser,password);
    }

    function setUserAdditionalInfo(data,uid){
        console.log("setUserAdditionalInfo method");
        return setDoc(doc(db,"users",uid), {
            firstName: data.firstName,
            lastName: data.lastName
        });
    }

    const value = {
        currentUser,
        signUp,
        logIn,
        logout,
        resetPassword,
        updateEmailForCurrentUser,
        updatePasswordForCurrentUser,
        setUserAdditionalInfo
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
