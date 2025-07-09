import sql from 'mssql';
import { DbClient } from '../DbClient.js';

export class MssqlClient implements DbClient {
    private pool: sql.ConnectionPool;

    constructor(config: Record<string, string>) {
        const sqlConfig: sql.config = {
            user: config['DB_USER'],
            password: config['DB_PASSWORD'],
            server: config['DB_SERVER'] || 'localhost',
            database: config['DB_DATABASE'],
            port: Number(config['DB_PORT']) || 1433,
            options: {
                encrypt: true,
                trustServerCertificate: true
            }
        };
        this.pool = new sql.ConnectionPool(sqlConfig);
    }

    async executeQuery(query: string): Promise<any[] | { error: string }> {
        try {
            await this.pool.connect();
            const result = await this.pool.request().query(query);
            return result.recordset;
        } catch (err) {
            if (err instanceof Error) {
                return { error: err.message };
            }
            return { error: 'An unknown error occurred' };
        } finally {
            await this.pool.close();
        }
    }
}
