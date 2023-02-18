import { createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, updateEmail, updatePassword, updateProfile } from 'firebase/auth';
import { doc, increment, setDoc, updateDoc } from 'firebase/firestore';
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
    const [defaultPhotoURL, setDefaultPhotoURL] = useState('https://icons.iconarchive.com/icons/papirus-team/papirus-status/512/avatar-default-icon.png');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false);
        }, []);


        return unsubscribe;
    }, []);

    useEffect(() => {
        if (currentUser?.photoURL) {
            setDefaultPhotoURL(currentUser.photoURL);
        } else {
            setDefaultPhotoURL('https://icons.iconarchive.com/icons/papirus-team/papirus-status/512/avatar-default-icon.png');
        }
    }, [currentUser])

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
        return setDoc(doc(db, "users", uid), {
            firstName: data.firstName,
            lastName: data.lastName,
            country: data.country,
            causes: data.causes
        });
    }

    async function incrementUserCauses(uid) {
        const userDoc = doc(db, 'users', uid);
        return updateDoc(userDoc, { causes: increment(1) });
    }

    function decrementUserCauses(uid) {
        const userDoc = doc(db, 'users', uid);
        return updateDoc(userDoc, { causes: increment(-1) });
    }

    async function uploadProfilePicture(file, currentUser, setLoading) {
        const fileRef = ref(storage, `profilPictures/${currentUser.uid}.png`);
        const snapshot = await uploadBytes(fileRef, file);
        const photo = await getDownloadURL(fileRef);
        setDefaultPhotoURL(photo);
        await updateProfile(currentUser, { photoURL: photo })
        alert("uploaded file!");
        console.log(currentUser.photoURL);
    }

    async function getProfilePicture(userId) {
        try {
            const profilePictureRef = ref(storage, `profilPictures/${userId}.png`);
            return await getDownloadURL(profilePictureRef);
        } catch (err) {
            return 'https://icons.iconarchive.com/icons/papirus-team/papirus-status/512/avatar-default-icon.png';
        }
    }



    const value = {
        currentUser,
        defaultPhotoURL,
        signUp,
        logIn,
        logout,
        resetPassword,
        updateEmailForCurrentUser,
        updatePasswordForCurrentUser,
        setUserAdditionalInfo,
        incrementUserCauses,
        decrementUserCauses,
        uploadProfilePicture,
        getProfilePicture,
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
