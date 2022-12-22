import styles from './SearchElement.module.css';
import React from 'react'

export const SearchElement = ({ onSearchChange, onSearchSubmit, search }) => {
    return (
        <div className={styles['searchElement-container']}>
            <form onSubmit={onSearchSubmit} className={styles['searchForm']}>
                <input
                    type="text"
                    placeholder="enter your search here"
                    className={styles['search-input']}
                    value={search}
                    onChange={onSearchChange}
                />
                <button className={styles['search-btn']}>
                    Search
                </button>
            </form>
            <div className="glow glow-1 z-10 animate-glow1 bg-pink-400 rounded-100 w-120 h-120 -top-10 -left-10 absolute" />
            <div className="glow glow-2 z-20 animate-glow2 bg-purple-400 rounded-100 w-120 h-120 -top-10 -left-10 absolute" />
            <div className="glow glow-3 z-30 animate-glow3 bg-yellow-400 rounded-100 w-120 h-120 -top-10 -left-10 absolute" />
            <div className="glow glow-4 z-40 animate-glow4 bg-blue-400 rounded-100 w-120 h-120 -top-10 -left-10 absolute" />
        </div>
    )
}
