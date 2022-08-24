import { UsersRepository } from "../repositories";
import { UserViewModel } from "../models/view_models/user_view_model";
import { idValidator } from "../shared/app_validators";

export class UsersService {
    constructor(private readonly _usersRepository: UsersRepository) {}
    async getAll(): Promise<UserViewModel[]> {
        return await (
            await this._usersRepository.getAll()
        ).map((u) => new UserViewModel(u));
    }
    async get(id?: string | number): Promise<UserViewModel | undefined> {
        const idNum = idValidator(id, "id");
        const user = await this._usersRepository.get(idNum);
        if (user == undefined) return undefined;
        return new UserViewModel(user);
    }
}
