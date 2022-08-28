/* Replace with your SQL commands */
CREATE TABLE
    orders(
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL,
        status INTEGER NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        completed_at TIMESTAMP DEFAULT NULL,
        CONSTRAINT fk_order_owner FOREIGN KEY(user_id) REFERENCES users
    );