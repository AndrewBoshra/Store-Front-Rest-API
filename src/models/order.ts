export enum OrderStatus {
    Active = 1,
    Completed = 2,
}

export class Order {
    id?: string;
    userId: number;
    status: OrderStatus;
    constructor(order: { id?: string; user_id: number; status?: OrderStatus }) {
        this.id = order.id;
        this.userId = order.user_id;
        this.status = order.status || OrderStatus.Active;
    }
}
