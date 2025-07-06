import { Box, Text } from "ink";
import SelectInput from "ink-select-input";
import React, { useEffect } from "react";
import { Environment } from "../Environment.js";
import { QuerySelectionProps } from "../interfaces/props.js";
import { useHighlight } from "../hooks/useHighlight.js";
import { GO_BACK, GO_BACK_LABEL, QUERIES_DIR } from "../constants.js";
import { EnvChoice } from "../interfaces/types.js";
import path from "path";
import fs from "fs";

export const QuerySelection = ({ queryFiles, envContent, addMessage, onSelect, onGoBack }: QuerySelectionProps) => {
    const { fileContent, handleHighlight: originalHandleHighlight } = useHighlight(addMessage, QUERIES_DIR, '');

    const handleHighlight = (item: EnvChoice) => {
        if (item.value !== GO_BACK) {
            originalHandleHighlight(item);
        }
    };

    useEffect(() => {
        if (queryFiles && queryFiles.length > 0 && queryFiles[0]) {
            handleHighlight(queryFiles[0]);
        }
    }, [queryFiles]);

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
            <Box borderStyle="single" flexDirection="column" borderColor="gray">
                <Environment content={envContent} />
            </Box>
            <Box borderStyle="single" flexDirection="column" borderColor="gray">
                <Environment content={fileContent} />
            </Box>
            <Box borderStyle="double" borderColor="green" height={10}>
                {queryFiles === null ? (
                    <Text>Loading queries...</Text>
                ) : (
                    <SelectInput items={items} onSelect={handleSelectQuery} onHighlight={handleHighlight} />
                )}
            </Box>
        </Box>
    );
};
