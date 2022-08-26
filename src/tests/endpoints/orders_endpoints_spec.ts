import request from "supertest";
import app from "../../index";
import { getToken } from "../helpers/auth_helper";
describe("/orders endpoints", () => {
    describe("/[GET] - get all orders", () => {
        const route = (r = "") => `/orders/${r}`;
        let token: string | null = null;
        beforeAll(() =>
            getToken((t) => {
                token = `Bearer ${t}`;
            })
        );
        it("should return 401 when no token is provided", () => {
            request(app).get(route()).expect(401);
        });
        it("should return status code 200 when token is provided", async () => {
            await request(app)
                .get(route())
                .set("Authorization", token!)
                .expect(200);
        });
        it("should return array of 1 order", async () => {
            const res = await request(app)
                .get(route())
                .set("Authorization", token!);
            expect(res.body.data.length).toEqual(1);
        });
    });
});
