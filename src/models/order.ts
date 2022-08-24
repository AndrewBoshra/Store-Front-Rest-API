import { requiredFieldValidator } from "../shared/app_validators";

export enum OrderStatus {
    Active = 1,
    Completed = 2,
}

export class Order {
    id?: string;
    userId: number;
    status: OrderStatus;
    created_at?: Date;
    constructor(order: {
        id?: string;
        user_id: number;
        status?: OrderStatus;
        created_at?: Date;
    }) {
        this.id = order.id;
        this.created_at = order.created_at;
        this.userId = requiredFieldValidator(order.user_id, "user_id");
        this.status = order.status || OrderStatus.Active;
    }
}
