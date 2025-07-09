export interface DbClient {
    executeQuery(query: string): Promise<any[] | { error: string }>;
}
