import { Box, Text, useInput } from "ink";
import React from "react";

interface DbResultProps {
    result: any[] | { error: string };
    onGoBack: () => void;
}

export const DbResult = ({ result, onGoBack }: DbResultProps) => {
    useInput(() => {
        onGoBack();
    });

    if (Array.isArray(result)) {
        return (
            <Box flexDirection="column">
                <Text>Query Result:</Text>
                {result.map((row, i) => (
                    <Text key={i}>{JSON.stringify(row)}</Text>
                ))}
                <Text> </Text>
                <Text>Press any key to go back</Text>
            </Box>
        );
    }

    return (
        <Box flexDirection="column">
            <Text color="red">Error:</Text>
            <Text>{result.error}</Text>
            <Text> </Text>
            <Text>Press any key to go back</Text>
        </Box>
    );
};
