import { collection, limit, orderBy, query, startAfter } from "firebase/firestore";
import { useEffect, useState } from "react";

import { useAuth } from "../../contexts/AuthContext";
import { useCausesContext } from "../../contexts/CauseContext";
import { db } from "../../firebase";
import { getAll } from "../../services/crudService";
import { BackToTheTopButton } from "../../shared/BackToTheTopButton";
import { Spinner } from "../../shared/Spinner";
import { CardTemplate } from "./CardTemplate";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export const Home = () => {
    const { currentUser } = useAuth();
    const { causes, setCauses } = useCausesContext();
    const [isLoading, setIsLoading] = useState(true);
    const [latestDoc, setLatestDoc] = useState(0);
    const [clickable, setClickable] = useState(true);
    const [visible, setVisible] = useState(true);

    const causesCollectionRef = collection(db, "causes");
    const orderedQuery = query(causesCollectionRef, orderBy("title"), startAfter(latestDoc || 0), limit(3));

    if (currentUser) {
        console.log("CurrentUserId", currentUser.uid);
    }

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
                        console.log(doc.id, " => ", doc.data());
                    });

                    setCauses(arr);
                    setLatestDoc(docs.docs[docs.docs.length - 1]);
                    console.log("LATEST DOC", latestDoc);
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


                    setCauses(oldArr => [
                        ...oldArr,
                        ...arr
                    ]);

                    setLatestDoc(docs.docs[docs.docs.length - 1]);
                }).then(() => {
                    setIsLoading(false);
                });
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <div className="m-y-10">
                <h1 className="flex justify-center text-center my-7">Home Page</h1>
                <div className=" flex justify-center my-7 ">
                    <div className="grid py-10 justify-center my-7  -space-x-15 grid-cols-1  sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-14">
                        {isLoading
                            ? (<Spinner />)
                            : causes.length !== 0
                                ? (causes.map(c => <CardTemplate key={c.id} id={c.id} cause={c.fields} />))
                                : (<h3 className="no-articles">No articles yet</h3>)
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

                <BackToTheTopButton />
            </div>
        </>
    );
}