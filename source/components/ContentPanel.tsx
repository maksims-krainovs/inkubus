import React, { PropsWithChildren } from 'react';
import { Box } from 'ink';
import { ActivePanel, Mode } from '../interfaces/types.js';

interface ContentPanelProps {
    mode: Mode;
    activePanel: ActivePanel;
}

export const ContentPanel = ({ mode, activePanel, children }: PropsWithChildren<ContentPanelProps>) => {
    return (
        <Box
            borderStyle={mode === 'edit' && activePanel === 'query' ? 'double' : 'single'}
            borderColor={mode === 'view' ? 'gray' : (activePanel === 'query' ? 'green' : 'blue')}
            flexDirection="column"
            padding={1}
        >
            {children}
        </Box>
    );
};
