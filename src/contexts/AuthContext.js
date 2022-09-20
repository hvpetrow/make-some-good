import { createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, updateEmail, updatePassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { useContext } from 'react';
import { auth, db, storage } from '../firebase';

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState();
    const [photoUrlChanged, setPhotoUrlChanged] = useState('');
    const [photoURL, setPhotoURL] = useState('https://icons.iconarchive.com/icons/papirus-team/papirus-status/512/avatar-default-icon.png');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false);
            console.log("mounted authContext and setted user");
        },[]);

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
        return sendPasswordResetEmail(auth, email);
    }

    function updateEmailForCurrentUser(email) {
        return updateEmail(currentUser, email);
    }

    function updatePasswordForCurrentUser(password) {
        return updatePassword(currentUser, password);
    }

    function setUserAdditionalInfo(data, uid) {
        console.log("setUserAdditionalInfo");
        return setDoc(doc(db, "users", uid), {
            firstName: data.firstName,
            lastName: data.lastName,
            country: data.country
        });
    }

    async function uploadProfilePicture(file, currentUser, setLoading) {
        const fileRef = ref(storage, `profilPictures/${currentUser.uid}.png`);
        const snapshot = await uploadBytes(fileRef, file);
        const photoURL = await getDownloadURL(fileRef);

        updateProfile(currentUser, { photoURL })
        alert("uploaded file!")
    }

    const value = {
        currentUser,
        photoURL,
        setPhotoURL,
        signUp,
        logIn,
        logout,
        resetPassword,
        updateEmailForCurrentUser,
        updatePasswordForCurrentUser,
        setUserAdditionalInfo,
        uploadProfilePicture
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
