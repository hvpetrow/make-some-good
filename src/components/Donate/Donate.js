import styles from './Donate.module.css';

import React, { useState } from 'react'

export const Donate = () => {
    document.title = 'Donate';

    const [clicked, setClicked] = useState(false);

    const bankAccount = (
        <div className="bg-gray-300 rounded-lg">
            <div className="py-4 px-4">
                <div className="flex flex-col">
                    <h4 className="text-lg font-semibold mb-3">
                        Bank Account
                    </h4>
                    <div className="flex flex-col text-sm text-gray-700">
                        <span className="mb-1">
                            <strong>Bank: </strong>bankName</span>
                        <span className="mb-1"><strong>IBAN: </strong>111111111</span>
                        <span className="mb-1"><strong>BIC: </strong>11111111</span>
                        <span className="mb-1"><strong>Reciever: </strong>recieverName</span>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <section id={styles['donate']}>
            <div className={styles['donate-ctn']}>
                <div className={styles['reasons-ctn']}>
                    <h2 className={styles['reasons-title']}>
                        Why you should donate?
                    </h2>
                    <p className={styles['reasons-content']}>
                        With your donation we can reach great lenghts! We can achieve
                        amazing things. We're a small team.
                    </p>
                </div>
                <div className={styles['curr-work-ctn']}>
                    <h4 className={styles['curr-work-title']}>
                        We're currently working on
                    </h4>
                    <div className={styles['p-ctn']}>
                        <p >The next cryptocurrency</p>
                        <p >Amazing software!</p>
                        <p >Blockchain technology</p>
                    </div>
                </div>
                {clicked && bankAccount}
                <div className={styles['btn-ctn']}>
                    <button onClick={() => {
                        setClicked(click => !click)

                    }}
                        className={styles['btn']}
                    >
                        {clicked
                            ? 'Hide'
                            : 'I want to donate'}
                    </button>
                </div>
            </div>
        </section>
    );
}
