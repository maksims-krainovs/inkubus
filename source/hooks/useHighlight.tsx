import { useState, useCallback } from 'react';
import fs from 'fs';
import path from 'path';
import { EnvChoice } from '../interfaces/types.js';
import { CONFIG_DIR, ENV_FILE_EXTENSION } from '../constants.js';
import { validateFile } from '../utils/validate.js';

export const useHighlight = (
    addMessage: (message: string, type?: 'info' | 'error') => void,
    baseDir: string = CONFIG_DIR,
    extension: string = ENV_FILE_EXTENSION
) => {
    const [fileContent, setFileContent] = useState('');
    const [validationResult, setValidationResult] = useState<{ isValid: boolean; missingKeys: string[] }>({ isValid: true, missingKeys: [] });

    const [highlightedItem, setHighlightedItem] = useState<EnvChoice | null>(null);

    const handleHighlight = useCallback((item: EnvChoice) => {
        setHighlightedItem(item);
        const filePath = path.join(process.cwd(), baseDir, `${item.value}${extension}`);
        try {
            const content = fs.readFileSync(filePath, 'utf-8');
            setFileContent(content);
            if (extension === ENV_FILE_EXTENSION) {
                const result = validateFile(content);
                setValidationResult(result);
                if (!result.isValid) {
                    if (result.missingKeys.length > 0) {
                        addMessage(`Missing keys in ${item.value}${extension}: ${result.missingKeys.join(', ')}`, 'error');
                    } else {
                        addMessage(`Invalid format in ${item.value}${extension}`, 'error');
                    }
                } else {
                    addMessage(`${item.value}${extension} is valid`, 'info');
                }
            }
        } catch (error) {
            addMessage(`Error reading file: ${filePath}`, 'error');
            setFileContent('');
            setValidationResult({ isValid: false, missingKeys: [] });
        }
    }, [addMessage, baseDir, extension]);

    return { fileContent, validationResult, handleHighlight, highlightedItem };
};
