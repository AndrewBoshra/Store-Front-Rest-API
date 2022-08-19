import { RequestHandler } from "express";
import { OrderService } from "../../services";
import { AppResponse } from "./response";

export class OrdersController {
    constructor(private readonly _ordersService: OrderService) {}
    index: RequestHandler = async (req, res) => {
        const userId = req.user!.id;
        const orders = await this._ordersService.getCompletedOrdersByUser(
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
}
