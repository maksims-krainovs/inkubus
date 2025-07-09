import React, { PropsWithChildren } from 'react';
import { Box } from 'ink';
import { ActivePanel } from '../interfaces/types.js';

interface MenuPanelProps {
    activePanel: ActivePanel;
}

export const MenuPanel = ({ activePanel, children }: PropsWithChildren<MenuPanelProps>) => {
    return (
        <Box
            borderStyle={activePanel === 'menu' ? 'double' : 'single'}
            borderColor={activePanel === 'menu' ? 'green' : 'blue'}
            padding={1}
        >
            {children}
        </Box>
    );
};
