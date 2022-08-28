/* Replace with your SQL commands */
CREATE TABLE
    users(
        id SERIAL PRIMARY KEY,
        first_name VARCHAR(30) NOT NULL,
        last_name VARCHAR(30) NOT NULL,
        email VARCHAR(30) NOT NULL UNIQUE,
        password_hash VARCHAR(1024) NOT NULL
    );