import { collection } from "firebase/firestore";
import { useEffect } from "react";

import { useAuth } from "../../contexts/AuthContext";
import { useCausesContext } from "../../contexts/CauseContext";
import { db } from "../../firebase";
import { getAll } from "../../services/crudService";
import { CardTemplate } from "./CardTemplate";

const causesCollectionRef = collection(db, "causes");


export const Home = () => {
    const { currentUser } = useAuth();
    const { causes,setCauses } = useCausesContext();

    if (currentUser) { 
        console.log(currentUser.uid);
    }

    useEffect(() => {
        try {
            getAll(causesCollectionRef)
                .then(docs => { 
                    let arr = [];

                    docs.forEach((doc) => {
                      let fields = doc.data();

                      arr.push({
                        id: doc.id,
                        fields: fields
                      });
                      
                    });
                    
                    setCauses(arr)
                });
        } catch (error) {
            console.log(error);
        }
    }, []);

    console.log(causes);

    return (
        <div className="flex justify-center my-7">
            <div className="grid py-10 justify-center my-7 -space-x-15 grid-cols-1  sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-14">
            {causes
                ? causes.map(c => <CardTemplate key={c.id} cause={c.fields} />)
                : <h3 className="no-articles">No articles yet</h3>
            }
            </div>
        </div>
    );
}