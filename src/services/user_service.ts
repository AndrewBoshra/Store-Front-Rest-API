import { UsersRepository } from "../repositories";
import { UserViewModel } from "../models/view_models/user_view_model";
import { RequiredFieldError, ValidationError } from "../errors/error";

export class UsersService {
    constructor(private readonly _usersRepository: UsersRepository) {}
    async getAll(): Promise<UserViewModel[]> {
        return await (
            await this._usersRepository.getAll()
        ).map((u) => new UserViewModel(u));
    }
    async get(id?: string): Promise<UserViewModel | undefined> {
        if (id == undefined) throw new RequiredFieldError("id");
        const idNum = parseInt(id);
        if (isNaN(idNum)) throw new ValidationError("id", "is not a number");
        const user = await this._usersRepository.get(idNum);
        if (user == undefined) return undefined;
        return new UserViewModel(user);
    }
}
