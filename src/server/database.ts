import { Pool, PoolClient, QueryResult } from "pg";
import config from "../config";
const pool = new Pool({
    database: config.dbName,
    user: config.dbUser,
    password: config.dbPassword,
    host: config.dbHost,
    log: config.environment === "development" ? console.log : undefined,
});
export const openConnectionAndQuery = async (
    pool: Pool,
    sql: string,
    args: unknown[] | undefined = undefined
): Promise<QueryResult> => {
    const client = await pool.connect();
    const res = await client.query(sql, args);
    await client.release();
    return res;
};
export const transaction = async <T>(
    pool: Pool,
    cb: (client: PoolClient) => Promise<T> | T
) => {
    const client = await pool.connect();
    try {
        await client.query("BEGIN");
        const res = await cb(client);
        await client.query("COMMIT");
        return res;
    } catch (e) {
        await client.query("ROLLBACK");
        throw e;
    } finally {
        client.release();
    }
};

export default pool;
