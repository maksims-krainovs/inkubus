export const parseEnvFile = (fileContent: string): Record<string, string> => {
    return fileContent.split('\n').reduce((acc, line) => {
        if (line.trim() !== '') {
            const [key, ...value] = line.split('=');
            if (key) {
                acc[key.trim()] = value.join('=').trim();
            }
        }
        return acc;
    }, {} as Record<string, string>);
};
