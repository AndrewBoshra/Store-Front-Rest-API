import { Pool } from "pg";
import {
    CartViewModel,
    Order,
    Product,
    ProductInCartViewModel,
} from "../models/";
import { openConnectionAndQuery } from "../models/shared/database";

export class CartService {
    constructor(public pool: Pool) {}
    //TODO add type for this
    private deserializeProductInCart(r: any) {
        const product = new Product({ ...r, id: r.product_id });
        return new ProductInCartViewModel(product, r.quantity);
    }
    async index(userId: number): Promise<CartViewModel> {
        const sql = `SELECT * 
                     FROM cart_products,products
                     WHERE cart_products.product_id=products.id AND
                     owner_id=$1;`;

        const dbRes = await openConnectionAndQuery(this.pool, sql, [userId]);
        const rows = dbRes.rows;
        const productsInCart: ProductInCartViewModel[] = rows.map(
            this.deserializeProductInCart
        );
        return new CartViewModel(productsInCart);
    }
    async delete(userId: number, productId: number): Promise<number> {
        const sql = `DELETE 
                     FROM cart_products
                     WHERE product_id=$1 AND owner_id=$2;`;
        const dbRes = await openConnectionAndQuery(this.pool, sql, [
            productId,
            userId,
        ]);
        return dbRes.rowCount;
    }
    async update(
        userId: number,
        productId: number,
        quantity: number
    ): Promise<number> {
        const sql = `UPDATE cart_products
                     SET quantity=$3
                     WHERE product_id=$1 AND owner_id=$2;`;
        const dbRes = await openConnectionAndQuery(this.pool, sql, [
            productId,
            userId,
            quantity,
        ]);
        return dbRes.rowCount;
    }
    async add(
        userId: number,
        productId: number,
        quantity: number
    ): Promise<number> {
        //TODO CHECK FOR VALID INPUT (EXISTS)
        const sql = `INSERT INTO cart_products(owner_id,product_id,quantity)
                    VALUES($1,$2,$3)
                    RETURNING *;`;
        try {
            const dbRes = await openConnectionAndQuery(this.pool, sql, [
                userId,
                productId,
                quantity,
            ]);
            return dbRes.rowCount;
        } catch {
            return 0;
        }
    }
    async order(
        userId: number,
        productId: number,
        quantity: number
    ): Promise<Order> {
        throw new Error("Unimplemented");
    }
}
