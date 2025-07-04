export interface EnvChoice {
    label: string;
    value: string;
}

export interface Message {
    text: string;
    type: 'info' | 'error';
}

export type ViewMode = 'select' | 'panels' | 'result' | 'db_result' | 'loading';
export type ActivePanel = 'query' | 'menu';
