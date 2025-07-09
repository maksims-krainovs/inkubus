import fs from 'fs';
import { useCallback } from 'react';

export const useSaveFile = (
    addMessage: (message: string, type?: 'info' | 'error') => void,
    onSave?: () => void
) => {
    const saveFile = useCallback((filePath: string, content: string) => {
        try {
            fs.writeFileSync(filePath, content);
            addMessage(`File saved successfully: ${filePath}`, 'info');
            if (onSave) {
                onSave();
            }
            return true;
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            addMessage(`Error saving file: ${filePath}. ${errorMessage}`, 'error');
            return false;
        }
    }, [addMessage, onSave]);

    return { saveFile };
};
