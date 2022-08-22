import OrderViewModel from "../models/view_models/order_view_model";
import { Pool } from "pg";
import { OrderStatus, Product } from "../models";
import { openConnectionAndQuery } from "../models/shared/database";

export class OrderService {
    constructor(public pool: Pool) {}
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private async deserializeOrders(rows: any[]): Promise<OrderViewModel[]> {
        const createdOrders: { [key: number]: OrderViewModel } = {};
        // Create Orders Without the products
        for (const orderRow of rows) {
            const id = orderRow.order_id;
            if (!(id in Object.keys(createdOrders))) {
                createdOrders[id] = new OrderViewModel({
                    ...orderRow,
                    id: orderRow.order_id,
                });
            }
        }

        // Create Products to Orders
        for (const orderRow of rows) {
            const orderId = orderRow.order_id;
            const product = new Product({
                ...orderRow,
                id: orderRow.product_id,
            });
            createdOrders[orderId].addProduct({
                ...orderRow,
                product,
            });
        }
        return Object.values(createdOrders);
    }
    async getCompletedOrdersByUser(userId: number): Promise<OrderViewModel[]> {
        const sql = `SELECT *
                     FROM orders , order_products, products
                     WHERE orders.id=order_products.order_id AND 
                           products.id=order_products.product_id AND
                           orders.user_id=$1 AND
                           orders.status=$2;
                    `;
        const dbRes = await openConnectionAndQuery(this.pool, sql, [
            userId,
            OrderStatus.Completed,
        ]);
        return this.deserializeOrders(dbRes.rows);
    }

    async getOrdersCreatedByUser(userId: number): Promise<OrderViewModel[]> {
        const sql = `SELECT *
                     FROM orders , order_products, products
                     WHERE orders.id=order_products.order_id AND 
                     products.id=order_products.product_id AND
                           orders.user_id=$1;`;
        const response = await openConnectionAndQuery(this.pool, sql, [userId]);
        return this.deserializeOrders(response.rows);
    }
}
