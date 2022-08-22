import { RequiredFieldError, ValidationError } from "../errors/error";

export class Product {
    id?: number;
    name: string;
    price: number;
    category: string;

    constructor(product: {
        id?: number;
        name?: string;
        price?: number;
        category?: string;
    }) {
        if (product.name == undefined) throw new RequiredFieldError("name");

        if (product.name.trim().length == 0)
            throw new ValidationError("name", "name can not be empty!");

        if (product.price == undefined) throw new RequiredFieldError("price");

        if (isNaN(product.price) || product.price < 0)
            throw new ValidationError("price", "is invalid");

        if (product.category == undefined)
            throw new RequiredFieldError("category");

        this.id = product.id;
        this.name = product.name;
        this.price = product.price;
        this.category = product.category;
    }
}
