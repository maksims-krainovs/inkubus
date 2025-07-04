import { EnvChoice } from "./types.js";

export interface EnvSelectionProps {
    envNames: EnvChoice[] | null;
    addMessage: (message: string, type?: 'info' | 'error') => void;
    onSelect: (parsedEnv: Record<string, string>) => void;
}

export interface QuerySelectionProps {
    queryFiles: EnvChoice[] | null;
    parsedEnv: Record<string, string>;
    addMessage: (message: string, type?: 'info' | 'error') => void;
    onSelect: (query: string, content: string) => void;
    onGoBack?: () => void;
}

export interface QueryResultProps {
    content: string;
    onExecute: (query: string) => void;
    onGoBack: () => void;
}