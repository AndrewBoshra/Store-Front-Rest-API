import { Pool } from "pg";
import { User } from "../models/index";

export class UsersRepository {
    constructor(private readonly pool: Pool) {}
    async add(user: User): Promise<User> {
        const client = await this.pool.connect();
        const sql = `INSERT INTO users(first_name,last_name,email,password_hash)
                     VALUES($1,$2,$3,$4)
                     RETURNING id;`;
        const data = (
            await client.query(sql, [
                user.first_name,
                user.last_name,
                user.email,
                user.password_hash,
            ])
        ).rows[0];
        user.id = data.id;
        await client.release();
        return user;
    }
    async get(id: number): Promise<User | undefined> {
        throw new Error("Method not implemented.");
    }
    async getAll(): Promise<User[]> {
        throw new Error("Method not implemented.");
    }
    async getUserByEmail(email: string): Promise<User | undefined> {
        const sql = `SELECT * 
                     FROM users
                     WHERE email = $1 ;`;
        console.log(email);
        console.log(sql);
        const client = await this.pool.connect();
        const rows = await (await client.query(sql, [email])).rows;
        await client.release();
        if (rows.length == 0) return undefined;
        return new User(rows[0]);
    }
}
