import { Product } from "../../models";
import { ValidationError } from "../../shared/errors/error";
import { customMatchers } from "../helpers/matcher";

describe("Product Model", () => {
    beforeAll(() => jasmine.addMatchers(customMatchers));

    it("should require name", () => {
        const test = () =>
            new Product({
                category: "category",
                // name: "name",
                price: 100,
            });
        expect(test).toThrowErrorOfType(ValidationError, /name/);
    });

    it("should require category", () => {
        const test = () =>
            new Product({
                // category: "category",
                name: "name",
                price: 100,
            });
        expect(test).toThrowErrorOfType(ValidationError, /category/);
    });

    it("should require price", () => {
        const test = () =>
            new Product({
                category: "category",
                name: "name",
                // price: 100,
            });
        expect(test).toThrowErrorOfType(ValidationError, /price/);
    });
    it("should validate price", () => {
        const test = () =>
            new Product({
                category: "category",
                name: "name",
                price: -1,
            });
        expect(test).toThrowErrorOfType(ValidationError, /price/);
    });
    it("should validate name", () => {
        const test = () =>
            new Product({
                category: "category",
                name: "       ",
                price: 100,
            });
        expect(test).toThrowErrorOfType(ValidationError, /name/);
    });

    it("should validate category", () => {
        const test = () =>
            new Product({
                category: "     ",
                name: "name",
                price: 100,
            });
        expect(test).toThrowErrorOfType(ValidationError, /category/);
    });
    it("should create product when all data are valid", () => {
        const test = () =>
            new Product({
                category: "category",
                name: "name",
                price: 100,
            });
        expect(test).not.toThrow();
    });
});
