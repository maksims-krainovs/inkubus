import { Box } from "ink";
import React, { useState } from "react";
import { ActiveEnvProps } from "../interfaces/props.js";
import { ActivePanel, Mode } from "../interfaces/types.js";
import path from "path";
import { CONFIG_DIR, ENV_FILE_EXTENSION } from "../constants.js";
import { useSaveFile, useSelectHandler, useTabKey } from "../hooks/index.js";
import { MultiLineInput, ContentPanel, MenuPanel, EnvMenu } from '../components/index.js';

export const ActiveEnv = ({ fileName, content, onConfirm, onGoBack, addMessage }: ActiveEnvProps) => {
    const [envContent, setEnvContent] = useState(content);
    const [activePanel, setActivePanel] = useState<ActivePanel>('menu');
    const [mode, setMode] = useState<Mode>('view');
    const { saveFile } = useSaveFile(addMessage, () => setMode('view'));

    useTabKey(() => {
        setActivePanel((prev: ActivePanel) => (prev === 'query' ? 'menu' : 'query'));
    }, mode === 'edit');

    const handleSave = () => {
        const filePath = path.join(process.cwd(), CONFIG_DIR, `${fileName}${ENV_FILE_EXTENSION}`);
        saveFile(filePath, envContent);
    };

    const handleSelect = useSelectHandler({
        mode,
        setMode,
        setActivePanel,
        handleSave,
        onGoBack,
        onConfirm: () => onConfirm(envContent),
    });

    return (
        <Box flexDirection="column">
            <ContentPanel mode={mode} activePanel={activePanel}>
                <MultiLineInput
                    value={envContent}
                    onChange={setEnvContent}
                    focus={activePanel === 'query'}
                />
            </ContentPanel>
            <MenuPanel activePanel={activePanel}>
                <EnvMenu
                    mode={mode}
                    content={envContent}
                    onSelect={handleSelect}
                    isFocused={activePanel === 'menu'}
                />
            </MenuPanel>
        </Box>
    );
};
