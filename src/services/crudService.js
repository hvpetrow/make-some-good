import { addDoc, deleteDoc, doc, getDoc, getDocs, setDoc, updateDoc } from "firebase/firestore";

export const getAll = async (collectionRef) => {
    return getDocs(collectionRef);
}

export const getOne = async (collectionRef,id) => {
    const oneDoc = doc(collectionRef,id)
    return getDoc(oneDoc);
}

//automatic generated id
export const add = async (collectionRef,newDoc) => {
    return addDoc(collectionRef, newDoc);
}

//manually setted id
export function set(collectionRef,data, uid) {
    return setDoc(doc(collectionRef,uid), {
        firstName: data.firstName,
        lastName: data.lastName
    });
}

export const update = async (collectionRef,id, updatedDoc) => {
    const causeDoc = doc(collectionRef, id);
    return updateDoc(causeDoc, updatedDoc);
}

export const deleteOne = async (collectionRef,id) => {
    const causeDoc = doc(collectionRef, id);
    return deleteDoc(causeDoc);
}