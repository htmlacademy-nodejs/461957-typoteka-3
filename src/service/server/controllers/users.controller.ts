import {UsersService} from "../data-access/services/users.service";
import {UserId} from "../../../types/user-id";
import {HttpCode} from "../../../constants-es6";
import {ControllerResponse} from "../../../types/controller-response";
import {IUserPreview} from "../../../types/interfaces/user-preview";
import {IUserCreating} from "../../../types/interfaces/user-creating";
import {ValidationResponse} from "../../../types/validation-response";

export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  public async getOne(userId: UserId): Promise<ControllerResponse<IUserPreview>> {
    try {
      const user = await this.usersService.findById(userId);
      return {payload: user};
    } catch (e) {
      return {status: HttpCode.NOT_FOUND};
    }
  }

  public async create(newUser: IUserCreating): Promise<ControllerResponse<void | ValidationResponse<IUserCreating>>> {
    try {
      const isEmailFree = await this.checkIfEmailIsFree(newUser.email);
      if (isEmailFree) {
        await this.usersService.create(newUser);
        return {status: HttpCode.CREATED};
      }
      return {status: HttpCode.BAD_REQUEST, payload: {email: `Пользователь с таким email уже зарегистрирован`}};
    } catch (e) {
      return {status: HttpCode.INTERNAL_SERVER_ERROR};
    }
  }

  private async checkIfEmailIsFree(email: string): Promise<boolean> {
    try {
      await this.usersService.findByEmail(email);
      return false;
    } catch (e) {
      return true;
    }
  }
}
