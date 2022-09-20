import { collection } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { db } from "../firebase";
import { getAll } from "../services/crudService";

const CauseContext = createContext();
const causesCollectionRef = collection(db, 'causes');

export function useCausesContext() {
    return useContext(CauseContext);
}

export const CauseProvider = ({ children }) => {
    const [causes, setCauses] = useState([]);

    useEffect(() => {
        getAll(causesCollectionRef)
            .then(result => { setCauses(result) });
    }, []);

    // const useGetAllCauses = () => {
    //     useEffect(() => {
    //         getAll(causesCollectionRef)
    //             .then(result => { setCauses(result) });
    //     }, []);
    // }

    // const editGameHandler = (editedGame) => {
    //     setGames(games => {
    //         return [
    //             ...games.map(g => g._id !== editedGame._id ? g : editedGame)
    //         ]
    //     });
    // }

    // const selectGame = (gameId) => {
    //     return games.find(g => g._id === gameId);
    // }

    // const addComment = (gameId, comment) => {
    //     setGames(state => {
    //         const game = state.find(g => g._id === gameId);

    //         const comments = game.comments || [];
    //         comments.push(comment);

    //         return [
    //             ...state.filter(x => x._id !== gameId),
    //             { ...game, comments }
    //         ]
    //     })
    // }

    // const addGameHandler = (gameData) => {
    //     setGames(state => [
    //         ...state,
    //         gameData
    //     ]);
    // }

    return (
        <CauseContext.Provider value={{ causes }}>
            {children}
        </CauseContext.Provider>
    );
}