import { Box, Text } from "ink";
import SelectInput from "ink-select-input";
import React, { useEffect } from "react";
import { Environment } from "./Environment.js";
import { parseEnvFile } from "./utils/parsing.js";
import { EnvSelectionProps } from "./interfaces/props.js";
import { useHighlight } from "./hooks/useHighlight.js";
import { CONFIG_DIR } from "./constants.js";

export const EnvSelection = ({ envNames, addMessage, onSelect }: EnvSelectionProps) => {
    const { fileContent, validationResult, handleHighlight } = useHighlight(addMessage);

    useEffect(() => {
        if (envNames && envNames.length > 0 && envNames[0]) {
            handleHighlight(envNames[0]);
        } else if (envNames && envNames.length === 0) {
            addMessage(`No .env files found in ${CONFIG_DIR}`);
        }
    }, [envNames, handleHighlight, addMessage]);

    const handleSelect = () => {
        if (validationResult.isValid) {
            const parsed = parseEnvFile(fileContent);
            onSelect(parsed);
        }
    };

    return (
        <Box flexDirection="column" width="100%">
            <Box borderStyle="single" flexDirection="column">
                <Environment content={fileContent} />
            </Box>
            <Box borderStyle="single" flexDirection="column">
                {envNames === null ? (
                    <Text>Loading...</Text>
                ) : (
                    <SelectInput items={envNames} onSelect={handleSelect} onHighlight={handleHighlight} />
                )}
            </Box>
        </Box>
    );
};
