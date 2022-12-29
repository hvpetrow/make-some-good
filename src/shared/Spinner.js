import styles from './Spinner.module.css';

import React from 'react'

export const Spinner = () => {
    return (

        <div className={styles['ring']}>
            Loading
            <span className={styles['ring_span']}></span>
        </div>
    )
}
