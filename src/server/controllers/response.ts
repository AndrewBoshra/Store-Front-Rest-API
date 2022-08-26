/* eslint-disable @typescript-eslint/no-explicit-any */
// To keep the response consistent in all routes
import { Response } from "express";
export class AppResponse {
    constructor(
        public response: Response,
        public statusCode: number,
        public data?: any, //we don't know how the data will look like
        public error?: any //we don't know how the error will look like
    ) {}
    send() {
        const { data, error } = this;
        this.response?.status(this.statusCode).json({ data, error });
    }
}
