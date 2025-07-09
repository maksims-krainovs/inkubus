import { MssqlClient } from './clients/MssqlClient.js';
import { SqliteClient } from './clients/SqliteClient.js';
import { DbClient } from './DbClient.js';

const createDbClient = (config: Record<string, string>): DbClient => {
    const dbType = config['DB_TYPE'];
    if (dbType === 'sqlite') {
        return new SqliteClient(config);
    }
    return new MssqlClient(config);
};

export const executeQuery = async (config: Record<string, string>, query: string) => {
    const client = createDbClient(config);
    return client.executeQuery(query);
};
