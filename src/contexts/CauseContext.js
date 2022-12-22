import { collection, orderBy, query } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { db } from "../firebase";
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

    const orderedQuery = query(causesCollectionRef, orderBy('createdAt', 'desc'));

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

    const searchCause = (text, causes, criteria = 'title') => {
        return causes.filter(x => x.fields[criteria].toLowerCase().includes(text.toLowerCase()));
        //or concrete search - return causes.filter(x => x.fields[criteria].toLowerCase().startsWith(text.toLowerCase()));
    }

    const filterForeignUserCauses = (userId) => {
        return allCauses.filter(x => x.fields.creator === userId);
    }

    const filterCurrentUserCauses = () => {
        return allCauses.filter(x => x.creator === currentUser.uid);
    }

    const filterUserJoinedCauses = (userId) => {
        return allCauses.filter(x => x.fields.participants.some(p => p === userId));
    }

    return (
        <CauseContext.Provider value={{ causes, setCauses, searchCause, id, setId, filterForeignUserCauses, joinedCauses, setJoinedCauses, filterUserJoinedCauses, filterCurrentUserCauses }}>
            {children}
        </CauseContext.Provider>
    );
}