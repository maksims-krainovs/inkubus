import { EnvChoice } from "./types.js";

export interface EnvSelectionProps {
    envNames: EnvChoice[] | null;
    addMessage: (message: string, type?: 'info' | 'error') => void;
    onSelect: (fileName: string, envContent: string) => void;
}

export interface QuerySelectionProps {
    queryFiles: EnvChoice[] | null;
    envContent: string;
    addMessage: (message: string, type?: 'info' | 'error') => void;
    onSelect: (query: string, content: string) => void;
    onGoBack?: () => void;
}

export interface ActiveQueryProps {
    content: string;
    onExecute: (query: string) => void;
    onGoBack: () => void;
}

export interface ActiveEnvProps {
    fileName: string;
    content: string;
    onConfirm: (envContent: string) => void;
    onGoBack: () => void;
    addMessage: (message: string, type?: 'info' | 'error') => void;
}