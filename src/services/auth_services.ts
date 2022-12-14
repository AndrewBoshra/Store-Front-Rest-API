/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { AuthenticationError } from "../shared/errors/error";
import { User } from "../models";
import bcrypt from "bcrypt";
import { UsersRepository } from "../repositories";
import jwt from "jsonwebtoken";
import {
    compose,
    requiredEmailValidator,
    requiredFieldValidator,
    strongPasswordValidator,
} from "../shared/app_validators";
export class PasswordHashingService {
    async verify(hashed: string, password: string): Promise<boolean> {
        return bcrypt.compare(password, hashed);
    }

    async hash(password: string): Promise<string> {
        return bcrypt.hash(password, 8);
    }
}

const passwordValidator = compose<string>(
    "password",
    requiredFieldValidator,
    (v, fn) =>
        strongPasswordValidator(v, fn, {
            minLength: 6,
            minLowercase: 0,
            minNumbers: 0,
            minSymbols: 0,
            minUppercase: 0,
        })
);
export class AuthenticationService {
    constructor(
        private readonly _userRepository: UsersRepository,
        private readonly _hashingService: PasswordHashingService
    ) {}
    async login(loginData: {
        email?: string;
        password?: string;
    }): Promise<User> {
        requiredEmailValidator(loginData.email, "email");
        requiredFieldValidator(loginData.password, "password");

        const user = await this._userRepository.getUserByEmail(
            loginData.email!
        );
        if (
            user == undefined ||
            !(await this._hashingService.verify(
                user!.password_hash as string,
                loginData.password!
            ))
        ) {
            throw new AuthenticationError("email or password is incorrect");
        }
        return user!;
    }

    async signup(userData: {
        first_name?: string;
        last_name?: string;
        email?: string;
        password?: string;
    }): Promise<User> {
        const newUser = new User(userData);
        const password = passwordValidator(userData.password);
        const user = await this._userRepository.getUserByEmail(newUser.email);
        if (user != undefined) {
            throw new AuthenticationError("email already exists!");
        }
        newUser.password_hash = await this._hashingService.hash(password);
        return this._userRepository.add(newUser);
    }
}
class JWTPayload {
    public id?: number;
    constructor(user: User) {
        this.id = user.id;
    }
}
export class JWTService {
    constructor(private readonly key: string) {}
    generate(user: User): string {
        const payload = new JWTPayload(user); // select some fields form the user.
        return jwt.sign({ ...payload }, this.key);
    }

    verify(token: string): JWTPayload {
        let payload: JWTPayload | undefined = undefined;
        try {
            payload = jwt.verify(token, this.key) as JWTPayload;
        } catch {
            throw new AuthenticationError("Invalid Token");
        }
        return payload as JWTPayload;
    }
}
