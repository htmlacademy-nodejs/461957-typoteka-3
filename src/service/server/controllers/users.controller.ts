import {UsersService} from "../data-access/services/users.service";
import {UserId} from "../../../types/user-id";
import {HttpCode} from "../../../constants-es6";
import {ControllerResponse} from "../../../types/controller-response";
import {IUserPreview} from "../../../types/interfaces/user-preview";

export class UsersController {
  constructor(private usersService: UsersService) {}

  public async getOne(userId: UserId): Promise<ControllerResponse<IUserPreview>> {
    try {
      const user = await this.usersService.findById(userId);
      return {payload: user};
    } catch (e) {
      return {status: HttpCode.NOT_FOUND};
    }
  }
}
