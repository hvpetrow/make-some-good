import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { getAll } from "./crudService";


const causesCollectionRef = collection(db, 'causes');

export const getAllCauses = async () => {
    return getDocs(causesCollectionRef);
}

export const getOneCause = async (id) => {
    const causeDoc = doc(db, 'causes', id)
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

export function loadThreeCauses(orderedQuery, setMyCauses, setLatestDoc, setIsLoading, setClickable, toast) {
    getAll(orderedQuery)
        .then(docs => {
            if (docs.empty) {
                if (docs.empty) {
                    setClickable(false);
                    toast.warning('There are no more causes!');
                    return;
                }
                setClickable(false);
                return;
            }
            let arr = [];

            docs.forEach((doc) => {
                let fields = doc.data();

                arr.push({
                    id: doc.id,
                    fields: fields
                });
            });

            setMyCauses(oldArr => [
                ...oldArr,
                ...arr
            ]);

            setLatestDoc(docs.docs[docs.docs.length - 1]);
        }).then(() => {
            setIsLoading(false);
        }).catch((error) => {
            console.log(error);
        })
}

export function getLatestCauses(query, setCauses, setIsLoading, setLatestDoc) {
    getAll(query)
        .then(docs => {
            let arr = [];

            docs.forEach((doc) => {
                let fields = doc.data();
                console.log(doc.data());

                arr.push({
                    id: doc.id,
                    fields: fields
                });
            });

            setCauses(arr);
            setLatestDoc(docs.docs[docs.docs.length - 1]);
        }).then(() => {
            setIsLoading(false);
        });
}