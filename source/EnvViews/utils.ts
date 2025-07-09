import { GO_BACK_LABEL } from '../constants.js';
import { Mode } from '../interfaces/types.js';

export const getEnvMenuItems = (mode: Mode, isValid: boolean) => {
    const items = [];
    if (mode === 'edit') {
        items.push({ label: 'Save', value: 'save' });
    } else {
        if (isValid) {
            items.push({ label: 'Confirm', value: 'confirm' });
        }
    }
    items.push({ label: mode === 'view' ? 'Edit' : 'View', value: 'toggleMode' });
    items.push({ label: GO_BACK_LABEL, value: 'back' });
    return items;
};
