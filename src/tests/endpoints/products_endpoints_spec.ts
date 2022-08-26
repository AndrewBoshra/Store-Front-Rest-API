import request from "supertest";
import app from "../../index";
import { getToken } from "../helpers/auth_helper";
describe("/products endpoints", () => {
    const route = (r = "") => `/products/${r}`;
    const server = request(app);
    let token: string | null = null;
    beforeAll(() =>
        getToken((t) => {
            token = `Bearer ${t}`;
        })
    );
    describe("/[POST]", () => {
        it("should exist", async () => {
            const res = await server
                .post(route())
                // .set("Authorization", token!)
                .send({});
            expect(res.statusCode).not.toBe(404);
        });
        it("should require auth token", async () => {
            const res = await server
                .post(route())
                // .set("Authorization", token!)
                .send({});
            expect(res.statusCode).toBe(401);
        });
        // describe("validation", () => {
        const reqBody = {
            name: "name",
            category: "category",
            price: 100,
        };
        //     describe("name", () => {
        //         it("should be required", async () => {
        //             const res = await server
        //                 .post(route())
        //                 .set("Authorization", token!)
        //                 .send({ ...reqBody, name: undefined });
        //             expect(res.statusCode).toBe(400);
        //             expect(res.body.error).toMatch(/name/);
        //         });
        //         it("should be not empty", async () => {
        //             const res = await server
        //                 .post(route())
        //                 .set("Authorization", token!)
        //                 .send({ ...reqBody, name: "         " });
        //             expect(res.statusCode).toBe(400);
        //             expect(res.body.error).toMatch(/name/);
        //         });
        //     });
        //     describe("price", () => {
        //         it("should be required", async () => {
        //             const res = await server
        //                 .post(route())
        //                 .set("Authorization", token!)
        //                 .send({ ...reqBody, price: undefined });
        //             expect(res.statusCode).toBe(400);
        //             expect(res.body.error).toMatch(/price/);
        //         });
        //         it("should be positive", async () => {
        //             const res = await server
        //                 .post(route())
        //                 .set("Authorization", token!)
        //                 .send({ ...reqBody, price: -5 });
        //             expect(res.statusCode).toBe(400);
        //             expect(res.body.error).toMatch(/price/);
        //         });
        //     });
        //     describe("category", () => {
        //         it("should be required", async () => {
        //             const res = await server
        //                 .post(route())
        //                 .set("Authorization", token!)
        //                 .send({ ...reqBody, category: undefined });
        //             expect(res.statusCode).toBe(400);
        //             expect(res.body.error).toMatch(/category/);
        //         });
        //         it("should not be empty", async () => {
        //             const res = await server
        //                 .post(route())
        //                 .set("Authorization", token!)
        //                 .send({ ...reqBody, category: "     " });
        //             expect(res.statusCode).toBe(400);
        //             expect(res.body.error).toMatch(/category/);
        //         });
        //     });
        describe("create product", () => {
            it("should has a valid response structure", async () => {
                const res = await server
                    .post(route())
                    .set("Authorization", token!)
                    .send(reqBody);
                expect(res.statusCode).toBe(201);
                expect(res.body.error).toBeUndefined();
                expect(res.body.data).toBeDefined();
                const expectedData = { ...reqBody, id: res.body.data.id };
                expect(res.body.data).toEqual(expectedData);
            });
        });
    });

    const product = {
        id: 1,
        name: "name",
        category: "category",
        price: 100,
    };
    describe("/[GET]", () => {
        it("should exist", async () => {
            const res = await server.get(route());
            expect(res.statusCode).not.toBe(404);
        });
        it("should return all products", async () => {
            const res = await server.get(route());
            expect(res.statusCode).toBe(200);
            expect(res.body.data).toBeDefined();
            expect(res.body.data.length).toEqual(2);
            expect(res.body.data[0]).toEqual(product);
        });
    });
    describe("/[GET]/:id", () => {
        it("should 404 when invalid id is given", async () => {
            const res = await server.get(route("20"));
            expect(res.statusCode).toBe(404);
        });
        it("should the product when right id is given", async () => {
            const res = await server.get(route("1"));
            expect(res.statusCode).toBe(200);
            expect(res.body.data).toEqual(product);
        });
    });
});
