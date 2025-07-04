import { GO_BACK_LABEL } from "./constants.js";
import { Box, useInput } from "ink";
import SelectInput from "ink-select-input";
import React, { useState } from "react";
import { QueryResultProps } from "./interfaces/props.js";
import { ActivePanel } from "./interfaces/types.js";
import TextInput from "ink-text-input";

export const QueryResult = ({ content, onExecute, onGoBack }: QueryResultProps) => {
    const [query, setQuery] = useState(content);
    const [activePanel, setActivePanel] = useState<ActivePanel>('query');

    useInput((_input, key) => {
        if (key.tab) {
            setActivePanel(prev => (prev === 'query' ? 'menu' : 'query'));
        }
    });

    const items = [
        { label: 'Execute', value: 'execute' },
        { label: GO_BACK_LABEL, value: 'back' }
    ];

    const handleSelect = (item: { label: string, value: string }) => {
        if (item.value === 'execute') {
            onExecute(query);
        } else if (item.value === 'back') {
            onGoBack();
        }
    };

    return (
        <Box flexDirection="column">
            <Box
                borderStyle="single"
                borderColor={activePanel === 'query' ? 'green' : 'gray'}
                flexDirection="column"
                padding={1}
            >
                <TextInput
                    value={query}
                    onChange={setQuery}
                    focus={activePanel === 'query'}
                />
            </Box>
            <Box
                borderStyle="single"
                borderColor={activePanel === 'menu' ? 'green' : 'gray'}
                padding={1}
            >
                <SelectInput
                    items={items}
                    onSelect={handleSelect}
                    isFocused={activePanel === 'menu'}
                />
            </Box>
        </Box>
    );
};
