/* Replace with your SQL commands */
CREATE TABLE
    cart_products(
        owner_id INTEGER,
        product_id INTEGER,
        quantity INTEGER NOT NULL DEFAULT 1,
        PRIMARY KEY(owner_id, product_id),
        FOREIGN KEY(owner_id) REFERENCES users,
        FOREIGN KEY(product_id) REFERENCES products
    );