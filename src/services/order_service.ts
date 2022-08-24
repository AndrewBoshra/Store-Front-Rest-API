import OrderViewModel from "../models/view_models/order_view_model";
import { Pool, PoolClient } from "pg";
import { OrderStatus, Product } from "../models";
import { openConnectionAndQuery, transaction } from "../shared/database";
interface OrderDetails {
    userId: number;
    products: { productId: number; quantity: number }[];
}
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
    private async createOrderTransaction(
        client: PoolClient,
        orderDetails: OrderDetails
    ): Promise<number> {
        const insertOrderSQL = `INSERT INTO orders(user_id,status) VALUES($1,${OrderStatus.Active}) RETURNING id;`;
        const insertOrderRes = await client.query(insertOrderSQL, [
            orderDetails.userId,
        ]);
        const order_id = insertOrderRes.rows[0].id as number;
        let insertProductsSql = `INSERT INTO order_products(order_id,product_id,quantity) VALUES`;
        const insertProductsArgs: unknown[] = [];
        let argNum = 1;
        const products = orderDetails.products;
        for (let i = 0; i < products.length; i++) {
            insertProductsSql += `(\$${argNum++},\$${argNum++},\$${argNum++})`;
            insertProductsSql += i === products.length - 1 ? ";" : ",";
            insertProductsArgs.push(
                order_id,
                products[i].productId,
                products[i].quantity
            );
        }
        await client.query(insertProductsSql, insertProductsArgs);
        return order_id;
    }
    async createNewOrder(orderDetails: OrderDetails) {
        return await transaction(this.pool, (c) =>
            this.createOrderTransaction(c, orderDetails)
        );
    }
}
