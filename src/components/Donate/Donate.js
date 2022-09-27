import React, { useState } from 'react'

export const Donate = () => {
    const [clicked,setClicked] = useState(false);

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
        <>
            <div className="h-screen w-full flex flex-col justify-center items-center">
                <div className="max-w-lg bg-white shadow-md rounded-lg overflow-hidden mx-auto">
                    <div className="py-4 px-8 mt-3">
                        <div className="flex flex-col mb-8">
                            <h2 className="text-gray-700 font-semibold text-2xl tracking-wide mb-2">
                                Why you should donate?
                            </h2>
                            <p className="text-gray-500 text-base">
                                With your donation we can reach great lenghts! We can achieve
                                amazing things. We're a small team.
                            </p>
                        </div>
                        <div className="bg-gray-200 rounded-lg">
                            <div className="py-4 px-4">
                                <div className="flex flex-col">
                                    <h4 className="text-lg font-semibold mb-3">
                                        We're currently working on
                                    </h4>
                                    <div className="flex flex-col text-sm text-gray-600">
                                        <span className="mb-1">The next cryptocurrency</span>
                                        <span className="mb-1">Amazing software!</span>
                                        <span className="mb-1">Blockchain technology</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {clicked && bankAccount}
                        <div className="py-4">
                            <button onClick={() => {
                                setClicked(click => !click)
                                
                            }}
                                className="block w-full tracking-widest uppercase text-center shadow bg-indigo-600 hover:bg-indigo-700 focus:shadow-outline focus:outline-none text-white text-xs py-3 px-10 rounded"
                            >
                                {clicked 
                                ? 'Hide'
                                : 'I want to donate' }
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}
