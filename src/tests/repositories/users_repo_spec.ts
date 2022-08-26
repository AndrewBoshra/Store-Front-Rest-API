import { User } from "../../models";
import { usersRepository } from "../../server/container";

describe("UserRepository", () => {
    let user = new User({
        first_name: "fn",
        last_name: "ln",
        email: "test@storefront.com",
        password_hash: "password",
    });
    describe("add", () => {
        it("should populate the id", async () => {
            user = await usersRepository.add(user);
            expect(user.id).toBeDefined();
        });
        it("should add user to database", async () => {
            const u = await usersRepository.get(user.id!);
            expect(Object.assign({}, u)).toEqual(Object.assign({}, user));
        });
    });
    describe("get", () => {
        it("should return undefined in case of wrong id", async () => {
            const p = await usersRepository.get(999);
            expect(p).toEqual(undefined);
        });
    });
    describe("getUserByEmail", () => {
        it("should return undefined in case of wrong email", async () => {
            const p = await usersRepository.getUserByEmail("notvalid@test.com");
            expect(p).toEqual(undefined);
        });
        it("should return user by email", async () => {
            const p = await usersRepository.getUserByEmail(
                "test@storefront.com"
            );
            expect(p?.email).toEqual("test@storefront.com");
        });
    });
    describe("getAll", () => {
        it("should return all users", async () => {
            const us = await usersRepository.getAll();
            expect(us.length).toEqual(5);
        });
    });
});
