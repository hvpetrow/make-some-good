import { collection, orderBy, query } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase";
import { getOneCause } from "../services/causesService";
import { getAll } from "../services/crudService";

const CauseContext = createContext();
const causesCollectionRef = collection(db, 'causes');

export function useCausesContext() {
    return useContext(CauseContext);
}

export const CauseProvider = ({ children }) => {
    const [allCauses, setAllCauses] = useState([]);
    const [causes, setCauses] = useState([]);
    const [cause, setCause] = useState([]);
    const[id,setId] = useState('');


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
        allCauses.forEach(x => console.log(x.fields[criteria]));
      return allCauses.filter(x => x.fields[criteria].toLowerCase().includes(text.toLowerCase()));
    //   return allCauses.filter(x => x.fields[criteria].toLowerCase().startsWith(text.toLowerCase()));
    }

    // const useGetAllCauses = () => {
    //     useEffect(() => {
    //         getAll(causesCollectionRef)
    //             .then(result => { setCauses(result) });
    //     }, []);
    // }


    return (
        <CauseContext.Provider value={{ causes, setCauses, searchCause,cause,id,setId }}>
            {children}
        </CauseContext.Provider>
    );
}