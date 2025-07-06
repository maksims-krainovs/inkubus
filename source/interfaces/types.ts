export interface EnvChoice {
    label: string;
    value: string;
}

export interface Message {
    text: string;
    type: 'info' | 'error';
}

export type ViewMode = 'select' | 'panels' | 'result' | 'loading' | 'db_result' | 'active_env';
export type ActivePanel = 'query' | 'menu';
export type Mode = 'view' | 'edit';

export type QueryViewMode = 'view' | 'edit';