import { Box } from "ink";
import SelectInput from "ink-select-input";
import React, { useState } from "react";
import { ActiveQueryProps } from "../interfaces/props.js";
import { ActivePanel, Mode } from "../interfaces/types.js";
import TextInput from "ink-text-input";
import SyntaxHighlight from 'ink-syntax-highlight';
import { getQueryMenuItems } from "./utils.js";
import { useTabKey } from "../hooks/useTabKey.js";

export const ActiveQuery = ({ content, onExecute, onGoBack }: ActiveQueryProps) => {
    const [query, setQuery] = useState(content);
    const [activePanel, setActivePanel] = useState<ActivePanel>('menu');
    const [mode, setMode] = useState<Mode>('view');

    useTabKey(() => {
        setActivePanel((prev: ActivePanel) => (prev === 'query' ? 'menu' : 'query'));
    }, mode === 'edit');

    const handleSelect = (item: { label: string, value: string }) => {
        if (item.value === 'toggleMode') {
            const newMode = mode === 'view' ? 'edit' : 'view';
            setMode(newMode);
            setActivePanel(newMode === 'edit' ? 'query' : 'menu');
        } else if (item.value === 'execute') {
            onExecute(query);
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
                {mode === 'view' ? (
                    <SyntaxHighlight code={query} language="sql" />
                ) : (
                    <TextInput
                        value={query}
                        onChange={setQuery}
                        focus={activePanel === 'query'}
                    />
                )}
            </Box>
            <Box
                borderStyle={activePanel === 'menu' ? 'double' : 'single'}
                borderColor={activePanel === 'menu' ? 'green' : 'blue'}
                padding={1}
            >
                <SelectInput
                    items={getQueryMenuItems(mode)}
                    onSelect={handleSelect}
                    isFocused={activePanel === 'menu'}
                />
            </Box>
        </Box>
    );
};
