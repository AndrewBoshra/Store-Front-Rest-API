import { RequestHandler } from "express";
import { Product } from "../../models";
import ProductsRepository from "../../repositories/products_repo";
import { AppResponse } from "./response";

export class ProductsController {
    constructor(private readonly _productsRepository: ProductsRepository) {}
    index: RequestHandler = async (_, res) => {
        const products = await this._productsRepository.getAll();
        new AppResponse(res, 200, products).send();
    };
    show: RequestHandler = async (req, res) => {
        const id = req.params.id;
        const product = await this._productsRepository.get(parseInt(id));
        if (product == undefined)
            return new AppResponse(
                res,
                404,
                null,
                "couldn't find product"
            ).send();
        return new AppResponse(res, 200, product).send();
    };
    create: RequestHandler = async (req, res) => {
        const product = await this._productsRepository.add(
            new Product(req.body)
        );
        new AppResponse(res, 201, product).send();
    };
    topProducts: RequestHandler = async (req, res) => {
        const limitRaw: string = req.query.limit as string;
        let limit = parseInt(limitRaw);
        if (isNaN(limit)) limit = 5;

        const products = await this._productsRepository.getPopularProducts(
            limit
        );
        new AppResponse(res, 200, products).send();
    };
    categoryProducts: RequestHandler = async (req, res) => {
        const category = req.params.category;
        const products = await this._productsRepository.getCategoryProducts(
            category
        );
        new AppResponse(res, 200, products).send();
    };
}
