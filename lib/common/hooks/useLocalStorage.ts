import { useCallback, useState } from 'react';
import useEffectOnMount from '@/lib/common/hooks/useEffectOnMount';

const useLocalStorage = <T>(key: string, defaultValue: T): [T, (value: T) => void] => {

    const [currentValue, setCurrentValue] = useState<T>(defaultValue);

    useEffectOnMount(() => {
        const valueFromStorage = window.localStorage.getItem(key);

        if (valueFromStorage !== null) {
            setCurrentValue(JSON.parse(valueFromStorage) as T);
        }
    });

    const setValue = useCallback((newValue: T) => {
        setCurrentValue(newValue);
        window.localStorage.setItem(key, JSON.stringify(newValue));
    }, [key]);

    return [currentValue, setValue];
};

export default useLocalStorage;
