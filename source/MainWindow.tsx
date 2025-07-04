import React, { useState } from "react";
import { Text } from "ink";
import { EnvSelection } from "./EnvSelection.js";
import { QuerySelection } from "./QuerySelection.js";
import { QueryResult } from "./QueryResult.js";
import { DbResult } from "./DbResult.js";
import { EnvChoice, ViewMode } from "./interfaces/types.js";
import { executeQuery } from "./db/index.js";

const MainWindow = ({ envNames, queryFiles, addMessage }: { envNames: EnvChoice[] | null, queryFiles: EnvChoice[] | null, addMessage: (message: string, type?: 'info' | 'error') => void }) => {
    const [viewMode, setViewMode] = useState<ViewMode>('select');
    const [parsedEnv, setParsedEnv] = useState<Record<string, string>>({});
    const [queryContent, setQueryContent] = useState('');
    const [dbResult, setDbResult] = useState<any[] | { error: string } | null>(null);

    const handleEnvSelect = (parsed: Record<string, string>) => {
        setParsedEnv(parsed);
        setViewMode('panels');
    };

    const handleQuerySelect = (_query: string, content: string) => {
        setQueryContent(content);
        setViewMode('result');
    };

    const handleGoBack = () => {
        setViewMode('panels');
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

    if (viewMode === 'loading') {
        return <Text>Executing query...</Text>;
    }

    if (viewMode === 'db_result' && dbResult) {
        return <DbResult result={dbResult} onGoBack={() => setViewMode('panels')} />;
    }

    if (viewMode === 'result') {
        return <QueryResult content={queryContent} onExecute={handleExecute} onGoBack={handleGoBack} />;
    }

    const handleGoFromQuery = () => {
        setViewMode('select');
    };

    if (viewMode === 'panels') {
        return <QuerySelection queryFiles={queryFiles} parsedEnv={parsedEnv} addMessage={addMessage} onSelect={handleQuerySelect} onGoBack={handleGoFromQuery} />;
    }

    return <EnvSelection envNames={envNames} addMessage={addMessage} onSelect={handleEnvSelect} />;
}

export default MainWindow;

