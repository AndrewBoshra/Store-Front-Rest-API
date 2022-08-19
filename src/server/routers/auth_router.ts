import express from "express";
import { authController } from "../container";

const authRouter = express.Router();

authRouter
    .post("/login", authController.login)
    .post("/signup", authController.signup);
export default authRouter;
