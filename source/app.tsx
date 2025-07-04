import React, { useState, useCallback } from 'react';
import {Box} from 'ink';
import Messages from './Messages.js';
import MainWindow from './MainWindow.js';
import { useGetEnvs } from './hooks/useGetEnvs.js';
import { useGetQueries } from './hooks/useGetQueries.js';

import { Message } from './interfaces/types.js';

export default function App() {
	const [messages, setMessages] = useState<Message[]>([]);
	const addMessage = useCallback((text: string, type: 'info' | 'error' = 'error') => {
		setMessages(messages => [...messages, { text, type }].slice(-3));
	}, []);
	const { envNames } = useGetEnvs(addMessage);
	const { queryFiles } = useGetQueries(addMessage);

	return (
		<Box flexDirection='column'>
			<MainWindow envNames={envNames} queryFiles={queryFiles} addMessage={addMessage} />
			<Messages messages={messages} />
		</Box>
	);
}
