import request from "supertest";
import app from "../../index";
describe("/auth endpoints", () => {
    describe("/login[POST]", () => {
        beforeAll(async () => {
            await request(app).post("/auth/signup").send({
                first_name: "test",
                last_name: "test",
                email: "my@mial.com",
                password: "123456",
            });
        });
        it("should require email", async () => {
            const res = await request(app)
                .post("/auth/login")
                .send({ password: "123456" });
            expect(res.statusCode).toBe(400);
            expect(res.body.error).toMatch(/email/);
        });
        it("should require password", async () => {
            const res = await request(app)
                .post("/auth/login")
                .send({ email: "my@mial.com" });
            expect(res.statusCode).toBe(400);
            expect(res.body.error).toMatch(/password/);
        });
    });

    it("should login user when password is correct", async () => {
        const login = await request(app).post("/auth/login").send({
            email: "my@mial.com",
            password: "123456",
        });
        expect(login.statusCode).toBe(200);
        expect(login.body.data.token).toBeDefined();
        expect(login.body.error).not.toBeDefined();
    });
    it("should not login user when password is not correct", async () => {
        const login = await request(app).post("/auth/login").send({
            email: "my@mial.com",
            password: "123456789",
        });
        expect(login.statusCode).toBe(401);
    });
});
