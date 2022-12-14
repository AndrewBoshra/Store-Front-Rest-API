import { Pool } from "pg";
import { Product } from "../models/index";
import { openConnectionAndQuery } from "../server/database";

export default class ProductsRepository {
    constructor(public pool: Pool) {}
    async add(product: Product): Promise<Product> {
        const sql = `INSERT INTO products(name,price,category)
                     VALUES($1,$2,$3)
                     RETURNING id;`;
        const dbRes = await openConnectionAndQuery(this.pool, sql, [
            product.name,
            product.price,
            product.category,
        ]);
        const data = dbRes.rows[0];
        product.id = data.id;
        return product;
    }
    async get(id: number): Promise<Product | undefined> {
        const sql = `SELECT * 
                     FROM products
                     WHERE id=$1;`;
        const dbRes = await openConnectionAndQuery(this.pool, sql, [id]);
        const rows = dbRes.rows;
        if (rows.length == 0) return undefined;
        return new Product(rows[0]);
    }
    async getAll(): Promise<Product[]> {
        const sql = `SELECT * 
        FROM products;`;
        return await this.getProductsMany(sql);
    }

    async getPopularProducts(limit = 5): Promise<Product[]> {
        const groupQuantity = ` SELECT product_id , quantity,COUNT(*) , COUNT(*) * quantity as quantity_in_order
                                FROM order_products
                                GROUP BY product_id,quantity`;

        const getPopularProducts = `SELECT product_id
                                    FROM(${groupQuantity}) as query
                                    GROUP BY product_id
                                    ORDER BY SUM(quantity_in_order) DESC
                                    LIMIT $1
                                    `;
        const sql = `SELECT * 
                     FROM products
                     WHERE id in (${getPopularProducts});`;
        return await this.getProductsMany(sql, [limit]);
    }
    async getCategoryProducts(category: string): Promise<Product[]> {
        const sql = `SELECT * 
        FROM products 
        WHERE category LIKE $1;`;
        return await this.getProductsMany(sql, [`%${category}%`]);
    }
    private async getProductsMany(
        sql: string,
        params: unknown[] | undefined = undefined
    ): Promise<Product[]> {
        const dbRes = await openConnectionAndQuery(this.pool, sql, params);
        const rows = dbRes.rows;
        return rows.map((r) => new Product(r));
    }
}
