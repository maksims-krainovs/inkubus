import React from 'react';
import { useInput } from 'ink';
import TextInput from 'ink-text-input';

interface Props {
    value: string;
    onChange: (value: string) => void;
    focus: boolean;
}

export const MultiLineInput = ({ value, onChange, focus }: Props) => {
    useInput((_input, key) => {
        if (key.return) {
            onChange(value + '\n');
        }
    }, { isActive: focus });

    return <TextInput value={value} onChange={onChange} focus={focus} />;
};
