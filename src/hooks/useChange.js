import { useState } from 'react';

const useChange = (change) => {
    const [value, setValue] = useState(change);

    const onChange = (e) => {
        setValue(e.target.value);
    }



    return {
        value,
        setValue,
        onChange,
    }
}

export default useChange;