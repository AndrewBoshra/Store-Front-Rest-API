import express from "express";
import { authController, productsController } from "../container";

const productsRouter = express.Router();

productsRouter
    .get("/", productsController.index)
    .post("/", authController.authorize, productsController.create)
    .get("/popular", productsController.topProducts)
    .get("/category/:category", productsController.categoryProducts)
    .get("/:id", productsController.show);

export default productsRouter;
