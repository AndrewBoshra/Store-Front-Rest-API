import request from "supertest";
import app from "../../index";
describe("products_controller", () => {
    const route = (r = "") => `/products/${r}`;
    const server = request(app);

    // let token = "";
    // beforeAll(async () => {
    //     const res = await request(app).post("/auth/signup").send({
    //         first_name: "products",
    //         last_name: "test",
    //         email: "products@test.com",
    //         password: "products@test.com",
    //     });
    //     token = res.body.token;
    // });
    fdescribe("/[POST]", () => {
        it("should require auth token", async () => {
            const res = await server.post(route()).send({});
            expect(res.statusCode).toBe(401);
        });

        it("should create product", async () => {
            const res = await server.post(route()).send({
                name: "test create product",
                description: "test create product",
                price: 150,
                category: "test",
            });
            expect(res.statusCode).toBe(201);
        });
    });

    describe("/[GET]", () => {
        it("should exist", async () => {
            const res = await server.get(route());
            expect(res.statusCode).not.toBe(404);
        });
        it("should return empty array in case of no products", async () => {
            const res = await server.get(route());
            expect(res.statusCode).toBe(200);
            expect(res.body.data).toBeDefined();
            expect(res.body.data.length).toEqual(0);
        });
    });
});
