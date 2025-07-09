import { Box } from "ink";
import SelectInput from "ink-select-input";
import React, { useState } from "react";
import { ActiveQueryProps } from "../interfaces/props.js";
import { ActivePanel, Mode } from "../interfaces/types.js";
import SyntaxHighlight from 'ink-syntax-highlight';
import { getQueryMenuItems } from "./utils.js";
import { useTabKey, useSaveFile, useSelectHandler } from "../hooks/index.js";
import { MultiLineInput, ContentPanel, MenuPanel } from '../components/index.js';
import path from 'path';
import { QUERIES_DIR } from '../constants.js';

export const ActiveQuery = ({ fileName, content, onExecute, onGoBack, addMessage }: ActiveQueryProps) => {
    const [query, setQuery] = useState(content);
    const [activePanel, setActivePanel] = useState<ActivePanel>('menu');
    const [mode, setMode] = useState<Mode>('view');
    const { saveFile } = useSaveFile(addMessage, () => setMode('view'));

    useTabKey(() => {
        setActivePanel((prev: ActivePanel) => (prev === 'query' ? 'menu' : 'query'));
    }, mode === 'edit');

    const handleSave = () => {
        const filePath = path.join(process.cwd(), QUERIES_DIR, fileName);
        saveFile(filePath, query);
    };

    const handleSelect = useSelectHandler({
        mode,
        setMode,
        setActivePanel,
        handleSave,
        onGoBack,
        onExecute: () => onExecute(query),
    });

    return (
        <Box flexDirection="column">
            <ContentPanel mode={mode} activePanel={activePanel}>
                {mode === 'view' ? (
                    <SyntaxHighlight code={query} language="sql" />
                ) : (
                    <MultiLineInput
                        value={query}
                        onChange={setQuery}
                        focus={activePanel === 'query'}
                    />
                )}
            </ContentPanel>
            <MenuPanel activePanel={activePanel}>
                <SelectInput
                    items={getQueryMenuItems(mode)}
                    onSelect={handleSelect}
                    isFocused={activePanel === 'menu'}
                />
            </MenuPanel>
        </Box>
    );
};
