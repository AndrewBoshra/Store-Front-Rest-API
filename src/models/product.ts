import {
    compose,
    notEmpty,
    numberValidator,
    priceValidator,
    requiredFieldValidator,
} from "../shared/app_validators";
const nameValidator = compose<string>("name", requiredFieldValidator, notEmpty);
const categoryValidator = compose<string>(
    "category",
    requiredFieldValidator,
    notEmpty
);
const productPriceValidator = compose<number>(
    "price",
    requiredFieldValidator,
    numberValidator,
    priceValidator
);

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
        this.id = product.id;
        this.name = nameValidator(product.name);
        this.price = productPriceValidator(product.price);
        this.category = categoryValidator(product.category);
    }
}
