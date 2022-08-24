import { RequestHandler } from "express";
import { CartService } from "../../services/cart_service";
import { AppResponse } from "./response";
import { idValidator, minValueValidator } from "../../shared/app_validators";

const quantityValidator = (q: number) => minValueValidator(q, "quantity", 1);
export class CartController {
    constructor(private readonly _cartService: CartService) {}
    index: RequestHandler = async (req, res) => {
        const userId = req.user?.id;
        const cart = await this._cartService.index(userId!);
        new AppResponse(res, 200, cart).send();
    };
    delete: RequestHandler = async (req, res) => {
        const userId = req.user?.id;
        const productId = idValidator(req.params.productid, "productid");
        const deletedRows = await this._cartService.delete(userId!, productId);
        new AppResponse(
            res,
            200,
            `deleted ${deletedRows} products from cart`
        ).send();
    };
    update: RequestHandler = async (req, res) => {
        const userId = req.user?.id;
        const productId = idValidator(req.params.productid, "productid");
        const quantity = quantityValidator(req.body.quantity);

        const updatedCout = await this._cartService.update(
            userId!,
            productId,
            quantity
        );
        new AppResponse(res, 200, `updated ${updatedCout} in cart `).send();
    };
    add: RequestHandler = async (req, res) => {
        const userId = req.user?.id;
        const quantity = quantityValidator(req.body.quantity);
        const productId = idValidator(req.body.productid, "productid");

        const addedCount = await this._cartService.add(
            userId!,
            productId,
            quantity
        );
        if (addedCount == 0)
            new AppResponse(res, 404, `product was not found `).send();

        new AppResponse(res, 200, `added a product to cart`).send();
    };
    order: RequestHandler = async (req, res) => {
        const userId = req.user!.id!;
        const orderId = await this._cartService.order(userId);
        return new AppResponse(res, 201, { orderId }).send();
    };
}
