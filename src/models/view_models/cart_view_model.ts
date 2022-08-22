import { Product } from "../product";
export class ProductInCartViewModel {
    constructor(public product: Product, public quantity: number) {}
}
export class CartViewModel {
    constructor(public products: ProductInCartViewModel[] = []) {}
}
