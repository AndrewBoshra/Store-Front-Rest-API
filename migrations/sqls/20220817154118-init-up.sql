/* Replace with your SQL commands */

CREATE TABLE
    users(
        id SERIAL PRIMARY KEY,
        first_name VARCHAR(30) NOT NULL,
        last_name VARCHAR(30) NOT NULL,
        email VARCHAR(30) NOT NULL UNIQUE,
        password_hash VARCHAR(1024) NOT NULL
    );

CREATE TABLE
    products(
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        category VARCHAR(30) NOT NULL
    );

CREATE TABLE
    orders(
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL,
        status INTEGER NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        completed_at TIMESTAMP DEFAULT NULL,
        CONSTRAINT fk_order_owner FOREIGN KEY(user_id) REFERENCES users
    );

CREATE TABLE
    order_products(
        order_id INTEGER NOT NULL,
        product_id INTEGER NOT NULL,
        quantity INTEGER NOT NULL DEFAULT 1,
        PRIMARY KEY(order_id, product_id),
        FOREIGN KEY(order_id) REFERENCES orders,
        FOREIGN KEY(product_id) REFERENCES products
    );

CREATE TABLE
    cart_products(
        owner_id INTEGER,
        product_id INTEGER,
        quantity INTEGER NOT NULL DEFAULT 1,
        PRIMARY KEY(owner_id, product_id),
        FOREIGN KEY(owner_id ) REFERENCES users,
        FOREIGN KEY(product_id) REFERENCES products
    );