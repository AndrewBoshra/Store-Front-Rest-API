import request from "supertest";
import app from "../../index";
describe("/auth endpoints", () => {
    describe("/signup[POST]", () => {
        const signupBody = {
            first_name: "first_name",
            last_name: "last_name",
            email: "test@email.com",
            password: "123456",
        };
        describe("validation", () => {
            describe("email", () => {
                it("should be required", async () => {
                    const res = await request(app)
                        .post("/auth/signup")
                        .send({ ...signupBody, email: undefined });
                    expect(res.statusCode).toBe(400);
                    expect(res.body.error).toMatch(/email/);
                });
                it("should be valid", async () => {
                    const res = await request(app)
                        .post("/auth/signup")
                        .send({ ...signupBody, email: "email" });
                    expect(res.statusCode).toBe(400);
                    expect(res.body.error).toMatch(/email/);
                });
            });
            describe("password", () => {
                it("should be required", async () => {
                    const res = await request(app)
                        .post("/auth/signup")
                        .send({ ...signupBody, password: undefined });
                    expect(res.statusCode).toBe(400);
                    expect(res.body.error).toMatch(/password/);
                });
                it("should be more than 6 chars", async () => {
                    const res = await request(app)
                        .post("/auth/signup")
                        .send({ ...signupBody, password: "123" });
                    expect(res.statusCode).toBe(400);
                    expect(res.body.error).toMatch(/password/);
                });
            });
            describe("first_name", () => {
                it("should be required", async () => {
                    const res = await request(app)
                        .post("/auth/signup")
                        .send({ ...signupBody, first_name: undefined });
                    expect(res.statusCode).toBe(400);
                    expect(res.body.error).toMatch(/first_name/);
                });
                it("should not be empty", async () => {
                    const res = await request(app)
                        .post("/auth/signup")
                        .send({ ...signupBody, first_name: "      " });
                    expect(res.statusCode).toBe(400);
                    expect(res.body.error).toMatch(/first_name/);
                });
            });
            describe("last_name", () => {
                it("should be required", async () => {
                    const res = await request(app)
                        .post("/auth/signup")
                        .send({ ...signupBody, last_name: undefined });
                    expect(res.statusCode).toBe(400);
                    expect(res.body.error).toMatch(/last_name/);
                });
                it("should not be empty", async () => {
                    const res = await request(app)
                        .post("/auth/signup")
                        .send({ ...signupBody, last_name: "      " });
                    expect(res.statusCode).toBe(400);
                    expect(res.body.error).toMatch(/last_name/);
                });
            });
        });
        it("should create a new user when all data is valid", async () => {
            const res = await request(app)
                .post("/auth/signup")
                .send(signupBody);
            expect(res.statusCode).toEqual(201);
            expect(res.body.error)
                .withContext("shouldn't have error")
                .not.toBeDefined();
            expect(res.body.data.token)
                .withContext("should return token")
                .toBeDefined();
        });
        it("should return the valid object structure", async () => {
            const res = await request(app)
                .post("/auth/signup")
                .send({ ...signupBody, email: "structure@test.com" });
            expect(res.statusCode).toEqual(201);
            expect(res.body.error)
                .withContext("shouldn't have error")
                .not.toBeDefined();
            expect(res.body.data.token)
                .withContext("should have token")
                .toBeDefined();

            const userKeys = ["email", "firstName", "id", "lastName"].sort();
            expect(Object.keys(res.body.data.user).sort()).toEqual(userKeys);
        });
    });

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
        it("should return the valid object structure", async () => {
            const res = await request(app)
                .post("/auth/login")
                .send({ email: "structure@test.com", password: "123456" });
            expect(res.statusCode).toEqual(200);
            expect(res.body.error)
                .withContext("shouldn't have error")
                .not.toBeDefined();
            expect(res.body.data.token)
                .withContext("should have token")
                .toBeDefined();

            const userKeys = ["email", "firstName", "id", "lastName"].sort();
            expect(Object.keys(res.body.data.user).sort()).toEqual(userKeys);
        });
    });
});
