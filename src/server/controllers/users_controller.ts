import { RequestHandler } from "express";
import { UsersService } from "../../services";
import { AppResponse } from "./response";

export class UsersController {
    constructor(private readonly _userService: UsersService) {}
    index: RequestHandler = async (req, res) => {
        const users = await this._userService.getAll();
        new AppResponse(res, 200, users).send();
    };
    show: RequestHandler = async (req, res) => {
        const userId = req.params.id;
        const user = await this._userService.get(userId);
        if (user == undefined)
            return new AppResponse(res, 404, "user was not found");
        new AppResponse(res, 200, user).send();
    };
}
