import { useInput } from 'ink';

export const useTabKey = (callback: () => void, isActive: boolean = true) => {
    useInput((_input, key) => {
        if (isActive && key.tab) {
            callback();
        }
    });
};
