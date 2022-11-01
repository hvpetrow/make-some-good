import React, { useState } from 'react'
import { useCausesContext } from '../../contexts/CauseContext';
import { Spinner } from '../../shared/Spinner';
import { CardTemplate } from '../Home/CardTemplate';
import { SearchElement } from './SearchElement'

export const Search = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [search, setSearch] = useState('');
    const [filteredCauses, setFilteredCauses] = useState('');

    const { searchCause } = useCausesContext();

    const onSearchChange = (e) => {
        setSearch(e.target.value);
        setFilteredCauses(searchCause(e.target.value));
    }

    const onSearchSubmit = (e) => {
        e.preventDefault();
        
        setIsLoading(true);
        setFilteredCauses(searchCause(search));
        setSearch('');
        setIsLoading(false);
    }

    return (
        <>
            <div className="my-7">
                <SearchElement onSearchSubmit={onSearchSubmit} onSearchChange={onSearchChange} search={search} />
                <div className="flex justify-center my-7 ">
                    <div className="grid py-10 justify-center my-20 -space-x-15 grid-cols-1  sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-14">
                        {isLoading
                            ? (<Spinner />)
                            : filteredCauses.length !== 0
                                ? (filteredCauses.map(c => <CardTemplate key={c.id} id={c.id} cause={c.fields} />))
                                : filteredCauses === ''
                                    ? ''
                                    : (<h3 className="no-articles">No matches</h3>)
                        }
                    </div>
                </div>
            </div>
        </>
    )
}
