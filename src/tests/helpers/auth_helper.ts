import request from "supertest";
import app from "../../index";
let token: string | null = null;
const user = {
    first_name: "first_name",
    last_name: "last_name",
    email: "name@test.com",
    password: "name@test.com",
};
export async function getToken(cb: (t: string) => void) {
    if (token !== null) return cb(token);
    const res = await request(app).post("/auth/signup").send(user);
    expect(res.statusCode).toBe(201);
    token = res.body.data.token;
    expect(token).withContext("token must be defined").toBeDefined();
    cb(token!);
}
