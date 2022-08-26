import request from "supertest";
import app from "../../index";
import { getToken } from "../helpers/auth_helper";
describe("/users endpoints", () => {
    const route = (r = "") => `/users/${r}`;
    const server = request(app);
    let token: string | null = null;
    beforeAll(() =>
        getToken((t) => {
            token = `Bearer ${t}`;
        })
    );

    const user = {
        id: 1,
        firstName: "first_name",
        lastName: "last_name",
        email: "test@email.com",
    };
    describe("/[GET]", () => {
        it("should exist", async () => {
            const res = await server.get(route()).set("Authorization", token!);
            expect(res.statusCode).not.toBe(404);
        });
        it("should return all users", async () => {
            const res = await server.get(route()).set("Authorization", token!);
            expect(res.statusCode).toBe(200);
            expect(res.body.data).toBeDefined();
            expect(res.body.data.length).toEqual(4);
        });
    });
    describe("/[GET]/:id", () => {
        it("should 404 when invalid id is given", async () => {
            const res = await server
                .get(route("200"))
                .set("Authorization", token!);
            expect(res.statusCode).toBe(404);
        });
        it("should the user when right id is given", async () => {
            const res = await server
                .get(route("1"))
                .set("Authorization", token!);
            expect(res.statusCode).toBe(200);
            expect(res.body.data).toEqual(user);
        });
    });
});
