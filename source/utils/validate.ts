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
    const dbType = parsed['DB_TYPE'];

    let requiredKeys: string[] = [];
    if (dbType === 'sqlite') {
        requiredKeys = ['DB_PATH'];
    } else {
        // Default to mssql validation
        requiredKeys = ['DB_USER', 'DB_PASSWORD', 'DB_DATABASE'];
    }

    const missingKeys = requiredKeys.filter(key => !(key in parsed));

    return {
        isValid: missingKeys.length === 0,
        missingKeys,
    };
};
