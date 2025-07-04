import { useState, useCallback } from 'react';
import fs from 'fs';
import path from 'path';
import { EnvChoice } from '../interfaces/types.js';
import { CONFIG_DIR, ENV_FILE_EXTENSION } from '../constants.js';
import { validateFile } from '../utils/validate.js';

export const useHighlight = (addMessage: (message: string, type?: 'info' | 'error') => void) => {
    const [fileContent, setFileContent] = useState('');
    const [validationResult, setValidationResult] = useState<{ isValid: boolean; missingKeys: string[] }>({ isValid: true, missingKeys: [] });

    const handleHighlight = useCallback((item: EnvChoice) => {
        const filePath = path.join(process.cwd(), CONFIG_DIR, `${item.value}${ENV_FILE_EXTENSION}`);
        try {
            const content = fs.readFileSync(filePath, 'utf-8');
            setFileContent(content);
            const result = validateFile(content);
            setValidationResult(result);
            if (!result.isValid) {
                if (result.missingKeys.length > 0) {
                    addMessage(`Missing keys in ${item.value}${ENV_FILE_EXTENSION}: ${result.missingKeys.join(', ')}`, 'error');
                } else {
                    addMessage(`Invalid format in ${item.value}${ENV_FILE_EXTENSION}`, 'error');
                }
            } else {
                addMessage(`${item.value}${ENV_FILE_EXTENSION} is valid`, 'info');
            }
        } catch (error) {
            addMessage(`Error reading file: ${filePath}`, 'error');
            setFileContent('');
            setValidationResult({ isValid: false, missingKeys: [] });
        }
    }, [addMessage]);

    return { fileContent, validationResult, handleHighlight };
};
