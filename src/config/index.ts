import dotenv from "dotenv";

const envFileConfig = dotenv.config();

if (envFileConfig.error) {
    throw new Error("Couldn't find .env file");
}

export default {
    port: parseInt(process.env.PORT || "3000"),
    dbUser: process.env.PG_USER,
    dbName: process.env.PG_DB_NAME,
    dbPassword: process.env.PG_PASSWORD,
    dbPort: process.env.PG_PORT,
    dbHost: process.env.PG_HOST,
    jwtSecret: process.env.JWT_SECRET,
    environment: process.env.NODE_ENV || "development",
};
