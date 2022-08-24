import request from "supertest";
import app from "../../index";
describe("/products endpointss", () => {
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
    describe("/[POST]", () => {
        it("should require auth token", async () => {
            const res = await server.post(route()).send({});
            expect(res.statusCode).toBe(401);
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
