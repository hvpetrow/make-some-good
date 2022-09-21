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
export function set(collectionRef,data, id) {
    return setDoc(doc(collectionRef,id), data);
}

export const update = async (collectionRef,id, updatedDoc) => {
    const causeDoc = doc(collectionRef, id);
    return updateDoc(causeDoc, updatedDoc);
}

export const deleteOne = async (collectionRef,id) => {
    const deletedDoc = doc(collectionRef, id);
    return deleteDoc(deletedDoc);
}