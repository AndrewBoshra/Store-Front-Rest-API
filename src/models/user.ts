import { RequiredFieldError } from "../errors/error";

export class User {
    id?: number;
    first_name: string;
    last_name: string;
    password_hash?: string;
    email: string;

    constructor(user: {
        first_name?: string;
        last_name?: string;
        email?: string;
        password_hash?: string;
        id?: number;
    }) {
        if (user.first_name == undefined) {
            throw new RequiredFieldError("first_name");
        }
        if (user.last_name == undefined) {
            throw new RequiredFieldError("last_name");
        }
        if (user.email == undefined) {
            throw new RequiredFieldError("email");
        }
        this.first_name = user.first_name;
        this.last_name = user.last_name;
        this.password_hash = user.password_hash;
        this.email = user.email;
        this.id = user.id;
    }
}
