import styles from './Search.module.css';

import React, { useState } from 'react'
import { useCausesContext } from '../../contexts/CauseContext';
import { Spinner } from '../../shared/Spinner';
import { CardTemplate } from '../Home/CardTemplate';
import { SearchElement } from './SearchElement'
import { toast } from 'react-toastify';

export const Search = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [search, setSearch] = useState('');
    const [filteredCauses, setFilteredCauses] = useState('');

    const { searchCause } = useCausesContext();

    const onSearchChange = (e) => {
        setSearch(e.target.value);
    }

    const onSearchSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);

        if (search === '') {
            toast.warning('You must add search criteria!');
        } else {
            setFilteredCauses(searchCause(search));
            setSearch('');
        }

        setIsLoading(false);
    }

    return (
        <section className="search">
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
