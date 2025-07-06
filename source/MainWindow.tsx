import React, { useState } from "react";
import { Text } from "ink";
import { EnvSelection } from "./EnvSelection.js";
import { QuerySelection } from "./QueryViews/QuerySelection.js";
import { ActiveQuery } from "./QueryViews/ActiveQuery.js";
import { ActiveEnv } from "./EnvViews/ActiveEnv.js";
import { DbResult } from "./DbResult.js";
import { EnvChoice, ViewMode } from "./interfaces/types.js";
import { executeQuery } from "./db/index.js";
import { parseEnvFile } from "./utils/parsing.js";

export const MainWindow = ({ envNames, queryFiles, addMessage }: { envNames: EnvChoice[] | null, queryFiles: EnvChoice[] | null, addMessage: (message: string, type?: 'info' | 'error') => void }) => {
    const [viewMode, setViewMode] = useState<ViewMode>('select');
    const [envFileName, setEnvFileName] = useState<string>('');
    const [envContent, setEnvContent] = useState<string>('');
    const [parsedEnv, setParsedEnv] = useState<Record<string, string>>({});
    const [queryContent, setQueryContent] = useState('');
    const [dbResult, setDbResult] = useState<any[] | { error: string } | null>(null);

    const handleEnvSelect = (fileName: string, envContent: string) => {
        setEnvFileName(fileName);
        setEnvContent(envContent);
        setViewMode('active_env');
    };

    const handleEnvConfirm = (envContent: string) => {
        setEnvContent(envContent);
        setParsedEnv(parseEnvFile(envContent));
        setViewMode('panels');
    };

    const handleQuerySelect = (_query: string, content: string) => {
        setQueryContent(content);
        setViewMode('result');
    };

    const handleExecute = async (query: string) => {
        setViewMode('loading');
        const result = await executeQuery(parsedEnv, query);
        if (result && typeof result === 'object' && 'error' in result) {
            addMessage(result.error, 'error');
            setViewMode('result');
        } else {
            setDbResult(result);
            setViewMode('db_result');
        }
    };

    switch(viewMode) {
        case 'loading':  return <Text>Executing query...</Text>;
        case 'db_result':  return <DbResult result={dbResult || { error: 'No result received' }} onGoBack={() => setViewMode('panels')} />;
        case 'result': return <ActiveQuery content={queryContent} onExecute={handleExecute} onGoBack={() => setViewMode('panels')} />;
        case 'active_env': return <ActiveEnv fileName={envFileName} content={envContent} onConfirm={handleEnvConfirm} onGoBack={() => setViewMode('select')} addMessage={addMessage} />;
        case 'panels': return <QuerySelection queryFiles={queryFiles} envContent={envContent} addMessage={addMessage} onSelect={handleQuerySelect} onGoBack={() => setViewMode('select')} />;
    }
    return <EnvSelection envNames={envNames} addMessage={addMessage} onSelect={handleEnvSelect} />;
}

export default MainWindow;

