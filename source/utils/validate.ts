import { parseEnvFile } from "./parsing.js";

export const validateFile = (content: string): { isValid: boolean, missingKeys: string[] } => {
    const lines = content.split('\n');
    const hasCorrectFormat = lines.every(line => {
        if (line.trim() === '') return true;
        return /^\s*([\w.-]+)\s*=\s*(.*)?\s*$/.test(line);
    });

    if (!hasCorrectFormat) {
        return { isValid: false, missingKeys: [] };
    }

    const parsed = parseEnvFile(content);
    const requiredKeys = ['DB_USER', 'DB_PASSWORD', 'DB_DATABASE'];
    const missingKeys = requiredKeys.filter(key => !(key in parsed));

    return {
        isValid: missingKeys.length === 0,
        missingKeys,
    };
};
