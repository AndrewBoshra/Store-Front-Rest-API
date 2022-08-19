import { Pool } from "pg";
import config from "../config";
const pool = new Pool({
    database: config.dbName,
    user: config.dbUser,
    password: config.dbPassword,
    host: config.dbHost,
    log: console.log,
});

export default pool;
