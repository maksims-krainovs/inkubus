import React, { useState, useEffect } from 'react';
import SelectInput from 'ink-select-input';
import { validateFile } from '../utils/validate.js';
import { getEnvMenuItems } from '../EnvViews/utils.js';
import { Mode } from '../interfaces/types.js';

interface EnvMenuProps {
    mode: Mode;
    content: string;
    onSelect: (item: { label: string; value: string }) => void;
    isFocused: boolean;
}

export const EnvMenu = ({
    mode,
    content,
    onSelect,
    isFocused,
}: EnvMenuProps) => {
    const [isValid, setIsValid] = useState(() => validateFile(content).isValid);

    useEffect(() => {
        setIsValid(validateFile(content).isValid);
    }, [content]);

    const items = getEnvMenuItems(mode, isValid);

    return (
        <SelectInput
            items={items}
            onSelect={onSelect}
            isFocused={isFocused}
        />
    );
};
