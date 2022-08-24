import { RequestHandler } from "express";
import { OrderService } from "../../services";
import { AppResponse } from "./response";
import { idValidator } from "../../shared/app_validators";

export class OrdersController {
    constructor(private readonly _ordersService: OrderService) {}
    index: RequestHandler = async (req, res) => {
        const userId = req.user!.id;
        const orders = await this._ordersService.getOrdersCreatedByUser(
            userId!
        );
        new AppResponse(res, 200, orders).send();
    };
    completed: RequestHandler = async (req, res) => {
        const userId = req.user!.id;
        const orders = await this._ordersService.getCompletedOrdersByUser(
            userId!
        );
        new AppResponse(res, 200, orders).send();
    };

    complete: RequestHandler = async (req, res) => {
        const userId = req.user!.id!;
        const orderId = idValidator(req.params.orderid, "orderid");

        const updateCount = await this._ordersService.completeOrder(
            userId,
            orderId
        );

        if (updateCount === 0) {
            return new AppResponse(
                res,
                404,
                null,
                `No active order with id=${orderId} exists or it doesn't belong to you `
            ).send();
        }
        new AppResponse(res, 200, `completed order with id ${orderId}`).send();
    };
}
