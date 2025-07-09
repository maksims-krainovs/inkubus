import sqlite3 from 'sqlite3';
import { DbClient } from '../DbClient.js';

export class SqliteClient implements DbClient {
    private db: sqlite3.Database;

    constructor(config: Record<string, string>) {
        this.db = new sqlite3.Database(config['DB_PATH'] || ':memory:');
    }

    async executeQuery(query: string): Promise<any[] | { error: string }> {
        return new Promise((resolve) => {
            this.db.all(query, [], (err, rows) => {
                if (err) {
                    resolve({ error: err.message });
                } else {
                    resolve(rows);
                }
            });
        });
    }
}
