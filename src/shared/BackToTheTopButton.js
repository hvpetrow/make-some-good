import React, { useEffect } from 'react'
import { useState } from 'react';

// When the user scrolls down 20px from the top of the document, show the button


// export function scrollFunction(setStyleDisplay) {
//    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
//        setStyleDisplay('block');
//    } else {
//        setStyleDisplay('hidden')
//    }
// }

export const BackToTheTopButton = (props) => {
    const [showGoTop, setShowGoTop] = useState(false);

    const handleVisibleButton = () => {
        setShowGoTop(window.pageYOffset > 50)
    }

    const handleScrollUp = () => {
        window.scrollTo({ left: 0, top: 0, behavior: 'smooth' })
    }


    useEffect(() => {
        window.addEventListener('scroll', handleVisibleButton)
    }, []);

    // function backToTop() {
    //     window.scrollTo({ top: 0, behavior: 'smooth' });
    //     // document.body.scrollTop = 0;
    //     // document.documentElement.scrollTop = 0;
    // }

    return (
        <>
            <button id="to-top-button" onClick={handleScrollUp} title="Go To Top"
                className={` fixed z-90 bottom-8 right-8 border-0 w-16 h-16 rounded-full drop-shadow-md bg-indigo-500 text-white text-3xl font-bold`}>&uarr;</button>
        </>

    )
}
{/* <button id="to-top-button" onClick={props.scrollUp} title="Go To Top"
className={`${props.styleDisplay} fixed z-90 bottom-8 right-8 border-0 w-16 h-16 rounded-full drop-shadow-md bg-indigo-500 text-white text-3xl font-bold`}>&uarr;</button> */}