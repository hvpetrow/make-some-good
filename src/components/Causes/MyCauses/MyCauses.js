import { collection, limit, orderBy, query, startAfter, where } from "firebase/firestore";
import { useEffect } from "react";

import { useAuth } from "../../../contexts/AuthContext";
import { getAll } from "../../../services/crudService";
import { db } from "../../../firebase";
import { CardTemplate } from "../Catalog/CardTemplate";
import { useState } from "react";
import { toast } from "react-toastify";
import { Spinner } from "../../../shared/Spinner";

const causesCollectionRef = collection(db, "causes");


export const MyCauses = () => {
    const { currentUser } = useAuth();
    const [isLoading, setIsLoading] = useState(true);
    const [clickable, setClickable] = useState(true);
    const [visible, setVisible] = useState(true);
    const [myCauses, setMyCauses] = useState([]);
    const [latestDoc, setLatestDoc] = useState(0);

    const orderedQuery = query(causesCollectionRef,where("creator","==",currentUser.uid),orderBy("createdAt"), startAfter(latestDoc || 0), limit(3));

    useEffect(() => {
        try {
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


                        setMyCauses(arr);
                    setLatestDoc(docs.docs[docs.docs.length - 1]);


                }).then(() => {
                    setIsLoading(false);
                });
        } catch (error) {
            console.log(error);
        }

    }, []);

    const loadMoreClickHandler = async (e) => {
        console.log("load more clicked");

        try {
            getAll(orderedQuery)
                .then(docs => {
                    if (docs.empty) {
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


                    console.log("LATEST DOC", latestDoc);
                    setLatestDoc(docs.docs[docs.docs.length - 1]);
                }).then(() => {
                    setIsLoading(false);
                });
        } catch (error) {
            console.log(error);
        }
    }

    console.log(myCauses);

    return (
        <div>
            <h1 className="flex justify-center text-center my-7 font-medium leading-tight text-5xl text-blue-700">My causes Page</h1>
            <div className="flex justify-center my-7">
                <div className="grid py-10 justify-center my-7 -space-x-15 grid-cols-1  sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-14">
                    {isLoading
                        ? (<Spinner />)
                        : myCauses.length !== 0
                            ? (myCauses.map(c => <CardTemplate key={c.id} id={c.id} cause={c.fields} />))
                            : (<h3 className="font-medium leading-tight text-xl">No articles yet</h3>)
                    }
                </div>
            </div>
            {visible &&
                    <div className="flex justify-center m-y-5">
                        <button id="load-more-button" className="inline-block px-7 py-3 max-w-sm bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
                            data-mdb-ripple="true"
                            data-mdb-ripple-color="light"
                            onClick={clickable ? loadMoreClickHandler : () => {
                                toast.warning('No more causes', {
                                    position: toast.POSITION.BOTTOM_CENTER
                                });
                                setVisible(false);
                            }}>load more</button>
                    </div>
                }
        </div>
    );
}
