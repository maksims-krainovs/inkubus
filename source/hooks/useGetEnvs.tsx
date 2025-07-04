import { useState, useEffect } from "react";
import fs from "fs";
import path from "path";
import { EnvChoice } from "../interfaces/types.js";
import { CONFIG_DIR, ENV_FILE_EXTENSION } from "../constants.js";

export const useGetEnvs = (addMessage: (message: string, type?: 'info' | 'error') => void) => {
    const [envNames, setEnvNames] = useState<EnvChoice[] | null>(null);

    useEffect(() => {
        const configDir = path.join(process.cwd(), CONFIG_DIR);
        try {
            const files = fs.readdirSync(configDir);
            const foundEnvs = files
                .filter(file => file.endsWith(ENV_FILE_EXTENSION))
                .map(file => ({
                    label: path.basename(file, ENV_FILE_EXTENSION),
                    value: path.basename(file, ENV_FILE_EXTENSION)
                }));
            setEnvNames(foundEnvs);
        } catch (error) {
            addMessage(`Error reading directory: ${path.join(process.cwd(), CONFIG_DIR)}`);
            setEnvNames([]);
        }
    }, [addMessage]);

    return { envNames };
}

