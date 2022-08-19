import { OrderStatus, Product } from "..";
export class OrderProductViewModel {
    price: number;
    product: Product;
    quantity: number;
    id?: number;

    constructor(orderProduct: {
        product: Product;
        quantity: number;
        id?: number;
    }) {
        this.id = orderProduct.id;
        this.product = orderProduct.product;
        this.quantity = orderProduct.quantity;
        this.price = this.quantity * this.product.price;
    }
}

export default class OrderViewModel {
    totalOrderPrice: number;
    userId: number;
    status: OrderStatus;
    products: OrderProductViewModel[] = [];
    id?: number;
    constructor(order: {
        user_id: number;
        status: OrderStatus;
        products?: OrderProductViewModel[];
        id?: number;
    }) {
        this.id = order.id;
        this.status = order.status;
        this.userId = order.user_id;
        this.status = order.status;
        this.totalOrderPrice = (order.products || [])
            .map((product) => product.price)
            .reduce((accumulativePrice, price) => accumulativePrice + price, 0);
    }
    addProduct(productDetails: {
        product: Product;
        quantity: number;
        id?: number;
    }) {
        this.products?.push(new OrderProductViewModel(productDetails));
        this.totalOrderPrice +=
            productDetails.product.price * productDetails.quantity;
    }
}
