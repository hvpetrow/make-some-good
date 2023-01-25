import { addDoc, collection, deleteDoc, doc, getDocs, orderBy, query, updateDoc, where } from "firebase/firestore";
import { db } from "../firebase";

const commentsCollectionRef = collection(db, 'comments');

export const getAllComments = async () => {
    return getDocs(commentsCollectionRef);
}

export const getCommentsByCauseId = async (causeId) => {
    // const result = {};
    const q = query(this.commentRef, where("topicId", "==", causeId), orderBy('createdAt', 'desc'));
    return getDocs(q);
    // querySnapshot.forEach((doc) => {
    //   const id = doc.id;
    //   result[id] = doc.data();
    // });

    // return result;
}

export const postComment = async (newComment) => {
    return addDoc(commentsCollectionRef, newComment);
}

export const updateComment = async (id, updatedComment) => {
    const commentDoc = doc(db, 'comments', id);
    return updateDoc(commentDoc, updatedComment);
}

export const deleteComment = async (id) => {
    const commentDoc = doc(db, 'comments', id);
    return deleteDoc(commentDoc);
}