import { useEffect, useState } from "react";

let modelOptions = {};

const useModelOptions = (name, inputValue) => {
    const [value, setValue] = useState(0);

    modelOptions[name] = value;

    useEffect(() => {
        setValue(inputValue);
    }, [inputValue]);

    return {value, setValue};
}

export default useModelOptions;