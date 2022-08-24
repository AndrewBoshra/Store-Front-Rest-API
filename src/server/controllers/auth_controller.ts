import { AuthenticationService, JWTService } from "../../services";
import { RequestHandler } from "express";
import { AppResponse } from "./response";
import { UserViewModel } from "../../models/view_models/user_view_model";
import { AuthorizationError } from "../../shared/errors/error";

export class AuthController {
    constructor(
        private readonly _authenticationService: AuthenticationService,
        private readonly _jwtService: JWTService
    ) {}

    login: RequestHandler = async (req, res) => {
        const user = await this._authenticationService.login(req.body);
        const token = this._jwtService.generate(user);
        new AppResponse(res, 200, {
            token,
            user: new UserViewModel(user),
        }).send();
    };
    signup: RequestHandler = async (req, res) => {
        const user = await this._authenticationService.signup(req.body);
        const token = this._jwtService.generate(user);
        new AppResponse(res, 201, {
            token,
            user: new UserViewModel(user),
        }).send();
    };
    authorize: RequestHandler = async (req, _, next) => {
        const authorizationHeader = req.get("authorization");
        const splitted = authorizationHeader?.split(" ");
        const token = splitted?.[splitted?.length - 1];
        if (token == undefined) {
            throw new AuthorizationError("Authorization header is required");
        }
        req.user = this._jwtService.verify(token);
        next();
    };
}
