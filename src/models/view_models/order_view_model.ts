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
    createdAt: Date;
    completedAt?: Date;
    totalOrderPrice: number;
    userId: number;
    status: string;
    products: OrderProductViewModel[] = [];
    id?: number;
    constructor(order: {
        user_id: number;
        status: OrderStatus;
        products?: OrderProductViewModel[];
        created_at: Date;
        completed_at?: Date;
        id?: number;
    }) {
        this.id = order.id;
        this.userId = order.user_id;
        this.status =
            order.status == OrderStatus.Active ? "Active" : "Completed";
        this.createdAt = order.created_at;
        this.completedAt = order.completed_at;
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
