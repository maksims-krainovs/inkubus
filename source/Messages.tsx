import React, { useState, useEffect } from 'react';
import { Box, Text } from 'ink';
import { Message } from './interfaces/types.js';

export default function Messages({ messages }: { messages: Message[] }) {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setVisible(v => !v);
        }, 500);
        return () => clearInterval(interval);
    }, []);

    return (
        <Box flexDirection="column-reverse">
            {messages.map((message, index) => (
                <Text key={index} color={message.type === 'info' ? 'green' : 'red'}>
                    {index === messages.length - 1 && visible ? `> ${message.text}` : `  ${message.text}`}
                </Text>
            ))}
        </Box>
    );
}
