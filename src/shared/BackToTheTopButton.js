import React, { useEffect } from 'react'
import { useState } from 'react';

// When the user scrolls down 200px from the top of the document, show the button

export const BackToTheTopButton = (props) => {
    const [showGoTop, setShowGoTop] = useState(false);

    const handleVisibleButton = () => {
        setShowGoTop(window.scrollY > 200);
    }

    const handleScrollUp = () => {
        window.scrollTo({ left: 0, top: 0, behavior: 'smooth' })
    }

    useEffect(() => {
        window.addEventListener('scroll', handleVisibleButton);
        
        return () => {
            window.removeEventListener('scroll',handleVisibleButton);
        }
    }, []);

    return (
        <>
            <button id="to-top-button" onClick={handleScrollUp} title="Go To Top"
                className={showGoTop ? "block fixed z-90 bottom-8 right-8 border-0 w-16 h-16 rounded-full drop-shadow-md bg-indigo-500 text-white text-3xl font-bold" : ""}>&uarr;</button>
        </>

    )
}
