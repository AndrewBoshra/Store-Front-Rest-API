import { Pool, QueryResult } from "pg";

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
