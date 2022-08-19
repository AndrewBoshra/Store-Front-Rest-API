import Application from "./server/server";

const app = new Application();
app.bootstrap();
export default app.expressApp; //for testing

// async function seedData(client: PoolClient): Promise<void> {
//     if (
//         (await (
//             await client.query("select count(*) from products;")
//         ).rows[0].count) > 0
//     ) {
//         console.log("Db Already Seeded");
//         return;
//     }
//     const users = [
//         new User({
//             first_name: "Andrew",
//             last_name: "Boshra",
//             email: "andrew.boshra@gmail.com",
//             password_hash: "00000000000",
//         }),
//         new User({
//             first_name: "Michael",
//             last_name: "Boshra",
//             email: "michael.boshra@gmail.com",
//             password_hash: "00000000000",
//         }),
//         new User({
//             first_name: "Marina",
//             last_name: "Boshra",
//             email: "marina.boshra@gmail.com",
//             password_hash: "00000000000",
//         }),
//     ];
//     const products = [
//         new Product({
//             category: "laptop",
//             name: "Ideapad 520",
//             price: 13000,
//         }),
//         new Product({
//             category: "tv",
//             name: "Samsung Tv 43 inches",
//             price: 7200,
//         }),
//         new Product({
//             category: "mobile",
//             name: "Redmi 9",
//             price: 4200,
//         }),
//     ];
//     const orders = [
//         new Order({
//             user_id: 1,
//         }),
//         new Order({
//             user_id: 2,
//         }),
//     ];
//     const rels = [
//         { order_id: 1, product_id: 1 },
//         { order_id: 1, product_id: 2 },
//         { order_id: 1, product_id: 3 },
//     ];
//     for (const user of users) {
//         const sql =
//             "INSERT INTO users(first_name,last_name,password_hash) values($1,$2,$3);";
//         await client.query(sql, [
//             user.first_name,
//             user.last_name,
//             user.password_hash,
//         ]);
//     }
//     for (const product of products) {
//         const sql =
//             "INSERT INTO products(category,name,price) values($1,$2,$3);";
//         await client.query(sql, [
//             product.category,
//             product.name,
//             product.price,
//         ]);
//     }
//     for (const order of orders) {
//         const sql = "INSERT INTO orders(user_id,status) values($1,$2);";
//         await client.query(sql, [order.userId, order.status]);
//     }
//     for (const rel of rels) {
//         const sql =
//             "INSERT INTO order_products(order_id,product_id) values($1,$2);";
//         await client.query(sql, [rel.order_id, rel.product_id]);
//     }
//     console.log("Seeded Database");
// }
// async function fn() {
//     const conn = await new Pool({
//         database: config.dbName,
//         user: config.dbUser,
//         password: config.dbPassword,
//         host: config.dbHost,
//         log: console.log,
//     }).connect();

//     await seedData(conn);
//     const ps = new OrderService(conn);
//     console.log(await ps.getOrdersCreatedByUser(1));
//     await conn.release();
// }
// fn();
