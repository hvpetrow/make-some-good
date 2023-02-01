import styles from './Search.module.css';

import React, { useState } from 'react'
import { useCausesContext } from '../../contexts/CauseContext';
import { Spinner } from '../../shared/Spinner';
import { CardTemplate } from '../Home/CardTemplate/CardTemplate';
import { SearchElement } from './SearchElement'
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { getAll } from '../../services/crudService';
import { collection } from 'firebase/firestore';
import { db } from '../../firebase';



export const Search = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [search, setSearch] = useState('');
    const [causes, setCauses] = useState([]);
    const [filteredCauses, setFilteredCauses] = useState('');

    const { searchCause } = useCausesContext();

    const causesCollectionRef = collection(db, "causes");

    useEffect(() => {
        document.title = 'Search';

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

                    setCauses(arr);
                }).then(() => {
                    setIsLoading(false);
                });
        } catch (error) {
            console.log(error);
        }
    }, []);

    const onSearchChange = (e) => {
        setSearch(e.target.value);
    }

    const onSearchSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);

        if (search === '') {
            toast.warning('You must add search criteria!');
        } else {
            setFilteredCauses(searchCause(search, causes));
            setSearch('');
        }

        setIsLoading(false);
    }

    return (
        <section className={styles['search']}>
            <SearchElement onSearchSubmit={onSearchSubmit} onSearchChange={onSearchChange} search={search} />
            <div className={styles['results-container']}>
                {isLoading
                    ? (<Spinner />)
                    : filteredCauses.length !== 0
                        ? (filteredCauses.map(c => <CardTemplate key={c.id} id={c.id} cause={c.fields} />))
                        : filteredCauses === ''
                            ? ''
                            : (<h3 className={styles['no-articles']}>No matches for your search.</h3>)
                }
            </div>
        </section>
    )
}
