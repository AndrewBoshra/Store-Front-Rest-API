import { Pool } from "pg";
import { User } from "../models/index";
import { openConnectionAndQuery } from "../shared/database";

export class UsersRepository {
    constructor(private readonly pool: Pool) {}
    async add(user: User): Promise<User> {
        const sql = `INSERT INTO users(first_name,last_name,email,password_hash)
                     VALUES($1,$2,$3,$4)
                     RETURNING id;`;
        const dbRes = await openConnectionAndQuery(this.pool, sql, [
            user.first_name,
            user.last_name,
            user.email,
            user.password_hash,
        ]);
        const data = dbRes.rows[0];
        user.id = data.id;
        return user;
    }
    async get(id: number): Promise<User | undefined> {
        throw new Error("Method not implemented.");
    }
    async getAll(): Promise<User[]> {
        const sql = `SELECT * 
                    FROM users;`;
        const dbRes = await openConnectionAndQuery(this.pool, sql);
        const rows = dbRes.rows;
        return rows.map((r) => new User(r));
    }
    async getUserByEmail(email: string): Promise<User | undefined> {
        const sql = `SELECT * 
                    FROM users
                    WHERE email = $1 ;`;
        const dbRes = await openConnectionAndQuery(this.pool, sql, [email]);
        const rows = dbRes.rows;
        if (rows.length == 0) return undefined;
        return new User(rows[0]);
    }
}
