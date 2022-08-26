import request from "supertest";
import app from "../../index";
import { getToken } from "../helpers/auth_helper";
describe("cart endpoints", () => {
    let token: string | null = null;
    const route = (r = "") => `/cart/${r}`;
    beforeAll(() =>
        getToken((t) => {
            token = t;
        })
    );
    beforeAll(() =>
        request(app)
            .post("/products/")
            .set("Authorization", token!)
            .send({ name: "name", category: "category", price: 100 })
            .expect(201)
    );
    describe("/[GET]", async () => {
        it("should return 401 when no token is provided", () => {
            request(app).get(route()).expect(401);
        });
        it("should return empty array when cart is empty", async () => {
            const res = await request(app)
                .get(route())
                .set("Authorization", token!);
            expect(res.statusCode).toBe(200);
            expect(res.body.data.products).toEqual([]);
        });
    });
    describe("/[POST] - Add to cart", async () => {
        it("should return 401 when no token is provided", () => {
            request(app).post(route()).expect(401);
        });

        it("should return empty array when cart is empty", async () => {
            const res = await request(app)
                .get(route())
                .set("Authorization", token!);
            expect(res.statusCode).toBe(200);
            expect(res.body.data.products).toEqual([]);
        });
        it("should return 200 when the data is valid", async () => {
            const res = await request(app)
                .post(route())
                .set("Authorization", token!)
                .send({ productid: 1, quantity: 5 });
            expect(res.statusCode).toBe(200);
        });
        it("should add product to cart", async () => {
            const res = await request(app)
                .get(route())
                .set("Authorization", token!);
            expect(res.statusCode).toBe(200);
            expect(res.body.data.products.length).toEqual(1);
            expect(res.body.data.products[0].product.id).toEqual(1);
            expect(res.body.data.products[0].quantity).toEqual(5);
        });
    });
    describe("/[PATCH]/:id - Update to cart", async () => {
        it("should return 401 when no token is provided", () => {
            request(app).patch(route("1")).expect(401);
        });

        it("should update quantity", async () => {
            const res = await request(app)
                .patch(route("1"))
                .set("Authorization", token!)
                .send({ quantity: 10 });
            expect(res.statusCode).toBe(200);

            const res2 = await request(app)
                .get(route())
                .set("Authorization", token!);
            expect(res2.statusCode).toBe(200);
            expect(res2.body.data.products[0].quantity).toEqual(10);
        });
    });
    describe("/:id[DELETE] - delete product in cart", async () => {
        it("should return 401 when no token is provided", () => {
            request(app).patch(route("1")).expect(401);
        });

        it("should delete product", async () => {
            const res = await request(app)
                .delete(route("1"))
                .set("Authorization", token!);
            expect(res.statusCode).toBe(200);

            const res2 = await request(app)
                .get(route())
                .set("Authorization", token!);
            expect(res2.statusCode).toBe(200);
            expect(res2.body.data.products.length).toEqual(0);
        });
    });
    describe("/order [POST] - create an order with products in cart", async () => {
        it("should return 401 when no token is provided", () => {
            request(app).post(route("order")).expect(401);
        });

        describe("actions", () => {
            beforeAll(async () => {
                const res2 = await request(app)
                    .post(route())
                    .set("Authorization", token!)
                    .send({ productid: 1, quantity: 5 });
                expect(res2.statusCode).toBe(200);

                const res = await request(app)
                    .post(route("order"))
                    .set("Authorization", token!);
                expect(res.statusCode).toBe(201);
            });
            it("should create a new order", async () => {
                const res = await request(app)
                    .get("/orders")
                    .set("Authorization", token!);
                expect(res.body.data.length).toEqual(1);
            });
            it("should delete all products in cart", async () => {
                const res = await request(app)
                    .get(route())
                    .set("Authorization", token!);

                expect(res.body.data.products.length).toEqual(0);
            });
        });
    });
});
