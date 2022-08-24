import { User } from "../../models";
import { ValidationError } from "../../shared/errors/error";
import { customMatchers } from "../helpers/matcher";

describe("User Model", () => {
    beforeAll(() => jasmine.addMatchers(customMatchers));

    it("should require first name", () => {
        const test = () =>
            new User({
                email: "test@test.com",
                // first_name: "fname",
                last_name: "lname",
            });
        expect(test).toThrowErrorOfType(ValidationError, /first.*name/);
    });
    it("should require last name", () => {
        const test = () =>
            new User({
                email: "test@test.com",
                first_name: "fname",
                // last_name: "lname",
            });
        expect(test).toThrowErrorOfType(ValidationError, /last.*name/);
    });
    it("should require email", () => {
        const test = () =>
            new User({
                // email: "test@test.com",
                first_name: "fname",
                last_name: "lname",
            });
        expect(test).toThrowErrorOfType(ValidationError, /email/);
    });
    it("should validate email", () => {
        const test = () =>
            new User({
                email: "test.com",
                first_name: "fname",
                last_name: "lname",
            });
        expect(test).toThrowErrorOfType(ValidationError, /email/);
    });

    it("should create a new user when all data is right", () => {
        const test = () =>
            new User({
                email: "test@test.com",
                first_name: "fname",
                last_name: "lname",
            });
        expect(test).not.toThrow();
    });
});
