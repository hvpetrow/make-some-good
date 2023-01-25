import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

const commentsCollectionRef = collection(db, 'comments');

export const getAllComments = async () => {
    return getDocs(commentsCollectionRef);
}


export const postComment = async (newComment) => {
    return addDoc(commentsCollectionRef, newComment);
}

export const updateComment = async (id, updatedComment) => {
    const commentDoc = doc(db, 'comments', id);
    return updateDoc(commentDoc, updatedComment);
}

export const deleteComment = async (id) => {
    const commentDoc = doc(db, 'causes', id);
    return deleteDoc(commentDoc);
}