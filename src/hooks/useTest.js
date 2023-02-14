import { useState } from 'react';

const useTest = (validation) => {
    const [isLoading, setIsLoading] = useState('test');

    console.log('test hooks rendered');
    const onChange = (e) => {
        setIsLoading(true);
    }

    return {
        isLoading,
        onChange
    }
}

export default useTest;