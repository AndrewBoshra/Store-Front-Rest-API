import { RequestHandler } from "express";
import { RequiredFieldError, ValidationError } from "../../errors/error";
import { CartService } from "../../services/cart_service";
import { AppResponse } from "./response";

export class CartController {
    constructor(private readonly _cartService: CartService) {}
    index: RequestHandler = async (req, res) => {
        const userId = req.user?.id;
        const cart = await this._cartService.index(userId!);
        new AppResponse(res, 200, cart).send();
    };
    delete: RequestHandler = async (req, res) => {
        const userId = req.user?.id;
        const productId = parseInt(req.params.productid);
        if (isNaN(productId))
            throw new ValidationError("productid", "is not a number");
        const deletedRows = await this._cartService.delete(userId!, productId);
        new AppResponse(
            res,
            200,
            `deleted ${deletedRows} products from cart`
        ).send();
    };
    update: RequestHandler = async (req, res) => {
        const userId = req.user?.id;
        const productId = parseInt(req.params.productid);
        if (isNaN(productId))
            throw new ValidationError("productid", "is not a number");
        if (req.body.quantity == undefined) {
            throw new RequiredFieldError("quantity");
        }
        const quantity = parseInt(req.body.quantity);

        if (isNaN(quantity))
            throw new ValidationError("quantity", "is not a number");

        const updatedCout = await this._cartService.update(
            userId!,
            productId,
            quantity
        );
        new AppResponse(res, 200, `updated ${updatedCout} in cart `).send();
    };
    add: RequestHandler = async (req, res) => {
        const userId = req.user?.id;

        if (req.body.quantity == undefined) {
            throw new RequiredFieldError("quantity");
        }
        const quantity = parseInt(req.body.quantity);

        if (isNaN(quantity))
            throw new ValidationError("quantity", "is not a number");

        if (req.body.productid == undefined) {
            throw new RequiredFieldError("productid");
        }
        const productId = parseInt(req.body.productid);

        if (isNaN(productId))
            throw new ValidationError("productid", "is not a number");

        const addedCount = await this._cartService.add(
            userId!,
            productId,
            quantity
        );
        if (addedCount == 0)
            new AppResponse(res, 404, `product was not found `).send();

        new AppResponse(res, 200, `added a product to cart `).send();
    };
    order: RequestHandler = async (req, res) => {
        const userId = req.user!.id!;
        const orderId = await this._cartService.order(userId);
        return new AppResponse(res, 201, { orderId }).send();
    };
}
