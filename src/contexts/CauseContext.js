import { collection, orderBy, query, where } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase";
import { getOneCause } from "../services/causesService";
import { getAll } from "../services/crudService";
import { useAuth } from "./AuthContext";

const CauseContext = createContext();
const causesCollectionRef = collection(db, 'causes');

export function useCausesContext() {
    return useContext(CauseContext);
}

export const CauseProvider = ({ children }) => {
    const [allCauses, setAllCauses] = useState([]);
    const [causes, setCauses] = useState([]);
    const [joinedCauses, setJoinedCauses] = useState([]);
    const { currentUser } = useAuth();
    const [id, setId] = useState('');

    const orderedQuery = query(causesCollectionRef, orderBy("createdAt"));

    useEffect(() => {
        getAll(orderedQuery)
            .then(docs => {
                let arr = [];

                docs.forEach((doc) => {
                    let fields = doc.data();

                    arr.push({
                        id: doc.id,
                        fields: fields
                    });
                });

                setAllCauses(arr);
            })
    }, []);


    const searchCause = (text, criteria = 'title') => {
        return allCauses.filter(x => x.fields[criteria].toLowerCase().includes(text.toLowerCase()));
        //or concrete search - return allCauses.filter(x => x.fields[criteria].toLowerCase().startsWith(text.toLowerCase()));
    }

    const filterForeignUserCauses = (userId) => {
        return allCauses.filter(x => x.fields.creator === userId);
    }

    // const filterCurrentUserCauses = () => {
    //     return allCauses.filter(x => x.creator === currentUser.uid);
    // }

    const filterUserJoinedCauses = (userId) => { 
        return allCauses.filter(x => x.fields.participants.some(p => p === userId) );
    }
   

    // const useGetAllCauses = () => {
    //     useEffect(() => {
    //         getAll(causesCollectionRef)
    //             .then(result => { setCauses(result) });
    //     }, []);
    // }

    return (
        <CauseContext.Provider value={{ causes, setCauses, searchCause, id, setId,filterForeignUserCauses,joinedCauses, setJoinedCauses,filterUserJoinedCauses }}>
            {children}
        </CauseContext.Provider>
    );
}