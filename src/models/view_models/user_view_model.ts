import { User } from "../user";

//to hide password
export class UserViewModel {
    id?: number;
    email?: string;
    firstName?: string;
    lastName?: string;
    constructor(user: User) {
        this.id = user.id;
        this.email = user.email;
        this.firstName = user.first_name;
        this.lastName = user.last_name;
    }
}
