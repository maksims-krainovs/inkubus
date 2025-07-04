import { useState, useEffect } from "react";
import fs from "fs";
import path from "path";
import { EnvChoice } from "../interfaces/types.js";

const QUERIES_DIR = 'queries';

export const useGetQueries = (addMessage: (message: string, type?: 'info' | 'error') => void) => {
    const [queryFiles, setQueryFiles] = useState<EnvChoice[] | null>(null);

    useEffect(() => {
        const queriesDir = path.join(process.cwd(), QUERIES_DIR);
        try {
            const files = fs.readdirSync(queriesDir);
            const foundQueries = files.map(file => ({
                label: file,
                value: file
            }));
            setQueryFiles(foundQueries);
        } catch (error) {
            addMessage(`Error reading directory: ${queriesDir}`);
            setQueryFiles([]);
        }
    }, [addMessage]);

    return { queryFiles };
}
