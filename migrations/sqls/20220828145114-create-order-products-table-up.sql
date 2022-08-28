/* Replace with your SQL commands */
CREATE TABLE
    order_products(
        order_id INTEGER NOT NULL,
        product_id INTEGER NOT NULL,
        quantity INTEGER NOT NULL DEFAULT 1,
        PRIMARY KEY(order_id, product_id),
        FOREIGN KEY(order_id) REFERENCES orders,
        FOREIGN KEY(product_id) REFERENCES products
    );