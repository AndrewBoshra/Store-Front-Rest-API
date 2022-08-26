import { Product } from "../../models";
import { productsRepository } from "../../server/container";

describe("ProductRepository", () => {
    let product = new Product({
        name: "productsRepo",
        category: "test",
        price: 100,
    });
    describe("add", () => {
        it("should populate the id", async () => {
            product = await productsRepository.add({
                name: "name",
                category: "category",
                price: 100,
            });
            expect(product.id).toBeDefined();
        });
        it("should add product to database", async () => {
            const p = await productsRepository.get(product.id!);
            expect(Object.assign({}, p)).toEqual(Object.assign({}, product));
        });
    });
    describe("get", () => {
        it("should return undefined in case of wrong id", async () => {
            const p = await productsRepository.get(999);
            expect(p).toEqual(undefined);
        });
    });
    describe("getAll", () => {
        it("should return all products", async () => {
            const ps = (await productsRepository.getAll()).sort(
                (a, b) => a.id! - b.id!
            ); //sort with ids
            expect(ps.length).toEqual(3);
            expect(Object.assign({}, ps[ps.length - 1])).toEqual(
                Object.assign({}, product)
            );
        });
    });
});
