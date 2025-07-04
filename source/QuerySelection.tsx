import { Box, Text } from "ink";
import SelectInput from "ink-select-input";
import React from "react";
import fs from "fs";
import path from "path";
import { EnvChoice } from "./interfaces/types.js";
import { QuerySelectionProps } from "./interfaces/props.js";

import { GO_BACK, GO_BACK_LABEL } from "./constants.js";

const QUERIES_DIR = 'queries';

export const QuerySelection = ({ queryFiles, parsedEnv, addMessage, onSelect, onGoBack }: QuerySelectionProps) => {
    const handleSelectQuery = (item: EnvChoice) => {
        if (item.value === GO_BACK) {
            if (onGoBack) {
                onGoBack();
            }
            return;
        }

        const filePath = path.join(process.cwd(), QUERIES_DIR, item.value);
        try {
            const content = fs.readFileSync(filePath, 'utf-8');
            onSelect(item.value, content);
        } catch (error) {
            addMessage(`Error reading file: ${filePath}`, 'error');
        }
    };

    const items = queryFiles ? [...queryFiles, { label: GO_BACK_LABEL, value: GO_BACK }] : [];

    return (
        <Box flexDirection="column" width="100%">
            <Box borderStyle="single" height={10}>
                {queryFiles === null ? (
                    <Text>Loading queries...</Text>
                ) : (
                    <SelectInput items={items} onSelect={handleSelectQuery} />
                )}
            </Box>
            <Box borderStyle="single" flexDirection="column">
                {Object.entries(parsedEnv).map(([key, value]) => (
                    <Text key={key}>{key}: {value}</Text>
                ))}
            </Box>
        </Box>
    );
};
