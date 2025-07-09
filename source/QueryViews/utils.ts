import { GO_BACK_LABEL } from '../constants.js';
import { Mode } from '../interfaces/types.js';

export const getQueryMenuItems = (mode: Mode) => {
    const items = [];
    if (mode === 'edit') {
        items.push({ label: 'Save', value: 'save' });
    }
    items.push({ label: 'Execute', value: 'execute' });
    items.push({ label: mode === 'view' ? 'Edit' : 'View', value: 'toggleMode' });
    items.push({ label: GO_BACK_LABEL, value: 'back' });
    return items;
};