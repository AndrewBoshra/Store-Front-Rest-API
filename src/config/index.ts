import dotenv from "dotenv";

dotenv.config();
const environment = process.env.NODE_ENV || "development";
const isTesting = environment === "test";
console.log(`Environment ${environment}`);
console.log(`isTesting ${isTesting}`);
export default {
    port: parseInt(process.env.PORT || "3000"),
    dbUser: isTesting ? process.env.TEST_PG_USER : process.env.PG_USER,
    dbName: isTesting ? process.env.TEST_PG_DB_NAME : process.env.PG_DB_NAME,
    dbPassword: isTesting
        ? process.env.TEST_PG_PASSWORD
        : process.env.PG_PASSWORD,
    dbPort: isTesting ? process.env.TEST_PG_PORT : process.env.PG_PORT,
    dbHost: isTesting ? process.env.TEST_PG_PORT : process.env.PG_HOST,
    jwtSecret: process.env.JWT_SECRET,
    environment,
};
