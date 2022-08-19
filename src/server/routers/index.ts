import express from "express";
import authRouter from "./auth_router";
import ordersRouter from "./orders_router";
import productsRouter from "./products_router";
import usersRouter from "./users_router";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/orders", ordersRouter);
router.use("/products", productsRouter);
router.use("/users", usersRouter);

export default router;
