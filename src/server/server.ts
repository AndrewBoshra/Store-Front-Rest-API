import bodyParser from "body-parser";
import express from "express";
import config from "../config";
import { AppResponse } from "./controllers/response";
import {
    AppError,
    AuthenticationError,
    AuthorizationError,
} from "../shared/errors/error";
import router from "./routers";
export default class Application {
    expressApp!: express.Application;
    async bootstrap(): Promise<void> {
        this.expressApp = express();
        this.expressApp.use(bodyParser.json());
        this.expressApp.use((req, _, next) => {
            req.body = req.body || {};
            next();
        });
        this.expressApp.use(router);
        this.expressApp.use(this.errorHandler);
        this.expressApp.listen(config.port, () =>
            console.log(
                `application started on http://localhost:${config.port}`
            )
        );
    }
    private errorHandler: express.ErrorRequestHandler = (err, _, res, __) => {
        if (err instanceof AuthenticationError) {
            return new AppResponse(res, 401, null, err.message).send();
        } else if (err instanceof AuthorizationError) {
            return new AppResponse(res, 401, null, err.message).send();
        } else if (err instanceof AppError) {
            return new AppResponse(res, 400, null, err.message).send();
        } else {
            if (config.environment === "development") {
                console.error(err);
                return new AppResponse(
                    res,
                    500,
                    null,
                    (err as Error).stack
                ).send();
            }
            return new AppResponse(res, 500, null, "Oops server error").send();
        }
    };
}
