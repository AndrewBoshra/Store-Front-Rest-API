import express from "express";
import { authController, cartController } from "../container";

const cartRouter = express.Router();

cartRouter.use(authController.authorize);
cartRouter
    .get("/", cartController.index)
    .delete("/:productid", cartController.delete)
    .patch("/:productid", cartController.update)
    .post("/", cartController.add)
    .post("/order", cartController.order);
export default cartRouter;
