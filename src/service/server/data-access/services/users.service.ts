import {IUserModel} from "../models/user";

export class UsersService {
  constructor(private readonly UserModel: IUserModel) {}
}
