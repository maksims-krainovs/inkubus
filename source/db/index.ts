import sql from 'mssql';

export const executeQuery = async (config: Record<string, string>, query: string) => {
    const sqlConfig: sql.config = {
        user: config['DB_USER'],
        password: config['DB_PASSWORD'],
        server: config['DB_SERVER'] || 'localhost',
        database: config['DB_DATABASE'],
        port: Number(config['DB_PORT']) || 1433,
        options: {
            encrypt: true, // Use this if you're on Azure
            trustServerCertificate: true // Change to true for local dev / self-signed certs
        }
    };

    const pool = new sql.ConnectionPool(sqlConfig);
    const poolConnect = pool.connect();

    try {
        await poolConnect;
        const result = await pool.request().query(query);
        return result.recordset;
    } catch (err) {
        if (err instanceof Error) {
            return { error: err.message };
        }
        return { error: 'An unknown error occurred' };
    } finally {
        await pool.close();
    }
};
