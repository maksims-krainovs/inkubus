import { GO_BACK_LABEL } from '../constants.js';
import { Mode } from '../interfaces/types.js';

export const getQueryMenuItems = (mode: Mode) => [
    { label: mode === 'view' ? 'Edit' : 'View', value: 'toggleMode' },
    { label: 'Execute', value: 'execute' },
    { label: GO_BACK_LABEL, value: 'back' }
];