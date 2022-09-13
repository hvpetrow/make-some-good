import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../firebase";


const causesCollectionRef = collection(db, 'causes')

export const getAllCauses = async () => {
    return getDocs(causesCollectionRef);
}

export const getOneCause = async (id) => {
    const causeDoc = doc(db,'causes',id)
    return getDoc(causeDoc);
}

export const addCause = async (newCause) => {
    return addDoc(causesCollectionRef, newCause);
}

export const updateCause = async (id, updatedCause) => {
    const causeDoc = doc(db, 'causes', id);
    return updateDoc(causeDoc, updatedCause);
}

export const deleteCause = async (id) => {
    const causeDoc = doc(db, 'causes', id);
    return deleteDoc(causeDoc);
}