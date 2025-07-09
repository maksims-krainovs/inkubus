import { Mode, ActivePanel } from '../interfaces/types.js';

interface SelectHandlerProps {
    mode: Mode;
    setMode: (mode: Mode) => void;
    setActivePanel: (panel: ActivePanel) => void;
    handleSave: () => void;
    onGoBack: () => void;
    onExecute?: () => void;
    onConfirm?: () => void;
}

export const useSelectHandler = ({
    mode,
    setMode,
    setActivePanel,
    handleSave,
    onGoBack,
    onExecute,
    onConfirm,
}: SelectHandlerProps) => {
    const handleSelect = (item: { value: string }) => {
        if (item.value === 'toggleMode') {
            const newMode = mode === 'view' ? 'edit' : 'view';
            setMode(newMode);
            setActivePanel(newMode === 'edit' ? 'query' : 'menu');
        } else if (item.value === 'save') {
            handleSave();
        } else if (item.value === 'execute' && onExecute) {
            onExecute();
        } else if (item.value === 'confirm' && onConfirm) {
            onConfirm();
        } else if (item.value === 'back') {
            onGoBack();
        }
    };

    return handleSelect;
};
