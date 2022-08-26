import {
    nonEmptyString,
    requiredEmailValidator,
} from "../shared/app_validators";

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
        this.first_name = nonEmptyString(user.first_name, "first_name");
        this.last_name = nonEmptyString(user.last_name, "last_name");
        this.email = requiredEmailValidator(user.email, "email");
        this.password_hash = user.password_hash;
        this.id = user.id;
    }
}
