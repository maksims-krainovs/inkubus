import { Box } from "ink";
import SelectInput from "ink-select-input";
import React, { useState } from "react";
import { ActiveEnvProps } from "../interfaces/props.js";
import { ActivePanel, Mode } from "../interfaces/types.js";
import TextInput from "ink-text-input";
import { useTabKey } from "../hooks/useTabKey.js";
import { getEnvMenuItems } from "./utils.js";
import path from "path";
import { CONFIG_DIR, ENV_FILE_EXTENSION } from "../constants.js";
import { useSaveFile } from "../hooks/useSaveFile.js";

export const ActiveEnv = ({ fileName, content, onConfirm, onGoBack, addMessage }: ActiveEnvProps) => {
    const [envContent, setEnvContent] = useState(content);
    const [activePanel, setActivePanel] = useState<ActivePanel>('menu');
    const [mode, setMode] = useState<Mode>('view');
    const { saveFile } = useSaveFile(addMessage);

    useTabKey(() => {
        setActivePanel((prev: ActivePanel) => (prev === 'query' ? 'menu' : 'query'));
    }, mode === 'edit');

    const handleSave = () => {
        const filePath = path.join(process.cwd(), CONFIG_DIR, `${fileName}${ENV_FILE_EXTENSION}`);
        if (saveFile(filePath, envContent)) {
            setMode('view');
        }
    };

    const handleSelect = (item: { label: string, value: string }) => {
        if (item.value === 'toggleMode') {
            const newMode = mode === 'view' ? 'edit' : 'view';
            setMode(newMode);
            setActivePanel(newMode === 'edit' ? 'query' : 'menu');
        } else if (item.value === 'save') {
            handleSave();
        } else if (item.value === 'confirm') {
            onConfirm(envContent);
        } else if (item.value === 'back') {
            onGoBack();
        }
    };

    return (
        <Box flexDirection="column">
            <Box
                borderStyle={mode === 'edit' && activePanel === 'query' ? 'double' : 'single'}
                borderColor={mode === 'view' ? 'gray' : (activePanel === 'query' ? 'green' : 'blue')}
                flexDirection="column"
                padding={1}
            >
                <TextInput
                    value={envContent}
                    onChange={setEnvContent}
                    focus={activePanel === 'query'}
                />
            </Box>
            <Box
                borderStyle={activePanel === 'menu' ? 'double' : 'single'}
                borderColor={activePanel === 'menu' ? 'green' : 'blue'}
                padding={1}
            >
                <SelectInput
                    items={getEnvMenuItems(mode)}
                    onSelect={handleSelect}
                    isFocused={activePanel === 'menu'}
                />
            </Box>
        </Box>
    );
};
