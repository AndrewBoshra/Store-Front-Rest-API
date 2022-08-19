import express from "express";
import { authController, usersController } from "../container";

const usersRouter = express.Router();

usersRouter.use(authController.authorize);
usersRouter.get("/", usersController.index).get("/:id", usersController.show);
export default usersRouter;
