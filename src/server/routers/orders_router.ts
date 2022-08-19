import express from "express";
import { authController, ordersController } from "../container";

const ordersRouter = express.Router();

ordersRouter.use(authController.authorize);
ordersRouter
    .get("/", ordersController.index)
    .get("/completed", ordersController.completed);
export default ordersRouter;
